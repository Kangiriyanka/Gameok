from app import db 
from app.auth import bp
from app.models import User 
from flask import request, jsonify
from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager    
from sqlalchemy.exc import SQLAlchemyError



# Creates a token if the user enters an exisitng username with the correct password
# 401 error code --> Unauthorized access
# 500 error code --> Internal Server Error, i.e. All purpose error
@bp.route('/token', methods=["POST"])
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
@bp.route('/add_user', methods= ["POST"])
def add_user():
    
    if request.method == "POST":

        try: 
            # Data is a dictionary with keys username, email, and password
            data = request.get_json()
            print(data)
            print(type(data))
        
            

            email_exists= User.query.filter_by(email=data["email"]).first()
            username_exists= User.query.filter_by(username=data["username"]).first()
            

            # Check if the email or username exists in the database 
            if email_exists:
                return ("This e-mail address has already been taken")
                
            elif username_exists:
                return ("This username has already been taken")

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
        
    

# The data type here sent is application/json, data is simply a dict.
@bp.route('/edit_password', methods= ["POST"])
@jwt_required()
def edit_password():
    
    data = request.get_json()
    for value in data.values():
            
            if value == "":
                
                return "One of the fields is not filled, please check."
            
    current_user = get_jwt_identity()
    user= User.query.filter_by(username=current_user).first() 
    current_user_password= user.password
    print(current_user_password)
    # gets a dict of data 
   
    
    if data["currentPassword"] != current_user_password:
        return "The current password you entered is  incorrect"
    elif data["newPassword"] != data["confirmPassword"]:
        return "The new password doesn't match with the confirmation"
    else:
        user.password = data["newPassword"]
        db.session.commit()
        return "Sucessfully changed passwords"
    


@bp.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "You have successfully logged out "})
    # Function which deletes the cookies containing the access token
    unset_jwt_cookies(response)
    return response


