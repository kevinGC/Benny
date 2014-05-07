var controller = (function() {
	var currentSong = null;

	return {
		loadSong: function(songName) {
			console.log("loadSong(" + songName + ")");
			
			var song      = SongManager.getSong(songName);
			var engLines  = [];
			var korLines  = [];
			var callbacks = [];

			// add lines
			for(var i = 0; i < song.lines.length; i++) {
				engLines.push(song.lines[i].english);
				korLines.push(song.lines[i].korean);
				var that = this;
				callbacks.push((function(x) { 
					return function() {
						that.setLineWithTime(song.lines[x].startTime);
						view.seekVideo(song.lines[x].startTime)
					};
				})(i));
			}
			view.setLines(engLines, korLines, callbacks);

			// TODO
			// add video and initial line + grammar?
			view.setVideo(songName);
			view.setRunLoop(this.setGrammarWithTime);

			currentSong = song;
		},

		setLineWithTime: function(time) {
			// console.log("setLineWithTime(" + time + ")");
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
		},

		// setLineWithNum: function(lineNum) {
		// 	console.log("setLineWithNum(" + lineNum + ")");
		// 	view.seekVideo(currentSong.lines[lineNum].startTime)
		// }
	};

})();
