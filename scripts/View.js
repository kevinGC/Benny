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
			.attr("id", "vid")
			.append($("<source>")
				.attr("src", "res/video/Genie.mp4")
				.attr("type", "video/mp4"));
		$("#videoHolder").empty();
		$("#videoHolder").append(video);
	},

	setRunLoop: function(cb) {
		$("#vid").on("timeupdate", function() {
			controller.setLineWithTime($("#vid")[0].currentTime);
		});
	},

	// TODO naming. These should be updates, Controller should be set
	updateLine: function(english, korean, metadata) {
		$("#engLine").html(english);
		$("#korLine").html(korean);
		$("#metadata").empty();
		for(var i = 0; i < metadata.length; i++) {
			var li = $("<li>").html(metadata[i].start + ", " + metadata[i].len
				+ ", " + metadata[i].info);
			$("#metadata").append(li);
		}
	}
};
