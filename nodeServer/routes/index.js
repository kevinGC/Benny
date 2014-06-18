var express  = require('express');
var database = require('../database');
// var app      = require('../app');

var router = express.Router();

router.get('/', function(req, res) {
  database.getAllSongs(function(songs) {
    res.render('list', {
      songs: songs,
      title: 'Songs'
    });
  });
});

router.get('/view/:songName', function(req, res) {
  console.log('view ' + req.params.songName + ' called');
  res.render('view', { songName: req.params.songName })
});

router.get('/create', function(req, res) {
  console.log('create called');
  res.render('create');
});

router.get('/edit/:songID', function(req, res) {
  console.log('edit ' + req.params.songID + ' called');
  database.findSong(req.params.songID, function(record) {
    // console.log(record);
    console.log('/videos/' + record.video);
    res.render('edit', {
     songJSON: JSON.stringify(record.data),
     // songJSON: songData,
     videoPath: '/videos/' + record.video, // TODO app.get didn't work...
     id: record._id
   });
  });
});

router.get('/about', function(req, res) {
  res.render('about');
});

router.post('/upload', function(req, res) {
  var songData = processSongData(req.body.data);
  if(songData) {
    database.insertSong(songData, req.files.video.name);
  }
  res.redirect('/');
});

var processSongData = function(songData) {
  var dataLines = songData.split('\n');
  var song = {
    name    : dataLines[0],
    duration: dataLines[1],
    lines   : []
  }
  if(song.name === NaN || song.duration === NaN || dataLines.length % 2 !== 0)
    return null;

  dataLines.splice(0, 2);
  var numLines = dataLines.length / 2;
  var timePerLyric = song.duration / numLines;
  for(var i = 0; i < numLines; i++) {
    song.lines.push({
      english  : dataLines[i],
      korean   : dataLines[i + numLines],
      startTime: i * timePerLyric,
      metadata : []
    });
  }
  return song;
}

module.exports = router;
