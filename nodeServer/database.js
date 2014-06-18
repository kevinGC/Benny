var MongoClient = require('mongodb').MongoClient;
// var async       = requier('async');


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
  var insertHelper = function(record) {
    return function(collection) {
      collection.insert(record, function(err, docs) {
        collection.count(function(err, count) {
          console.log(format("count = %s", count));
        });
        collection.find().toArray(function(err, results) {
          console.dir(results);
          db.close(); // TODO is this reasonable?
        });
      });
    }
  };

  dbQuery(insertHelper({ songData: songData, video: video }));
};

exports.findSong = function(id) {
  dbQuery(function(collection) {
    collection.find({ _id: id }, function(record) {

    })
  });
}

exports.getAllSongs = function(cb) {
  dbQuery(function(collection) {
    collection.find({}, { name: true }).toArray(function(err, results) {
      if(err)
        throw err;
      console.log('results ' + results);
      console.log(results);
      cb(results);
    });
    // var songs = [];
    // var cursor = collection.find();
    // console.log(cursor);
    // var songs = cursor.toArray(function(songs) {
    //   console.log('oy, we got songs here!' + songs);
    //   cb(songs);
    // });
    // while(cursor.hasNext()) {
    //   var next = cursor.next();
    //   songs.push(next.name, next._id);
    // }
    // console.log('oy, we got songs here!' + songs);
    // cb(songs);
  });
}
