# -*- coding: utf-8 -*-
from server import app
from flask import render_template
from server.database import db, Song

# TODO importing with templates for header/nav

# TODO how do I select only name?
# list all songs
@app.route('/')
def index():
	songs = map(lambda s: s.name, Song.query.all())
	return render_template('index.html', songs = songs)

@app.route('/view/<songName>')
def view(songName):
	return 'view a song called' + songName

@app.route('/create/')
def create():
	return render_template('create.html')

@app.route('/edit/<songName>')
def edit(songName):
	song = Song.query.filter_by(name = songName).first()
	return render_template('edit.html', song = song.json)
