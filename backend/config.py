import os
from dotenv import load_dotenv
from datetime import timedelta

# Get the directory of the config file - In python, __file__ is the absolute path of the file.
basedir = os.path.abspath(os.path.dirname(__file__))
# Now the keys in your .env file are accessible with .environ
load_dotenv(os.path.join(basedir, '.env'))






class Config:
    SECRET_KEY = os.environ.get("SECRET_KEY") or 'denied'
    SQLALCHEMY_DATABASE_URI  =  os.environ.get("DATABASE_URL")
    SQLALCHEMY_TRACK_MODIFICATIONS = os.environ.get("DATABASE_TRACKING")
    ADMIN = os.environ.get("ADMIN")
    EMAIL = os.environ.get("EMAIL")
    PASSWORD = os.environ.get("PASSWORD")
    JWT_ACCESS_TOKEN_EXPIRES  = timedelta(hours=1)
    UPLOAD_FOLDER = ""
    



