// TODO better singleton
var SongModel = function(songData) {
	window.songModel = this;
	this._time = 0; // what point are we in the _song?
	this._sliceStart = 0;
	this._sliceDuration = 10;
	this._song;
	this._currentLine;
	this._currentLineNum;
	// TODO should just be first line
	this._linesInSlice = [];

	if(typeof songData === 'object') {
		this._init(songData);
	} else if(typeof songData === 'string') {
		this._initWithLyricsData(songData);
	} else {
		throw new Error("Incorrect arguments");
	}
	this._strategy = new this._createSongStrategy(this);
};

SongModel.prototype._setCurrentLine = function() {
	for(var i = this._song.lines.length - 1; i >= 0; i--) {
		if(this._song.lines[i].startTime < this._time || i == 0) {
			if(this._currentLineNum !== i) {
				this._currentLineNum = i;
				this._currentLine = this._song.lines[i];
				return true;
			} else
				return false;
		}
	}
};

// get data formatted appropriately for lyricsController
// TODO is this protecting private data?
SongModel.prototype._getLyricsData = function() {
	// add lyrics
	var engLines  = [];
	var korLines  = [];
	var callbacks = [];

	var self = this;
	for(var i = 0; i < this._song.lines.length; i++) {
		engLines.push(this._song.lines[i].english);
		korLines.push(this._song.lines[i].korean);
		callbacks.push((function(x) { 
			return function() {
				// TODO should be handled by controller?
				// view.seekVideo(this._song.lines[x].startTime)
				// songModel.setTime(self._song.lines[x].startTime);
				videoController.seek(self._song.lines[x].startTime);
			};
		})(i));
	}
	return {
		english: engLines,
		korean: korLines,
		callbacks: callbacks
	};
};

// awkward return value
// TODO just set the private ivar, now that we have one
// TODO also just aesthetically ugly. Giant conditional
SongModel.prototype._setLinesInSlice = function() {
	this._linesInSlice = [];
	var firstLineNum;
	for(var i = 0; i < this._song.lines.length; i++) {
		if(this._sliceStart <= this._song.lines[i].startTime
			&& this._song.lines[i].startTime <= this._sliceStart + this._sliceDuration) {
			this._linesInSlice.push(i);
		}
	}
};

// TODO rename init functions
// TODO song should really contain the name
SongModel.prototype._init = function(song) {
	this._song = song;
};

// TODO bad naming EVERYwhere
// TODO rename _song.lines to lyrics?
SongModel.prototype._initWithLyricsData = function(lyricsData) {
	var dataLines = lyricsData.split('\n');
	this._song = {
		name    : dataLines[0],
		duration: dataLines[1],
		lines   : []
	}
	// create _song's 'lines' attribute
	dataLines.splice(0, 2);
	var timePerLyric = this._song.duration / dataLines.length;
	for(var i = 0; i < dataLines.length / 2; i++) {
		this._song.lines.push({
			english  : dataLines[i],
			korean   : dataLines[i + dataLines.length / 2],
			startTime: i * timePerLyric,
			metadata : []
		});
	}
};

SongModel.prototype.setTime = function(time) {
	this._time = time;
	this._strategy.run();
};

SongModel.prototype.setTimeAndSeek = function(time) {
	this._time
};

SongModel.prototype.getLines = function() {
	return this._song.lines.slice();
};

SongModel.prototype.getName = function() {
	return this._song.name.slice();
};

// TODO repeated code
SongModel.prototype.seek = function(time) {
	this._time = time;
	this._sliceStart = this._time;
	videoController.seek(this._time)
	// TODO redundancy
	this._setLinesInSlice();
	var self = this;
	var linesInSlice = _(this._linesInSlice).map(function(lineNum) {
		return self._song.lines[lineNum];
	});
	detailTimebarController.updateLines(linesInSlice
		, this._sliceStart, this._sliceDuration);

};

// SongModel.prototype.setStartTime = function(lineNum, startTime) {
// 	this._song.lines[lineNum].startTime = startTime;
// };

// passed an array of values that represent how far along the time slice each
// line occurs
SongModel.prototype.setStartTimes = function(ranges) {
	var total = 0;
	for(var i = 0; i < ranges.length; i++) {
		total += ranges[i];
		this._song.lines[i + this._linesInSlice[0]].startTime 
			= total * this._sliceDuration + this._sliceStart; 
	}
};

SongModel.prototype.getJSON = function() {
	return JSON.stringify(this._song);
};

SongModel.prototype.addMetadata = function(lineNum) {
	this._song.lines[lineNum].metadata.push({
		start : 0,
		length: 0,
		info  : '',
		link  : ''
	});
	lineDataController.updateLine(songModel._currentLine
		, songModel._currentLineNum);
};

SongModel.prototype.removeMetadata = function(lineNum, index) {
	this._song.lines[lineNum].metadata.splice(index, 1);
};

// strategies dictating how SongModel updates the world

SongModel.prototype._viewSongStrategy = function(songModel) {
	view.setVideo(songName);
	view.setRunLoop(_.bind(this.setTime, this));
};

SongModel.prototype._viewSongStrategy.prototype.run = function() {
	if(this._currentLine !== null) {
		view.updateLine(this._currentLine);
	}
};

// TODO oh god the redundancy is awful
SongModel.prototype._createSongStrategy = function(songModel) {
	this._songModel = songModel;
	this._songModel._setLinesInSlice();
	this._songModel._setCurrentLine();
	lyricsController.updateLyrics(songModel._getLyricsData());
	videoController.updateVideo(songModel._song.name);
	timebarController.init(songModel._sliceDuration, songModel._song.duration);
	lineDataController.updateLine(songModel._currentLine
		, songModel._currentLineNum);
	this.updateTimeSlice();
};

SongModel.prototype._createSongStrategy.prototype.run = function() {
	var lineDidChange = this._songModel._setCurrentLine();
	if(lineDidChange) {
		lineDataController.updateLine(this._songModel._currentLine
			, this._songModel._currentLineNum);
	}
	// TODO the + 0.005 prevents strange skipping behavior. Find a better solution!
	if(this._songModel._time + 0.005 < this._songModel._sliceStart
		|| this._songModel._time > this._songModel._sliceStart + this._songModel._sliceDuration) {
		this.updateTimeSlice();
	}
};

// TODO serious code repetition here!
SongModel.prototype._createSongStrategy.prototype.updateTimeSlice = function() {
	this._songModel._sliceStart = this._songModel._time;
	timebarController.updateTime(this._songModel._time - this._songModel._sliceDuration / 2
		, this._songModel._sliceDuration);
	this._songModel._setLinesInSlice();
	var self = this;
	var linesInSlice = _(this._songModel._linesInSlice).map(function(lineNum) {
		return self._songModel._song.lines[lineNum];
	});
	detailTimebarController.updateLines(linesInSlice
		, this._songModel._sliceStart
		, this._songModel._sliceDuration);
};

