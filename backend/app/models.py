from flask_login import UserMixin
from sqlalchemy.orm import relationship
from app import db



# User Class with a UserMixin features such as is_authenticated()
# Primary Key: ID
# Users have a unique username, email specified by the unique argument 
# Passwords are not unique
# Many-to-many relationship with Game_Ownership class, i.e. A user can own many games and games can be owned by many users
class User(UserMixin, db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique = True )
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))
    games = relationship("Game", secondary="game_ownership", back_populates="users")
    
    

# Console Class
# Primary Key: ID
# Consoles have a name, a year of release, and their firm.
# Many-to-many relationships with Game_Console class, i.e. A console has many games and games can be on various consoles
class Console(db.Model):
    __tablename__ = "consoles"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    firm = db.Column(db.String(100))
    year = db.Column(db.Integer)
    games = relationship("Game", secondary="game_console", back_populates="consoles")
  
    
    # Returns a JSON object of a Console 
    def to_json(self):
        return {
            "id": self.id,
            "name": self.name,
            "firm": self.firm,
            "year": self.year
            
        }


# Game Class
# Primary Key: ID
# Games have a title, a year of release, a series, a cover_photo
# Games have many-to-many relationships with both the User and Console classes.



class Game(db.Model):
    __tablename__ = "games"
    id = db.Column(db.Integer, primary_key=True)
    title= db.Column(db.String(100))
    year = db.Column(db.Integer )
    series= db.Column(db.String(100))
    cover_photo = db.Column(db.String(100))  
    users = relationship("User", secondary="game_ownership", back_populates="games")
    consoles = relationship("Console", secondary="game_console", back_populates="games")
    
    
     # Returns a JSON object of a Game
    def to_json(self):
        return {
            "id": self.id,
            "title": self.title,
            "year": self.year,
            "series": self.series,
            "cover_photo": self.cover_photo
        }
    

    
# Relationship table for Users and Games.
# Primary Keys: game_id and user_id
# Memories are stored in the relationship, since every user has a unique memory related to the game
    
class GameOwnership(db.Model):
    __tablename__ = "game_ownership"
    game_id = db.Column(db.Integer, db.ForeignKey("games.id"), primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), primary_key=True)
    memories = db.Column(db.String(100))

# Relationship table for Consoles and Games
# Primary Keys: game_id and console_id 

class GameConsole(db.Model):
    __tablename__ = "game_console"
    game_id = db.Column(db.Integer, db.ForeignKey('games.id'), primary_key=True)
    console_id = db.Column( db.Integer, db.ForeignKey('consoles.id'), primary_key=True)
