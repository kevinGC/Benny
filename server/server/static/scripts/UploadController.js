(function() {
	var onUploadLyrics = function() {
		window.songModel = songModel($(".left-pane>form>textarea").val());
		$(".left-pane>form").remove();
		setInterval(function() { 
			songModel.setTime(videoController.getTime());
		}, 50);
	};

	var isValidSong = function(songData) {
		// TODO
		return true;
	};

	$("#submit").click(function() {
		var songData = $("#song-data").val();
		if(!isValidSong(songData)) {
			alert("Invalid song data used"); // TODO inform about format
			return;
		}

		// TODO is video valid?
		// var data = {
		// 	song : Utility.createSongJSON(songData),
		// 	video: $("#upload-video").val()
		// };
		var formData = new FormData();
		formData.append('song', Utility.createSongJSON(songData));
		formData.append('video', $("#upload-video").get(0).files[0]);
		// debugger;

		$.ajax({
			type       : 'POST',
			url        : '/upload',
			data       : formData,
			processData: false,
			contentType: false,
			cache      : false,
			success    : function() { console.log('Success :D'); },
			error      : function() { console.log('Failure D:'); }
		});
	});
})();
