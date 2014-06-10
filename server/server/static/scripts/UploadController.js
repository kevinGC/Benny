var saveLoadController = (function() {
	// private funcs
	// var uploadLyrics = function() {
	// 	var lyricsForm = $("<form>")
	// 		.append($("<textarea>")
	// 			.attr("rows", "50")
	// 			.attr("cols", "100"))
	// 		.append($("<button>")
	// 			.attr("type", "button")
	// 			.html("Submit")
	// 			.click(onUploadLyrics));
	// 	$("header").after(lyricsForm)
	// };

	// var uploadBennyJSON = function() {

	// };

	var onUploadLyrics = function() {
		window.songModel = songModel($(".left-pane>form>textarea").val());
		$(".left-pane>form").remove();
		setInterval(function() { 
			songModel.setTime(videoController.getTime());
		}, 50);
	};

	// initialization
	// $("#upload-lyrics").click(uploadLyrics);
	// $("#upload-benny").click(uploadBennyJSON);

	// TODO useless at the moment
	return {

	};
})();
