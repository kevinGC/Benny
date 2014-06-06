var detailTimebarController = (function() {
	// has to be its own function up here to prevent capturing i
	var modifyStartTime = function(lineNum) {
		return function() {
			songModel.setStartTime(lineNum, $(this).val());
		}
	};

	return {
		// TODO weird args
		updateLines: function(lines, sliceStart, sliceDuration, firstLineNum) {
			var rangeList = $("#detail-timebar > ul");
			rangeList.empty();
			for(var i = 0; i < lines.length; i++) {
				var eng = $("<p>").html(lines[i].english);
				var kor = $("<p>").html(lines[i].korean);
				var range = $("<input>")
					.attr("type", "range")
					.attr("min", sliceStart)
					.attr("max", sliceStart + sliceDuration)
					.attr("step", 0.05)
					.attr("value", lines[i].startTime)
					.on("change", modifyStartTime(firstLineNum + i));
				var li = $("<li>")
					.append(eng)
					.append(kor)
					.append(range);
				rangeList.append(li);
			}
		}
	};
})();