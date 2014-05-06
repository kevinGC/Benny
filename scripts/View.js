var view = {
	addSong: function(songName, cb) {
		var nameElem = $("<li>")
			.html(songName)
			.click(cb);
		$("#songList").append(nameElem);
	},

	setLines: function(english, korean) {
		$("#engLyricsList").empty();
		$("#korLyricsList").empty();
		for(var i = 0; i < english.length; i++) {
			var engLyrics = $("<li>").html(english[i]);
			var korLyrics = $("<li>").html(korean[i]);
			$("#engLyricsList").append(engLyrics);
			$("#korLyricsList").append(korLyrics);
		}
	},

	// TODO
	setVideo: function(name) {
		var video = $("<video>")
			.css("width", "640px")
			.css("height", "360px")
			.append($("<source>")
				.attr("src", "res/video/Genie.mp4")
				.attr("type", "video/mp4"));
		$("#videoHolder").empty();
		$("#videoHolder").append(video);
	}
};
