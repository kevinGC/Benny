# -*- coding: utf-8 -*-
from os import path
from server import app
from flask import render_template, request, redirect, url_for, abort
from werkzeug.utils import secure_filename
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

@app.route('/upload', methods=['POST'])
def upload():
	print 'upload called'
	print request
	print request.files
	vidFile = request.files['video']
	print 'hi'
	if vidFile and allowed_file(vidFile.filename):
		print "file is allowed"
		filename = secure_filename(vidFile.filename)
		print app.config['UPLOAD_FOLDER']
		print path.join(app.config['UPLOAD_FOLDER'])
		vidFile.save(path.join(app.config['UPLOAD_FOLDER'], filename))
		return '' # TODO is this success?
	print 'file is not allowed'
	return abort(400)

# helpers

def allowed_file(filename):
    return ('.' in filename 
		and filename.rsplit('.', 1)[1] in app.config['ALLOWED_EXTENSIONS'])
