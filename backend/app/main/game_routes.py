
import os 
import uuid
from app.main import bp
from app import db
from app.models import *
from flask_jwt_extended import jwt_required, get_jwt_identity
from werkzeug.utils import secure_filename
from flask import request
from app.main.helpers import allowed_file

@bp.route('/game/get_all_game_titles', methods = ["GET"])
@jwt_required()
def get_all_game_titles():
    
   
    game_names = []
    games = db.session.query(Game).all()

   
   
    for game in games:
         game_names.append(game.title)
         
 
    return game_names



@bp.route('/game/add_game', methods= ["POST"])
@jwt_required()
def add_game():
 try:
 
     # Check if any of the fields is empty
     
     
   for key, value in request.form.items():
            if value == "":
                return "One of the fields is not filled, please check."
        
   a_title = request.form['title']
   a_year = int(request.form['year'])
   a_series = request.form['series']
   some_memories = request.form['memories']
   
   posted_game = Game(title=a_title, year=a_year, series=a_series)

    
    # Get the username
   current_user= get_jwt_identity()
  
    
   
   current_game = Game.query.filter_by(title=request.form["title"]).first()
   
   
   console= Console.query.filter_by(name=request.form["console"]).first()
   
   user= User.query.filter_by(username=current_user).first() 
  

  
    # If the game doesn't exist in the Games table , add it to the games table and establish relationships
   if  not current_game:
           
         # Handle the cover photo upload
            cover_photo = request.files['coverPhoto']
            print(cover_photo)
          
           
            
            # Check if the cover photo exists and if it's either in a jpg or jpeg format.
            if cover_photo and allowed_file(cover_photo.filename):
               
                # Generate a unique filename for the cover photo
                filename = secure_filename(cover_photo.filename)
                filename = f"{str(uuid.uuid4())}-{filename}"
                file_path = os.path.join(os.get['UPLOAD_FOLDER'], filename)
           
                print(filename)
             
                

                # Save the cover photo to the specified path
                cover_photo.seek(0)
                cover_photo.save(file_path)
               
                
    
                # Set the cover photo path for the game
                posted_game.cover_photo = "/images/" + filename
               
                db.session.commit()
            else:
                
                return "Please add a cover photo in either .jpg or .jpeg format"
            
            print(posted_game)
            db.session.add(posted_game)
            db.session.commit()
            
            # Refresh the posted_game object after it is committed to the database, which will update its id attribute with the new ID
            db.session.refresh(posted_game)
       
          
            # Add the relationship between the game and the user
            new_game_ownership= GameOwnership(game_id = posted_game.id, user_id= user.id, memories= some_memories)
            db.session.add(new_game_ownership)
            db.session.commit()
            
            # Add the relationship between the game and the console
            
            new_game_console_combo = GameConsole(game_id = posted_game.id, console_id= console.id)
            db.session.add(new_game_console_combo)
            db.session.commit()
            
            return f"{a_title}  was added to your collection"
        
    # If the game exists in the table and the user has the game then tell the user they already own the game.
   elif  current_game : 
      
      has_game = GameOwnership.query.filter_by(user_id=user.id, game_id=current_game.id).first()
      if has_game: 
        return "This game already exists in your library"
    
      else:
            
          
            # Add the relationship between the game and the user
            new_game_ownership= GameOwnership(game_id = current_game.id, user_id= user.id, memories= some_memories)
            db.session.add(new_game_ownership)
            db.session.commit()
            
        

            return f"{a_title}  was added to your collection"
       

        
 except Exception as e:
        return f"An error occurred: {str(e)}"
 

@bp.route("/game/delete_game/<a_game_id>", methods=["DELETE"])
@jwt_required()
def delete_game(a_game_id):
    
    id = a_game_id
    user= get_jwt_identity()
    a_user_id= User.query.filter_by(username=user).first().id
    print(a_user_id)
    GameOwnership.query.filter_by(game_id= a_game_id, user_id= a_user_id).delete()
    db.session.commit()
    return "Succesfully deleted game from the user's library"
    

