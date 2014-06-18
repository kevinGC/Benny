var saveLoadController = (function() {
	// TODO real saving
	var save = function() {
		console.log(songModel.getJSON());
	};

	// initialization
	$("#save").click(save);

	// TODO useless at the moment
	return {

	};
})();