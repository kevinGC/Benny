var controller = (function() {
	return {
		loadSong: function(songName) {
			console.log("loadSong(" + songName + ")");
			if(window.songModel !== undefined)
				throw new Error("multiple SongModels");
			window.songModel = new SongModel(songName, 
				SongManager.getSong(songName));
		}
	};
})();
