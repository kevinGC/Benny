var controller = (function() {
	var currentSong = null;

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
			view.setLines(engLines, korLines);

			// TODO
			// add video and initial line + grammar?
			view.setVideo(songName);
			view.setRunLoop(this.setGrammarWithTime);

			currentSong = song;
		},

		setLineWithTime: function(time) {
			console.log("setLineWithTime(" + time + ")");
			var lineNum = SongManager.indexInSong(currentSong, time);
			if(lineNum != null) {
				view.updateLine(currentSong.lines[lineNum].english, 
					currentSong.lines[lineNum].korean, 
					currentSong.lines[lineNum].metadata);
				if(lineNum + 1 < currentSong.lines.length) {
					view.updateNextLine(currentSong.lines[lineNum + 1].english, 
						currentSong.lines[lineNum + 1].korean, 
						currentSong.lines[lineNum + 1].metadata)
				}
			}
		}

		// setGrammarWithLineNum: function(lineNum) {
		// 	cosole.log("setGrammarWithLineNum(" + time + ")");
		// }
	};

})();
