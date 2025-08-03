
import io
import shutil
import uuid
import os 
from app.main import bp
from flask import current_app
from app import db
from app.models import Console, Game, GameConsole, GameOwnership, User
from app.main.helpers import allowed_file
from flask import request,jsonify
from flask_jwt_extended import get_jwt_identity, jwt_required
from werkzeug.utils import secure_filename
from app.main.helpers import admin_only
import csv



@bp.route('/api/admin/isAdmin/', methods= ["GET"])
@jwt_required()
def is_admin():

      current_user= get_jwt_identity()
      id= User.query.filter_by(username=current_user).first().id
      print(f"The id is {id}")
      if id == 1 :
        return {"msg": True}
      return {"msg": False}
     


@bp.route('/api/admin/add_game', methods= ["POST"])
@jwt_required()
@admin_only
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
   current_game = Game.query.filter_by(title=request.form["title"].strip()).first()
   console= Console.query.filter_by(name=request.form["console"]).first()

   
   
   # If a game exists, see if you're trying to add it to a console it already exists on
   allowCrossConsole = False

   if (current_game):
     existent_console = GameConsole.query.filter_by(game_id = current_game.id, console_id = console.id).first()
     if (existent_console):
        return {"msg": "This game already exists on this console"}, 422
     allowCrossConsole = True
     
   
    
  
   
   if allowCrossConsole:
        
                new_game_console_combo = GameConsole(game_id = current_game.id, console_id= console.id)
                db.session.add(new_game_console_combo)
                db.session.commit()
                return {"msg": f"{a_title}  was added to the game collection on {console.name}"}

   if not current_game:
           
         # Handle the cover photo upload
            cover_photo = request.files['coverPhoto']
            # Check if the cover photo exists and if it's either in a jpg or jpeg format.
            if cover_photo and allowed_file(cover_photo.filename):
               
                # Generate a unique filename for the cover photo
                filename = secure_filename(cover_photo.filename)
                filename = f"{str(uuid.uuid4())}-{filename}"

                # Create a directory for the game cover
                game_dir_path = os.path.abspath(os.path.join(current_app.config["UPLOAD_FOLDER"], a_title))
             
                if not os.path.exists(game_dir_path):
                    os.mkdir(os.path.join(current_app.config["UPLOAD_FOLDER"], a_title))

                filepath = os.path.abspath(os.path.join(game_dir_path, filename))
                
                # Save the cover photo to the specified path
                cover_photo.seek(0)
                cover_photo.save(filepath)
               
        
                # Set the cover photo path for the game
                posted_game.cover_photo = filename
                db.session.commit()
            else:
                
                return {"msg": "Please add a cover photo in either .jpg or .jpeg format"}, 422

            db.session.add(posted_game)
            print(f"After adding to session: {posted_game.id}") 
            db.session.commit()
            
            # Refresh the posted_game object after it is committed to the database, which will update its id attribute with the new ID
            db.session.refresh(posted_game)
       
        
            new_game_console_combo = GameConsole(game_id = posted_game.id, console_id= console.id)
            db.session.add(new_game_console_combo)
            db.session.commit()
            return {"msg": f"{a_title}  was added to the game collection"}
            
       
        
   else : 
      
        return {"msg": "This game already exists in the database"}, 422
    
     

        
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
        if value == "":
            return {"msg":"One of the fields is not filled, please check"}, 422
    
   
    console = Console.query.filter_by(name=data["name"]).first()
    


    if console:
           
            return {"msg":"This console already exists"}, 422
        


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
    




@bp.route("/api/admin/add_games_from_csv/", methods=["POST", "GET"])
@jwt_required()
@admin_only
def add_games_from_csv():
      """
      Bulk upload games from a csv file. All games to be added must have a cover photo in jpg and non-empty fields.
      
      Step 1:
      1. Uploaded CSV is decoded from bytes to a string with utf-8
      2. Transform the str into a file to be read (stream)
      3. Pass the stream to the DictReader

      Step 2:
      1. Scan each row to see if a field is empty.
      2. Check if the game already exists in the database.
      3. Check if the console exists in the database
      4. Check if the cover photo in the row matches a file that exists in the csv_uploads folder
      """
      
      csvfile = request.files['csvFile']
      games_to_add = []
    

      if csvfile:
            # Read the Bytes and convert to String
            contents = csvfile.read().decode('utf-8')
            stream = io.StringIO(contents)
            reader = csv.DictReader(stream)

            for row in reader:

                if not row["title"] or not row["console"] or not row["year"]  or not row["series"] or not row["cover_photo"]:
                     return {"msg": "One of the rows in your csv has an empty field."}, 422
               
                game_exists = Game.query.filter_by(title=row["title"].strip()).first()
                console = Console.query.filter_by(name=row["console"]).first()
                if game_exists:
                    return {"msg": f"{row["title"]} already exists in the database."}, 422
                
                if not console:
                    return {"msg": f"{row["console"]} does not exist in the database."}, 422
                     
                
                jpg_cover_location = os.path.abspath(os.path.join(current_app.config["CSV_UPLOAD_FOLDER"], row["cover_photo"] + ".jpg"))
          

                if not os.path.exists(jpg_cover_location):
                    
                     return {"msg": f"Cover photo for {row["title"]} is invalid"}, 422
                
             
                new_game = Game(title=row["title"], year=row["year"], series=row["series"], cover_photo=row["cover_photo"] +".jpg")
                games_to_add.append((new_game,jpg_cover_location,console))
             
                
            # All games are checked
            # With Shutils, you need the full file path (with the filename you want to copy
            # Source: a/mario.jpeg  Destination: b/ (NOT ENOUGH) -> b/mario.jpeg
            for game_entry in games_to_add:
                 
                 #  Cover photo path
                 destination_dir = os.path.abspath(os.path.join(current_app.config["UPLOAD_FOLDER"], game_entry[0].title))
                 if not os.path.exists(destination_dir):
                    os.mkdir(os.path.join(current_app.config["UPLOAD_FOLDER"], game_entry[0].title))

                 filename = os.path.basename(game_entry[1])  
                 destination_file = os.path.join(destination_dir, filename)

               
                 source = game_entry[1]
                 shutil.copyfile(source, destination_file)
              
        
                 db.session.add(game_entry[0])
                 db.session.commit()
                 db.session.refresh(game_entry[0])
                 new_game_console_combo = GameConsole(game_id = game_entry[0].id, console_id= game_entry[2].id)
                 db.session.add(new_game_console_combo)
            

            db.session.commit()
            return  {"msg": "The games have been successfully added."}, 200

      else:
           

          return  {"msg": "The file does not exist"}, 422

      
      
