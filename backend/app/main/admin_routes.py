
import uuid
import os 
from app.main import bp
from flask import current_app
from app import db
from app.models import Console, Game, GameConsole, GameOwnership, User
from app.main.helpers import allowed_file
from flask import request,jsonify
from flask_jwt_extended import get_jwt_identity, jwt_required
from app.main.helpers import admin_only
from werkzeug.utils import secure_filename


@bp.route('/api/admin/add_game', methods= ["POST"])
@jwt_required()
def add_game():
 try:
 
   for key, value in request.form.items():
 
            if value == "":
                if key == "console":
                    return {"msg": "Please select a console"}, 422
                      
                return {"msg": "One of the fields is not filled, please check."}, 422
        
   a_title = request.form['title']
   a_year = int(request.form['year'])
   a_series = request.form['series']
  
   
   posted_game = Game(title=a_title, year=a_year, series=a_series)

    
    # Get the username
  
   current_game = Game.query.filter_by(title=request.form["title"]).first()
   console= Console.query.filter_by(name=request.form["console"]).first()
   print(current_game)
 

  
    # If the game doesn't exist in the Games table , add it to the games table and establish relationships
   if not current_game:
           
         # Handle the cover photo upload
            cover_photo = request.files['coverPhoto']
          

            
            # Check if the cover photo exists and if it's either in a jpg or jpeg format.
            if cover_photo and allowed_file(cover_photo.filename):
               
                # Generate a unique filename for the cover photo
                filename = secure_filename(cover_photo.filename)
                filename = f"{str(uuid.uuid4())}-{filename}"
                filepath = os.path.abspath(os.path.join(current_app.config["UPLOAD_FOLDER"],filename))
                
                

                # Save the cover photo to the specified path
                cover_photo.seek(0)
                cover_photo.save(filepath)
               
        
                # Set the cover photo path for the game
                posted_game.cover_photo = filename
                db.session.commit()
            else:
                
                return {"msg": "Please add a cover photo in either .jpg or .jpeg format"}, 422

            db.session.add(posted_game)
            db.session.commit()
            
            # Refresh the posted_game object after it is committed to the database, which will update its id attribute with the new ID
            db.session.refresh(posted_game)
       
          
            
            # Add the relationship between the game and the console
            
            new_game_console_combo = GameConsole(game_id = posted_game.id, console_id= console.id)
            db.session.add(new_game_console_combo)
            db.session.commit()
            
            return {"msg": f"{a_title}  was added to the game collection"}
        
    # If the game exists in the table and the user has the game then tell the user they already own the game.
   else : 
      
        return {"msg": "This exists in the database the library"}, 422
    
     

        
 except Exception as e:
       
        return {"msg": f"Wozzack Error: {str(e)}"}, 401
 
 

@bp.route('/api/admin/add_console', methods= ["POST"])
@jwt_required()
@admin_only
def add_console():


    # gets a dict of data 
    data = request.get_json()
    
    
    #Check if any of the fields is empty
    for value  in data.values():
        print(value)
        if value == "":
            return {"msg":"One of the fields is not filled, please check"}, 422
    
   
    console = Console.query.filter_by(name=data["name"]).first()
    


    if console:
           
            return {"msg":"This console already exists"}, 422
        
    # elif data["title"] == "":
    #     print(data["title"])
    #     return "Please enter a title"

    else:

            a_name = data['name']
            a_year = int(data['year'])
            a_firm = data['firm']
            
    
            new_console = Console(name= a_name, year = a_year, firm= a_firm)
            db.session.add(new_console)
            db.session.commit()
            return {"msg" : "Successfully added console to database"}
    





@bp.route("/api/admin/edit_game/<a_game_id>", methods=["POST", "GET"])
@jwt_required()
@admin_only
def game_edit(a_game_id):
    
    # Get the fields with the new values
    new_game_title = request.form["title"]
    new_game_year= request.form["year"]
    new_game_series= request.form["series"]
    # Rather than accessing the key here: request.files["coverPhoto"], we use get because it returns None
    # Using it like this: request.files["coverPhoto"] could give a KeyError if the admin doesn't decide to change the cover photo.
    new_cover_photo = request.files.get("coverPhoto")
 
    
    # Get the data row of the game to modify
    game_row = Game.query.filter_by(id= a_game_id).first()
    
    # Assign the new values
    game_row.title = new_game_title
    game_row.year = new_game_year
    game_row.series= new_game_series 
    
    #   Handle the cover photo upload
    cover_photo = new_cover_photo
    if not cover_photo:
        db.session.commit()
        return "Succesfully edited game"
        
    
            
    # Check if the cover photo exists and if it's either in a jpg or jpeg format.
    elif cover_photo and allowed_file(cover_photo.filename):
                
                # Generate a unique filename for the cover photo
                filename = secure_filename(cover_photo.filename)
                filename = f"{str(uuid.uuid4())}-{filename}"
                file_path = os.path.join(os.get['UPLOAD_FOLDER'], filename)
                print("This is the file path")
                print(file_path)

                # Save the cover photo to the specified path
                cover_photo.seek(0)
                cover_photo.save(file_path)

                # Set the cover photo path for the game
                game_row.cover_photo = "/images/" + filename
                db.session.commit()
                return "Successfully edited game"
                
    else:
                
                return "Please add a cover photo in either .jpg or .jpeg format"
    