var controller = {
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
		view.setLines(engLines, korLines);

		// TODO
		// add video and initial line + grammar?
		view.setVideo(songName);
	}
};
