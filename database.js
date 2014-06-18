var mongo  = require('mongodb');

var MongoClient = mongo.MongoClient;
var BSON        = mongo.BSONPure;


var dbQuery = function(query) {
  MongoClient.connect('mongodb://localhost:27017/benny', function(err, db) {
    if(err)
      throw err;
    var collection = db.collection('songs');
    query(collection);
  });
};

// TODO I refer to song/songData/lyricsData differently in different places. Fix that
exports.insertSong = function(songData, video) {
  dbQuery(function(collection) {
    collection.insert({
      name : songData.name,
      data : songData,
      video: video
    }, function(err, ins) {
      if(err)
        console.log(err);
    });
  });
};

exports.findSong = function(id, cb) {
  dbQuery(function(collection) {
    collection.findOne({ _id: new BSON.ObjectID(id) }, function(err, result) {
      if(err)
        throw err;
      cb(result);
    });
  });
}

exports.getAllSongs = function(cb) {
  dbQuery(function(collection) {
    collection.find({}, { name: true }).toArray(function(err, results) {
      if(err)
        throw err;
      cb(results);
    });
  });
}
