
import os 
import uuid
from app.main import bp
from app import db
from app.models import *
from flask_jwt_extended import jwt_required, get_jwt_identity
from werkzeug.utils import secure_filename
from flask import jsonify, request, current_app, send_from_directory
from app.main.helpers import allowed_file
from collections import defaultdict

@bp.route('/api/game/get_all_game_titles', methods = ["GET"])
@jwt_required()
def get_all_game_titles():
    
   
    game_console = defaultdict(list)
    game_consoles = Game.query \
    .join(GameConsole, GameConsole.game_id == Game.id) \
    .join(Console, Console.id == GameConsole.console_id) \
    .add_entity(Console) \
    .all()
   
    
    
    for game, console  in game_consoles:
          game = game.to_json()
          console= console.to_json()
          game_console[console["name"]].append(game["title"])
     

    game_console = dict(game_console)


    return jsonify(game_console)




@bp.route('/api/game/user_add_game', methods= ["POST"])
@jwt_required()
def user_add_game():
    
  try:
 
   # Check if any of the fields is empty
   for key, value in request.form.items():
            if value == "":
                if key == "title":
                     return {"msg": "Please select a game"}, 422
                return {"msg": "One of the fields is not filled, please check."}, 422
   
   a_title = request.form['title']
 
  
    
    # Get the username
   current_user= get_jwt_identity()
   current_user_id= User.query.filter_by(username=current_user).first().id
 
   current_game = Game.query.filter_by(title=a_title).first()
   
   
   has_game = GameOwnership.query.filter_by(user_id=current_user_id, game_id=current_game.id).first()
   if has_game: 
        return {"msg": "This game already exists in your library."}, 422
    
   else:
            
         # Add the relationship between the game and the user
        new_game_ownership= GameOwnership(game_id = current_game.id, user_id= current_user_id, memories= '')
        db.session.add(new_game_ownership)
        db.session.commit()
            
        
            
        return {"msg": f"{a_title}  was added to your collection"}


  except Exception as e:
        return {"msg": f"An error occurred: {str(e)}"}

 

@bp.route('/api/game/delete/<a_game_id>/', methods=["DELETE"])
@jwt_required()
def delete_game(a_game_id):
    
    id = a_game_id
    print(id)
    user= get_jwt_identity()
    a_user_id= User.query.filter_by(username=user).first().id
    print(a_user_id)
    GameOwnership.query.filter_by(game_id= a_game_id, user_id= a_user_id).delete()
    db.session.commit()
    return "Succesfully deleted game from the user's library"
    



@bp.route('/api/game/fetch_cover/<a_game_title>/', methods= ["GET"])
def fetch_image(a_game_title):
    
     filename = Game.query.filter_by(title=a_game_title).first().cover_photo
     print(f"Serving filename: {filename}")
     print(f"From folder: {current_app.config['UPLOAD_FOLDER']}")
     return send_from_directory(current_app.config["UPLOAD_FOLDER"], filename)
     
     
     

     

     
