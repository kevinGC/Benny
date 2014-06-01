var detailTimebarController = (function() {

	return {
		updateLines: function(lines, sliceStart, sliceDuration) {
			var rangeList = $("#detail-timebar > ul");
			rangeList.empty();
			for(var i = 0; i < lines.length; i++) {
				var eng = $("<p>").html(lines[i].english);
				var kor = $("<p>").html(lines[i].korean);
				var range = $("<input>")
					.attr("type", "range")
					.attr("min", sliceStart)
					.attr("max", sliceStart + sliceDuration)
					.attr("value", lines[i].startTime);
				var li = $("<li>")
					.append(eng)
					.append(kor)
					.append(range);
				rangeList.append(li);
			}
		}
	};
})();