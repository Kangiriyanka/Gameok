
import os 
import uuid
from app.main import bp
from app import db
from app.models import *
from flask_jwt_extended import jwt_required, get_jwt_identity
from werkzeug.utils import secure_filename
from flask import jsonify, request, current_app, send_from_directory
from app.main.helpers import allowed_file
from werkzeug.utils import secure_filename
from collections import defaultdict


# Issues; you can't store the absolute server path in the database, because when you deploy to another server, the path will be different. 

# To-do: 
# - Control file sizes 
# - Control extensions of saved files based on consoles.

@bp.route('/api/gamesaves/get_gamesaves/<a_game_id>/', methods = ["GET"])
@jwt_required()
def get_gamesave_files(a_game_id):
    user = get_jwt_identity()
    user_id= User.query.filter_by(username=user).first().id

    game_saves = GameSave.query.filter_by(user_id=user_id, game_id=a_game_id).all()
    print(f"Game saves: {game_saves}")
    return jsonify([save.to_json() for save in game_saves])




@bp.route('/api/gamesaves/upload_save_file/<a_game_id>', methods = ["POST"])
@jwt_required()
def upload_save_file(a_game_id):
    user = get_jwt_identity()
    user_id= User.query.filter_by(username=user).first().id
    a_game_id = request.form["game_id"]
    game = Game.query.get(a_game_id)
    file = request.files['file']
    if not game:
        return {"msg": f"Game with id={a_game_id} not found."}, 404
    
    elif 'file' not in request.files:
        return {"msg": "No file part in the request."}, 400
    title = game.title
    game_dir_path = os.path.abspath(os.path.join(current_app.config["GAMESAVE_UPLOAD_FOLDER"], title))
    if not os.path.exists(game_dir_path):
        print(f"Making a game directory {title}")
        # os.makedirs creates intermediate directories as required while just mkdir, you need to create the folder yourself before.
        game_dir = os.makedirs(os.path.join(current_app.config["GAMESAVE_UPLOAD_FOLDER"], title))
  
   


    filename = secure_filename(file.filename)
    filename = f"{str(uuid.uuid4())}-{filename}"
    filepath = os.path.abspath(os.path.join(game_dir_path,filename))

    # Remember that it's a Werkzeug FileStorage object (from request.files['file'])
    file.save(filepath)


    new_game_save = GameSave(game_id=a_game_id, user_id=user_id, filename=filename, filepath=filepath)
    db.session.add(new_game_save)
    db.session.commit()
    
    return {"msg": "Successfully uploaded save file."}, 200




@bp.route('/api/gamesaves/download/<filename>')
@jwt_required()
def download_save_file(filename):
    user = get_jwt_identity()
    user_id = User.query.filter_by(username=user).first().id
    
    # Verify user owns this save
    save = GameSave.query.filter_by(filename=filename, user_id=user_id).first()
    if not save:
        return {"msg": "Save file not found or unauthorized"}, 404
    
    game = Game.query.get(save.game_id)
    # as_attachment=True prompts for download
    game_dir = os.path.join(current_app.config["GAMESAVE_UPLOAD_FOLDER"], game.title)
    
    return send_from_directory(game_dir, filename, as_attachment=True)



@bp.route('/api/gamesaves/delete/<a_save_id>/', methods=["DELETE"])
@jwt_required()
def delete_gamesave(a_save_id):
    user = get_jwt_identity()
    a_user_id = User.query.filter_by(username=user).first().id
    
    # Get the save file to verify ownership and get filepath
    save = GameSave.query.filter_by(id=a_save_id, user_id=a_user_id).first()
    
    if not save:
        return {"msg": "Save file not found or unauthorized"}, 404
    
    # Delete the physical file
    try:
        if os.path.exists(save.filepath):
            os.remove(save.filepath)
    except Exception as e:
        print(f"Error deleting file: {e}")
    
    # Delete the database record
    db.session.delete(save)
    db.session.commit()
    
    return {"msg": "Successfully deleted gamesave"}, 200






