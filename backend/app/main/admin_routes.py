
import uuid
import os 
from app.main import bp
from app import db
from app.models import Console, Game
from app.main.helpers import allowed_file
from flask import request
from flask_jwt_extended import jwt_required
from app.main.helpers import admin_only
from werkzeug.utils import secure_filename



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
            return "One of the fields is not filled, please check."
    
   
    console = Console.query.filter_by(name=data["name"]).first()
    


    if console:
           
            return "This console already exists"
        
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
            return "Successfully added console to database"
    



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
    