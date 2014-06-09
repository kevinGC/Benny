// "entry point" of sorts. I'm sure this is all structured wrong
// Primary job is to pupulate page with initial data and set up callbacks
$(function() {
	console.log("안녕, 월드");

	// load song
	controller.loadSong(Utility.parseArgs().song);
});

