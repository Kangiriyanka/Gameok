
from app.main import bp
from app.models import *
from flask import request, jsonify
from flask_jwt_extended import get_jwt_identity,  jwt_required
             

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
  
    print(console_games_json)
    #Key
    return jsonify(console_games = console_games_json)
   



