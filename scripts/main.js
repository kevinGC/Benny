// "entry point" of sorts. I'm sure this is all structured wrong
// Primary job is to pupulate page with initial data and set up callbacks
$(function() {
	console.log("안녕, 월드");

	// set up song list
	var songNames = SongManager.getSongNames();
	for(var i = 0; i < songNames.length; i++) {
		var loadSongHelper = function(x) { 
			return function() { controller.loadSong(songNames[x]); };
		};
		view.addSong(songNames[i], loadSongHelper(i));
	}
});

