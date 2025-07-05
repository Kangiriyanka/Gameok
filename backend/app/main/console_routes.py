
from app.main import bp
from app import db
from app.models import *
from flask import request,jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity


@bp.route('/console/get_owned_consoles', methods = ["GET", "POST"])
@jwt_required()
def get_my_consoles():
   

# Goal: Get consoles owned by a specific user
# The way to do this given the database schema: Get all the games owned by a specific user and work from the bottom up to get the console name
# Requires 4 joins
# Get the consoles all users actually own
# Get the games associated with those consoles
# Get the users who own those games
# Finally, filter the user who has those games
 
    
    user= get_jwt_identity()
    user_id= User.query.filter_by(username=user).first().id
    consoles = Console.query \
        .join(GameConsole, Console.id == GameConsole.console_id) \
        .join(Game, Game.id == GameConsole.game_id) \
        .join(GameOwnership, GameOwnership.game_id == Game.id).filter(GameOwnership.user_id == user_id)   \
        .all() 

    
    consoles_json = [console.to_json() for console in consoles]
   
    
    return jsonify(consoles=consoles_json)
         
 
    

# Adding a game requires associating it with a console
# On the AddGame component, we use a form that has a dropdown entry with all the consoles
# This route will  populate the Dropdown Menu Component with the consoles from the consoles table.
@bp.route('/console/get_consoles', methods = ["GET", "POST"])
@jwt_required()
def get_consoles():
    console_names = []
    consoles = db.session.query(Console).all()
   
   
    for console in consoles:
         console_names.append(console.name)
         
 
    return console_names



