var videoController = (function() {
	var _video;

	return {
		// TODO fix generic names
		updateVideo: function(name) {
			_video = $("<video>")
				.css("width", "640px")
				.css("height", "360px")
				.attr("id", "vid")
				.append($("<source>")
					.attr("src", "res/video/" + name + ".mp4")
					.attr("type", "video/mp4"))
					.attr("controls", "")[0];
			// $("#video-container").empty();
			$("#video-container").append(_video);
		},

		seek: function(time) {
			_video.currentTime = time;
		},

		getTime: function() {
			return _video.currentTime;
		}
	};
})();