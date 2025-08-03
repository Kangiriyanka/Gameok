from flask import Blueprint, app
import os 
from app import db 
from app.models import Game, User,Console
import click


bp = Blueprint("cli", __name__)



# Create all the tables 
@bp.cli.command('create-db')
def init_database():
    db.create_all()
    click.echo("Succesfully created the database")
 

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
    click.echo(f"Succesfully added admin {admin_username}")
    

# Drop all tables using the MetaData Object
# SQLALchemy Metadata documentation: 
# A collection of Table objects and their associated schema constructs.


@bp.cli.command('add-consoles')
def add_consoles():
    popular_consoles = [
    {"name": "Game Boy", "firm": "Nintendo", "year": 1989},
    {"name": "Game Boy Color", "firm": "Nintendo", "year": 1998},
    {"name": "Nintendo 64", "firm": "Nintendo", "year": 1996},
    {"name": "Nintendo DS", "firm": "Nintendo", "year": 2004},
    {"name": "Nintendo Switch", "firm": "Nintendo", "year": 2017},
    {"name": "Super Nintendo", "firm": "Nintendo", "year": 1991},
    {"name": "Wii", "firm": "Nintendo", "year": 2006},
    {"name": "Xbox 360", "firm": "Microsoft", "year": 2005},
    {"name": "Xbox One", "firm": "Microsoft", "year": 2013},
    {"name": "Xbox Series X/S", "firm": "Microsoft", "year": 2020},
    {"name": "Sega Genesis", "firm": "Sega", "year": 1989},
    {"name": "PlayStation", "firm": "Sony", "year": 1994},
    {"name": "PlayStation 2", "firm": "Sony", "year": 2000},
    {"name": "PlayStation 3", "firm": "Sony", "year": 2006},
    {"name": "PlayStation 4", "firm": "Sony", "year": 2013},
    {"name": "PlayStation 5", "firm": "Sony", "year": 2020}
]
    
    for console in popular_consoles:
        c = Console(name= console["name"], year= console["year"], firm= console["firm"])
        db.session.add(c)
    db.session.commit()
    click.echo(f"Succesfully added popular consoles. You can add more in the Add Consoles page")




@bp.cli.command('delete-game')
@click.argument('game_id', type=int)
def delete_game(game_id):

    game = Game.query.get(game_id)
    if not game:
        print(f"Game with id={game_id} not found.")
        return

    db.session.delete(game)
    db.session.commit()
    print(f"Deleted game with id={game_id} title={game.title}.")
    

@bp.cli.command('drop-tables')
def drop_all_tables():
    try:
      
        db.metadata.drop_all(db.engine)
        click.echo("Successfully deleted all tables")
    except Exception as e:
     
        return str(e)
    
    
# Drop a specific table using metadata.tables()
@bp.route('/remove_table/<table_name>/')
@click.argument('table_name')
def drop_table(table_name):
    try:
        table = db.Model.metadata.tables[table_name]
        table.drop(db.engine)
        return click.echo(f"Successfully deleted table {table_name}.")
    except Exception as e:
     
        return str(e)
