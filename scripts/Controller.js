var controller = (function() {
	// Controller controls the initial UI setup
	$(function() {
		// "entry point" of sorts. I'm sure this is all structured wrong
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

	// functions called exclusively by controller

	// TODO ????
	return {
		loadSong: function(songName) {
			console.log("loadSong(" + songName + ")");

			var song = SongManager.getSong(songName);
			var engLines = [];
			var korLines = [];

			// add lines
			for(var i = 0; i < song.lines.length; i++) {
				engLines.push(song.lines[i].english);
				korLines.push(song.lines[i].korean);
			}
			view.addLines(engLines, korLines);

			// TODO
			// add video and initial line + grammar?
			view.addVideo(songName);
		}
	};
	
})();
