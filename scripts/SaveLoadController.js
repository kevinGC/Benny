var saveLoadController = (function() {
	// private funcs
	var save = function() {
		console.log(songModel.getJSON());
	};

	var uploadLyrics = function() {
		var lyricsForm = $("<form>")
			.append($("<textarea>")
				.attr("rows", "100")
				.attr("cols", "200"))
			.append($("<button>")
				.attr("type", "button")
				.html("Submit")
				.click(onUploadLyrics));
		$(".left-pane").prepend(lyricsForm)
	};

	var uploadBennyJSON = function() {

	};

	var onUploadLyrics = function() {
		window.songModel = new SongModel($(".left-pane>form>textarea").val());
		$(".left-pane>form").remove();
		setInterval(function() { 
			songModel.setTime(videoController.getTime());
		}, 50);
	};

	// initialization
	$("#save").click(save);
	$("#upload-lyrics").click(uploadLyrics);
	$("#upload-benny").click(uploadBennyJSON);

	// TODO useless at the moment
	return {

	};
})();