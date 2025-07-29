
from collections import defaultdict
import os
import uuid
from app.main import bp
from app.models import *
from app.main.helpers import allowed_file
from flask import current_app
from flask import request, jsonify, send_from_directory, url_for
from flask_jwt_extended import get_jwt_identity,  jwt_required
from werkzeug.utils import secure_filename             

# Get all games owned by the user
@bp.route('/api/collection/get_owned_games', methods = ["GET"])
@jwt_required()
def get_games():
    
   
    user= get_jwt_identity()
    user_id= User.query.filter_by(username=user).first().id

    games = Game.query.join(GameOwnership).filter(GameOwnership.user_id == user_id).order_by((Game.title)).all()
    
    games_json = [game.to_json() for game in games]
    
   

    
    #Returns a response object with the application/json mimetype
    return jsonify(games=games_json)


@bp.route('/api/collection/get_graph_data', methods = ["GET"])
@jwt_required()
def get_graph_data():

    brackets = {
        "1972-1990": range(1972,1991),
        "1991-2000": range(1991,2001),
        "2001-2010": range(2001,2011),
        "2011-2020": range(2011,2021),
        "2020-Present": range(2021,2100),
    }

    year_brackets = {label: 0 for label in brackets }
    series_data = defaultdict(int)
    
   
    user= get_jwt_identity()
    user_id= User.query.filter_by(username=user).first().id

    games = Game.query.join(GameOwnership).filter(GameOwnership.user_id == user_id).order_by((Game.title)).all()

    for game in games:
        
        series_data[game.series] += 1

     
        year = game.year
        for label,year_range in brackets.items():
            if year in year_range:
                year_brackets[label] += 1
                break
  



    series_data = dict(sorted(series_data.items(), key= lambda x:x[1], reverse=True))
    year_data = [{"years": label, "games": count} for label,count in year_brackets.items()]
    series_data = [{"series": series, "games": count} for series,count in series_data.items()][:10]
    
    
   
    #Returns a response object with the application/json mimetype
    return jsonify(year_data= year_data, series_data= series_data , total= sum(year_brackets.values()))


# Game Ownership routes
# These routes handle getting and editing the memories related to each game.
@bp.route('/api/collection/get_game_memories/<a_game_id>/', methods = ["GET"])
@jwt_required()
def get_game_memories(a_game_id):
    
    user= get_jwt_identity()
    a_user_id= User.query.filter_by(username=user).first().id
    print(a_game_id)

    game_memories = GameOwnership.query.filter_by(game_id= a_game_id, user_id= a_user_id).first().memories
   
    
    return {"msg": game_memories}



@bp.route('/api/collection/edit_game_memories/<a_game_id>/', methods = ["POST"])
@jwt_required()
def edit_game_memories(a_game_id):
    
   
    edit_memories = request.form["memories"]
    user= get_jwt_identity()
    a_user_id= User.query.filter_by(username=user).first().id
    game_ownership_row = GameOwnership.query.filter_by(game_id= a_game_id, user_id= a_user_id).first()
    game_ownership_row.memories = edit_memories
    db.session.commit()
    
    
    
    
    return a_game_id


        
# Get all games owned by the user for a specific console
@bp.route('/api/collection/get_console_games/<console_id>/', methods = ["GET"])
@jwt_required()
def get_console_games(console_id):
    
    user= get_jwt_identity()
    user_id= User.query.filter_by(username=user).first().id
    # Gets all the games for a certain console on the first join, then for the specific user
    console_games= Game.query.join(GameConsole).filter(GameConsole.console_id == console_id).join(GameOwnership).filter(GameOwnership.user_id ==user_id).all()
    console_games_json = [game.to_json() for game in console_games]
  
   
    # Key
    return jsonify(console_games = console_games_json)
   


# You can't just pass the filepath 
@bp.route("/api/collection/upload_picture/", methods=["POST", "GET"])
@jwt_required()
def approve_upload():
      
      image= request.files.get("image")
     
      if image.filename == '':
          return {"msg": "No selected file"}, 422
      
      if image and allowed_file(image.filename):
      
        filename = secure_filename(image.filename)
        filename = f"{str(uuid.uuid4())}-{filename}"
        filepath = os.path.abspath(os.path.join(current_app.config["USER_UPLOAD_FOLDER"],filename))
        image.save(filepath)
        url = url_for('main.uploaded_file', filename=filename)
        return {"url": url}

      
      return {"msg": "Failed to upload picture"}, 422


@bp.route('/api/collection/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(current_app.config["USER_UPLOAD_FOLDER"], filename)

