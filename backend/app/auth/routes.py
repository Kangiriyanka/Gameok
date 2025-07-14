from app import db 
from app.auth import bp
from app.models import User 
from flask import request, jsonify
from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager    
from sqlalchemy.exc import SQLAlchemyError
from datetime import datetime,timezone,timedelta
import json


MINUTES = 30



# Creates a token if the user enters an exisitng username with the correct password
# 401 error code --> Unauthorized access
# 500 error code --> Internal Server Error, i.e. All purpose error
@bp.route('/api/auth/get_token', methods=["POST"])
def create_token():
    # Data Sent from the Login Component.
    data = request.get_json()
  
 

    try:
        
        # Check if there is a User in the database with the username  or an error otherwise
        user = User.query.filter_by(username=data["username"]).first()

        # Return an access token if the user enters the correct password or an error otherwise
        if user is not None :

            if user.password == data["password"]:
                my_access_token = create_access_token(identity=user.username)
                response = {"access_token": my_access_token, "username": user.username}
                
                return response
        
            else:
                return {"msg": "Wrong password"}, 401
            
        else:
        
             return {"msg": "No user with this username has been found"}, 401

    # Catch any other unexpected errors
    
    except SQLAlchemyError as e:
        
        
        error_msg = str(e)
        return {"msg": error_msg}, 500


# User Routes
# Add user with Try-Except Block
@bp.route('/api/auth/add_user', methods= ["POST"])
def add_user():
    
    if request.method == "POST":

        try: 
            # Data is a dictionary with keys username, email, and password
            data = request.get_json()
            email_exists= User.query.filter_by(email=data["email"]).first()
            username_exists= User.query.filter_by(username=data["username"]).first()
            

            # Check if the email or username exists in the database 
            if email_exists:
             
                return {"msg": "Wrong password. Try again!"}, 401
                
            elif username_exists:
                return {"msg": "Oops, this username has already been taken."}, 401

            # Create a new user 
            else:

                    a_username = data['username']
                    a_email = data['email']
                    a_password = data['password']
                    new_user = User(username= a_username, email= a_email, password= a_password)
                    db.session.add(new_user)
                    db.session.commit()
                    return "Successfully registered"
        except Exception as e:
            return str(e)
        
    


@bp.route('/api/token_expiry', methods=["GET"])
@jwt_required()
def token_expiry():
    exp_timestamp = get_jwt()["exp"]
    now = datetime.now(timezone.utc).timestamp()
    remaining = exp_timestamp - now

    return jsonify({
        "expires_at": exp_timestamp,
        "current_time": now,
        "seconds_remaining": int(remaining),
        "minutes_remaining": round(remaining / 60, 2)
    })

# The data type here sent is application/json, data is simply a dict.
@bp.route('/api/auth/edit_password', methods= ["POST"])
@jwt_required()
def edit_password():
    
    data = request.get_json()
 
    print(data)
    for value in data.values():
            
            if value == "":
                
                return "One of the fields is not filled, please check."
            
    current_user = get_jwt_identity()
    user= User.query.filter_by(username=current_user).first() 
    current_user_password= user.password
    print(current_user_password)
    # gets a dict of data 
   
    
    if data["currentPassword"] != current_user_password:

        return {"msg": "The current password you entered is incorrect"}, 401
    elif data["newPassword"] != data["confirmPassword"]:
        return {"msg": "The new password doesn't match "}, 401
    else:
        user.password = data["newPassword"]
        db.session.commit()
        return "Successfully changed passwords"
    



@bp.route("/api/auth/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "You have successfully logged out"})
    unset_jwt_cookies(response)
    return response





# Authentication using JWT
# Create a function that refreshes the token when it is close to the end of its lifespan.
# This function runs every time you make a get request. If you access the games route, it returns {'games': [ List of Games ]}
# Before sending the response back to the user, this after_request is executed and allows you add/make adjustments to the response with json.dumps
# { 'games': [ List of Games] } would look like { 'games': [ List of Games], 'access_token' : token_name}
# A clearer tutorial can be found here https://dev.to/nagatodev/how-to-add-login-authentication-to-a-flask-and-react-application-23i7



@bp.after_request
def refresh_expiring_jwts(response):

    print(response)
    print(" WE HERE")
  
    try:
      
        # Create a new access token when it's close to expire
        # The bigger the number of minutes, the faster it will recreate access tokens 
        exp_timestamp = get_jwt()["exp"]
        print(str(exp_timestamp))
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes= MINUTES))
        
       
        if target_timestamp > exp_timestamp:
            print(" Your token is close to expiring")
            my_access_token = create_access_token(identity=get_jwt_identity())
            # Extract JSON data from the request body using get_json() to a data type you can manipulate with Python such as dict.
            data = response.get_json()
            
            # Prevent any modifications on requests that are not JSON Object. 
            # If a route returned a simple string like "Hello World", then we wouldn't be able to add the new access token to it.
            if type(data) is dict:
                data["access_token"] = my_access_token 
                # Reminder: json.dumps takes a Python Object and returns the JSON Object of it 
                # We modify the data attribute of the Response object
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original respone
        return response


