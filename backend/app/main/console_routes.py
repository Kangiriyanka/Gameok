
from app.main import bp
from app import db
from app.models import *
from flask import request,jsonify
from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity, \
                               jwt_required,set_access_cookies

from datetime import datetime,timezone,timedelta
import json


MINUTES = 30
@bp.route('/api/console/get_owned_consoles', methods = ["GET", "POST"])
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
@bp.route('/api/console/get_all_consoles', methods = ["GET", "POST"])
@jwt_required()
def get_consoles():
    console_names = []
    consoles = db.session.query(Console).all()
   
   
    for console in consoles:
         console_names.append(console.name)
         
 
    return console_names





@bp.after_request
def refresh_expiring_jwts(response):
   
  
  
    try:
      
        # Create a new access token when it's close to expire
        # The bigger the number of minutes, the faster it will recreate access tokens 
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes= MINUTES))
     
        if target_timestamp > exp_timestamp:
            
            print(" Your token is close to expiring")
            my_access_token = create_access_token(identity=get_jwt_identity())
            # Extract JSON data from the request body using get_json() to a data type you can manipulate with Python such as dict.
            set_access_cookies(response, my_access_token)
            print("Ok, it's been refreshed")
            
         
        return response
    
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original respone
        return response
