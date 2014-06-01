var lyricsController = (function() {

	return {
		updateLyrics: function(lyricsData) {
			// grab data, alias shorter names
			var english = lyricsData.english;
			var korean = lyricsData.korean;
			var callbacks = lyricsData.callbacks;

			// set up lyrics table
			$("#lyrics > table").empty();
			for(var i = 0; i < english.length; i++) {
				var row = $("<tr>");
				row.append($("<td>").html(english[i]).click(callbacks[i]));
				row.append($("<td>").html(korean[i]).click(callbacks[i]));
				$("#lyrics > table").append(row);
			}
		}
	};
})();