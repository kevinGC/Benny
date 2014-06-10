var Utility = (function() {

	return {
		parseArgs: function() {
			var args = location.search.substr(1).split("&");
			window.urlArgs = {};
			_.each(args, function(argStr) {
				var pair = argStr.split("=");
				urlArgs[pair[0]] = pair[1];
			});
			return urlArgs;
		},

		createSongJSON: function(lyricsData) {
			var dataLines = lyricsData.split('\n');
			var song = {
				name    : dataLines[0],
				duration: dataLines[1],
				lines   : []
			}
			// create _song's 'lines' attribute
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
	}
})();
