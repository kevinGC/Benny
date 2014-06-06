// TODO better singleton
var SongModel = function(songData) {
	window.songModel = this;
	this._time = 0; // what point are we in the _song?
	this._sliceStart = 0;
	this._sliceDuration = 10;
	this._song;
	this._currentLine;

	if(typeof songData === 'object') {
		this._init(songData);
	} else if(typeof songData === 'string') {
		this._initWithLyricsData(songData);
	} else {
		throw new Error("Incorrect arguments");
	}
	this._strategy = new this._createSongStrategy(this);
};

SongModel.prototype._getCurrentLine = function() {
	for(var i = this._song.lines.length - 1; i >= 0; i--) {
		if(this._song.lines[i].startTime < this._time)
			return this._song.lines[i];
	}
	return this._song.lines[0];
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
SongModel.prototype._getLinesInSlice = function() {
	var linesInSlice = [];
	var firstLineNum;
	for(var i = 0; i < this._song.lines.length; i++) {
		if(this._sliceStart <= this._song.lines[i].startTime
			&& this._song.lines[i].startTime <= this._sliceStart + this._sliceDuration) {
			linesInSlice.push(this._song.lines[i]);
			if(firstLineNum === undefined) {
				firstLineNum = i;
			}
		}
	}
	return {
		lines: linesInSlice,
		firstLineNum: firstLineNum
	};
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
}

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
	var linesInSlice = this._getLinesInSlice();
	detailTimebarController.updateLines(linesInSlice.lines
		, this._sliceStart, this._sliceDuration, linesInSlice.firstLineNum);

};

SongModel.prototype.setStartTime = function(lineNum, startTime) {
	this._song.lines[lineNum].startTime = startTime;
};

SongModel.prototype.getJSON = function() {
	return JSON.stringify(this._song);
};

// strategies dictating how SongModel updates the world

SongModel.prototype._viewSongStrategy = function(songModel) {
	view.setVideo(songName);
	view.setRunLoop(_.bind(this.setTime, this));
};

SongModel.prototype._viewSongStrategy.prototype.run = function() {
	var line = getCurrentLine();
	if(line !== null) {
		view.updateLine(line);
	}
};

SongModel.prototype._createSongStrategy = function(songModel) {
	this._songModel = songModel;
	lyricsController.updateLyrics(songModel._getLyricsData());
	videoController.updateVideo(songModel._song.name);
	timebarController.init(songModel._sliceDuration, songModel._song.duration);
	lineDataController.updateLine(songModel._getCurrentLine());
	this.updateTimeSlice();
};

SongModel.prototype._createSongStrategy.prototype.run = function() {
	var newLine = this._songModel._getCurrentLine();
	if(newLine !== this._songModel._currentLine) {
		this._songModel._currentLine = newLine;
		lineDataController.updateLine(this._songModel._currentLine);
	}
	if(this._songModel._time < this._songModel._sliceStart
		|| this._songModel._time > this._songModel._sliceStart + this._songModel._sliceDuration) {
		this.updateTimeSlice();
	}
};

SongModel.prototype._createSongStrategy.prototype.updateTimeSlice = function() {
	this._songModel._sliceStart = this._songModel._time;
	timebarController.updateTime(this._songModel._time - this._songModel._sliceDuration / 2
		, this._songModel._sliceDuration);
	var linesInSlice = this._songModel._getLinesInSlice();
	detailTimebarController.updateLines(linesInSlice.lines
		, this._songModel._sliceStart
		, this._songModel._sliceDuration
		, linesInSlice.firstLineNum);
};

