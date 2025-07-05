

from flask_jwt_extended import get_jwt_identity
from functools import wraps
from app.models import User
                                

ALLOWED_EXTENSIONS = { 'jpg', 'jpeg'}

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS



# ---- Custom Decorator Functions -----#
# Make a route only accessible to the admin who has an id of 1.
def admin_only(func):
    @wraps(func)
    def inner(*args, **kwargs):
         current_user= get_jwt_identity()
         user= User.query.filter_by(username=current_user).first() 
        
         if user and user.id  == 1:
                
                return func(*args, **kwargs)
         else: 
                return 'Admin Only Access', 401
        
    return inner

