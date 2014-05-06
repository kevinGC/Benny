// Defines a singleton SongManager with a getSong() function
var SongManager = (function() {
	// declare all songs
	// TODO separate file?
	// TODO some kind of Song/SongModel class
	var songs = {
		"Genie": {
			"lines": [{
				"english": "tell me your wish",
				"korean": "소원을 말해봐!",
				"startTime": 10,
				"metadata": [
					{ "start": 0, "len": 2, "info": "wish" },
					{ "start": 2, "len": 1, "info": "object particle" },
					{ "start": 4, "len": 2, "info": "to say/talk" },
					{ "start": 5, "len": 2, "info": "grammar: to try" }
				]
				}, {
				"english": "tell me that small dream you have within you",
				"korean": "니 마음속에 있는 작은 꿈을 말해봐",
				"startTime": 12,
				"metadata": [
					{ "start": 0, "len": 1, "info": "informal you" },
					{ "start": 2, "len": 3, "info": "one's mind/heart" },
					{ "start": 5, "len": 1, "info": "grammar: in" },
					{ "start": 7, "len": 1, "info": "to have" },
					{ "start": 8, "len": 1, "info": "grammar: verb to adj mod" },
					{ "start": 10, "len": 1, "info": "to be small" },
					{ "start": 11, "len": 1, "info": "grammar: vert to adj mod" },
					{ "start": 13, "len": 1, "info": "dream" },
					{ "start": 14, "len": 1, "info": "object particle" },
					{ "start": 15, "len": 2, "info": "to say/talk" },
					{ "start": 16, "len": 2, "info": "grammar: to try" }
				]
				}, {
				"english": "draw that ideal person you have inside your head",
				"korean": "니 머리에있는 이상형을 그려봐",
				"startTime": 16,
				"metadata": [
					{ "start": 0, "len": 1, "info": "you" },
					{ "start": 2, "len": 2, "info": "head/mind" },
					{ "start": 4, "len": 1, "info": "in" },
					{ "start": 5, "len": 1, "info": "to have" },
					{ "start": 6, "len": 1, "info": "verb to adj mod" },
					{ "start": 8, "len": 3, "info": "ideal type" },
					{ "start": 11, "len": 1, "info": "object particle" },
					{ "start": 13, "len": 2, "info": "to draw" },
					{ "start": 14, "len": 2, "info": "grammar: to try" }
				]
				}
			]
		}
	};

	var songNames = [];
	for(var songName in songs) {
		songNames.push(songName);
	}

	return {
		getSong: function(name) {
			if(name in songs)
				return $.extend({}, songs[name]);
			throw new Error("no song of name " + name);
		},

		getSongNames: function() {
			return songNames.slice(); // aka slice(0) aka copied array
		},

		// TODO efficiency? Shouldn't matter in this case
		lineInSong: function(song, time) {
			for(var i = song.lines.length - 1; i >= 0; i--) {
				if(song.lines[i].startTime < time)
					return song.lines[i];
			}
			return null;
		}
	};

})();

