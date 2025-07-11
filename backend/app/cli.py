from flask import Blueprint, app
import os 
from app import db 
from app.models import User
import click


bp = Blueprint("cli", __name__)



# Create all the tables 
@bp.cli.command('create-db')
def init_database():
    db.create_all()
    return "Successfully created all the tables"
 

# Create the admin using app.config to fetch the previously set environment variables
# The admin has more privileges than the regular users such as adding consoles to the database.
@bp.cli.command('create-admin')
def create_admin():
    admin_username = os.getenv("ADMIN")
    admin_email = os.getenv("EMAIL")
    admin_password = os.getenv("PASSWORD")
    admin= User(username = admin_username, email= admin_email, password= admin_password)
    db.session.add(admin)
    db.session.commit()
    return f"Successfully created admin {admin_username} "
    

# Drop all tables using the MetaData Object
# SQLALchemy Metadata documentation: 
# A collection of Table objects and their associated schema constructs.


@bp.cli.command('drop-tables')
def drop_all_tables():
    try:
      
        db.metadata.drop_all(db.engine)
        return "Successfully deleted all tables"
    except Exception as e:
     
        return str(e)
    
    
# Drop a specific table using metadata.tables()
@bp.route('/remove_table/<table_name>/')
@click.argument('table_name')
def drop_table(table_name):
    try:
        table = db.Model.metadata.tables[table_name]
        table.drop(db.engine)
        return f"Successfully deleted table {table_name}."
    except Exception as e:
     
        return str(e)
