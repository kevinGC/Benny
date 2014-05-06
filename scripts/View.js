var view = (function() {

	return {
		addSong: function(songName, cb) {
			var nameElem = $("<li>")
				.html(songName)
				.click(cb);
			$("#songList").append(nameElem);
		},

		addLines: function(english, korean) {
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
		addVideo: function(name) {
			var video = $("<div>")
				.html(name)
				.css("width", "400px")
				.css("height", "300px")
				.css("background-color", "red");
			$("#videoHolder").empty();
			$("#videoHolder").append(video);
		}
	};
})();