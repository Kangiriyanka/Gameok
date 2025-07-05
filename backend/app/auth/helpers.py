
from app import bp
from datetime import datetime,timezone,timedelta
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity
                             
import json

# Authentication using JWT
# Create a function that refreshes the token when it is close to the end of its lifespan.
# This function runs every time you make a get request. If you access the games route, it returns {'games': [ List of Games ]}
# Before sending the response back to the user, this after_request is executed and allows you add/make adjustments to the response with json.dumps
# { 'games': [ List of Games] } would look like { 'games': [ List of Games], 'access_token' : token_name}
# A clearer tutorial can be found here https://dev.to/nagatodev/how-to-add-login-authentication-to-a-flask-and-react-application-23i7

MINUTES= 30

@bp.after_request
def refresh_expiring_jwts(response):
    try:
        print(response)
        # Create a new access token when it's close to expire
        # The bigger the number of minutes, the faster it will recreate access tokens 
        exp_timestamp = get_jwt()["exp"]
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
