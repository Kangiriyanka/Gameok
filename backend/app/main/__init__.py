from flask import Blueprint


bp = Blueprint("main", __name__)

from app.main import game_routes
from app.main import console_routes
from app.main import collection_routes
from app.main import admin_routes
