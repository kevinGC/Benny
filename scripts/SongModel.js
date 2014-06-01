// TODO better singleton
var songModel = (function() {
	window.songModel = this;

	// TODO _song now has 'name' property
	var _time = 0; // what point are we in the _song?
	var _sliceStart = 0;
	var _sliceDuration = 20;
	var _songName;
	var _song;

	var getCurrentLine = function() {
		for(var i = _song.lines.length - 1; i >= 0; i--) {
			if(_song.lines[i].startTime < _time)
				return _song.lines[i];
		}
		return null;
	};

	// get data formatted appropriately for lyricsController
	// TODO is this protecting private data?
	var getLyricsData = function() {
		// add lyrics
		var engLines  = [];
		var korLines  = [];
		var callbacks = [];

		for(var i = 0; i < _song.lines.length; i++) {
			engLines.push(_song.lines[i].english);
			korLines.push(_song.lines[i].korean);
			callbacks.push((function(x) { 
				return function() {
					// TODO should be handled by controller?
					// view.seekVideo(_song.lines[x].startTime)
					songModel.setTime(_song.lines[x].startTime);
				};
			})(i));
		}
		return {
			english: engLines,
			korean: korLines,
			callbacks: callbacks
		};
	};

	var getLinesInSlice = function() {
		return _(_song.lines).filter(function(line) {
			return _sliceStart <= line.startTime
				&& line.startTime <= _sliceStart + _sliceDuration;
		});
	};


	// TODO for viewer
	// view.setVideo(songName);
	// view.setRunLoop(_.bind(this.setTime, this));

	return {
		// song should really contain the name
		init: function(songName, song) {
			_songName = songName;
			_song = song;

			lyricsController.updateLyrics(getLyricsData());
			videoController.updateVideo(_songName);
			timebarController.updatePrefs(_sliceDuration, _song.duration);
			detailTimebarController.updateLines(getLinesInSlice()
				, _sliceStart, _sliceDuration);
		},

		setTime: function(time) {
			_time = time;
			var line = getCurrentLine();
			if(line !== null) {
				view.updateLine(line);
			};
		},

		getLines: function() {
			return _song.lines.slice();
		},

		getName: function() {
			return _songName.slice();
		}
	};
})();
