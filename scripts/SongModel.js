// TODO better singleton
var songModel = function(songData) {
	var that = {};

	// PRIVATE
	var song;
	var currentLine;
	var currentLineNum;
	var linesInSlice  = []; // TODO should just be first line
	var time          = 0;
	var sliceStart    = 0;
	var sliceDuration = 10;

	var setCurrentLine = function() {
		for(var i = song.lines.length - 1; i >= 0; i--) {
			if(song.lines[i].startTime < time || i == 0) {
				if(currentLineNum !== i) {
					currentLineNum = i;
					currentLine = song.lines[i];
					return true;
				} else
					return false;
			}
		}
	};

	// get data formatted appropriately for lyricsController
	var getLyricsData = function() {
		// add lyrics
		var engLines   = [];
		var korLines   = [];
		var callbacks  = [];
		var startTimes = [];

		for(var i = 0; i < song.lines.length; i++) {
			engLines.push(song.lines[i].english);
			korLines.push(song.lines[i].korean);
			startTimes.push(song.lines[i].startTime);
			callbacks.push((function(x) { 
				return function() {
					// view.seekVideo(this._song.lines[x].startTime)
					videoController.seek(song.lines[x].startTime);
				};
			})(i));
		}
		return {
			english   : engLines,
			korean    : korLines,
			callbacks : callbacks,
			startTimes: startTimes
		};
	};

	var setLinesInSlice = function() {
		linesInSlice = [];
		var firstLineNum;
		for(var i = 0; i < song.lines.length; i++) {
			if(sliceStart <= song.lines[i].startTime) {
				if(song.lines[i].startTime <= sliceStart + sliceDuration) {
					linesInSlice.push(i);
				} else 
					break;
			}
		}
	};

	var initWithLyricsData = function(lyricsData) {
		var dataLines = lyricsData.split('\n');
		song = {
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
	};

	// strategies dictating how SongModel updates the world
	// var viewSongStrategy = function(songModel) {
	// 	view.setVideo(songName);
	// 	view.setRunLoop(_.bind(this.setTime, this));
	// };

	// var viewSongStrategy.prototype.run = function() {
	// 	if(this._currentLine !== null) {
	// 		view.updateLine(this._currentLine);
	// 	}
	// };

	var createSongStrategy = function() {
		var that = {};

		// PRIVATE
		var updateTimeSlice = function() {
			sliceStart = time;
			timebarController.updateTime(time - sliceDuration / 2, sliceDuration);
			onSeek();
		};

		var onSeek = function() {
			setLinesInSlice();
			var relevantLines = _(linesInSlice).map(function(lineNum) {
				return song.lines[lineNum];
			});
			detailTimebarController.updateLines(relevantLines
				, sliceStart
				, sliceDuration);
		};
		that.onSeek = onSeek;

		// PUBLIC
		var run = function() {
			var lineDidChange = setCurrentLine();
			if(lineDidChange) {
				lineDataController.updateLine(currentLine, currentLineNum);
			}
			// TODO the + 0.005 prevents strange skipping behavior. Find a better solution!
			if(time + 0.005 < sliceStart || time > sliceStart + sliceDuration) {
				updateTimeSlice();
			}
		};
		that.run = run;

		//CONSTRUCTION
		setLinesInSlice();
		setCurrentLine();
		lyricsController.updateLyrics(getLyricsData());
		videoController.updateVideo(song.name);
		timebarController.init(sliceDuration, song.duration);
		lineDataController.updateLine(currentLine, currentLineNum);
		updateTimeSlice();
		return that;
	};


	// PUBLIC
	var setTime = function(time_) {
		time = time_;
		strategy.run();
	};
	that.setTime = setTime;

	var getLines = function() {
		return song.lines.slice();
	};
	that.getLines = getLines;

	var getName = function() {
		return song.name.slice();
	};
	that.getName = getName;

	var seek = function(time_) {
		if(!time_) // TODO why is this called multiple times??????
			return;
		time = time_;
		sliceStart = time;
		videoController.seek(time)
		strategy.onSeek();
	};
	that.seek = seek;

	var seekInSlice = function(pctOffset) {

	}
	that.seekInSlice = seekInSlice;

	var setStartTime = function(lineNum, startTime) {
		song.lines[lineNum].startTime = startTime;
	}
	that.setStartTime = setStartTime;

	// passed an array of values that represent how far along the time slice each
	// line occurs
	var setStartTimes = function(ranges) {
		var total = 0;
		for(var i = 0; i < ranges.length; i++) {
			total += ranges[i];
			song.lines[i + linesInSlice[0]].startTime 
				= total * sliceDuration + sliceStart; 
		}
	};
	that.setStartTimes = setStartTimes;

	var getJSON = function() {
		return JSON.stringify(song);
	};
	that.getJSON = getJSON;

	var addMetadata = function(lineNum) {
		song.lines[lineNum].metadata.push({
			start : 0,
			length: 0,
			info  : '',
			link  : ''
		});
		lineDataController.updateLine(currentLine
			, currentLineNum);
	};
	that.addMetadata = addMetadata;

	var removeMetadata = function(lineNum, index) {
		song.lines[lineNum].metadata.splice(index, 1);
	};
	that.removeMetadata = removeMetadata;

	// CONSTRUCTION
	if(typeof songData === 'object') {
		song = songData;
	} else if(typeof songData === 'string') {
		initWithLyricsData(songData);
	} else {
		throw new Error("Incorrect arguments");
	}
	strategy = createSongStrategy();
	return that;
};
