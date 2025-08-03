
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy 
from flask_cors import CORS  
from config import Config
from functools import wraps
import json
import uuid
from datetime import datetime, timedelta, timezone
from flask_migrate import Migrate



from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager         
from flask_cors import CORS, cross_origin    
from flask_sqlalchemy import SQLAlchemy                
from werkzeug.utils import secure_filename

# SQL Alchemy



MINUTES= 30

db = SQLAlchemy()
migrate = Migrate()
cors = CORS()
jwt = JWTManager()

# Application Factory
def create_app(config_class = Config):
    
    app = Flask(__name__)
    app.config.from_object(config_class)
   
    db.init_app(app)
    migrate.init_app(app,db, render_as_batch=True)
    cors.init_app(app)
    jwt.init_app(app)

    
    from app.main import bp as main_bp
    app.register_blueprint(main_bp)

    from app.cli import bp as cli_bp
    app.register_blueprint(cli_bp)

    from app.auth import bp as auth_bp
    app.register_blueprint(auth_bp)

  
    return app

# SQLAlchemy needs to know about the models
from app import models
