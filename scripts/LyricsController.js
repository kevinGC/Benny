var lyricsController = (function() {

	return {
		updateLyrics: function(lyricsData) {
			// TOD why am I passing this so awkwardly?
			// grab data, alias shorter names
			var english    = lyricsData.english;
			var korean     = lyricsData.korean;
			var callbacks  = lyricsData.callbacks;
			var startTimes = lyricsData.startTimes;

			// set up lyrics table
			$("#lyrics > table").empty();
			for(var i = 0; i < english.length; i++) {
				var onInputChange = function(lineNum) {
					return function() {
						songModel.setStartTime(lineNum, $(this).val());
					}
				};
				var row = $("<tr>");
				row.append($("<input>")
					.attr("type", "text")
					.attr("value", startTimes[i].toFixed(2))
					.change(onInputChange(i)));
				row.append($("<td>").html(english[i]).click(callbacks[i]));
				row.append($("<td>").html(korean[i]).click(callbacks[i]));
				$("#lyrics > table").append(row);
			}
		}
	};
})();