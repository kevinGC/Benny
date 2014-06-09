# TODO whoops, camel case is a python nono
from server import app
from flask.ext.sqlalchemy import SQLAlchemy

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
db = SQLAlchemy(app)

class Song(db.Model):
	id        = db.Column(db.Integer, primary_key = True, autoincrement = True)
	json      = db.Column(db.String(), unique = True)
	name      = db.Column(db.String(80))
	videoFile = db.Column(db.String(80))

	def __init__(self, name, songFile, videoFile):
		self.name      = name
		self.songFile  = songFile
		self.videoFile = videoFile

	# TODO make this print id
	# def __repr__(self):
	# 	return '<Song ' + self.songFile + '>'
