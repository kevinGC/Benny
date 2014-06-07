var detailTimebarController = (function() {
	//callback function
	var onSlide = function(e){
		var columns = $(e.currentTarget).find("td");
		var ranges = []
		var total = 0;
		for(var i = 0; i < columns.length; i++) { // ignore last cell
			var width = columns.eq(i).width() - 10 - (i == 0 ? 1 : 0);
			ranges.push(width);
			total += width;
		}
		ranges.splice(-1, 1);
		ranges = _(ranges).map(function(num) { return num / total; });
		songModel.setStartTimes(ranges);
	}

	// has to be its own function up here to prevent capturing i
	// var modifyStartTime = function(lineNum) {
	// 	return function() {
	// 		songModel.setStartTime(lineNum, $(this).val());
	// 	}
	// };

	return {
		// TODO weird args
		// TODO this is getting called twice when I move regular timebar
		updateLines: function(lines, sliceStart, sliceDuration) {
			var row = $("<tr>");
			var detailTimebar = $("#detail-timebar");
			detailTimebar.find("table").colResizable({ disable: true });
			detailTimebar
				.empty()
				.append($("<table>")
				.attr("id", "range")
				.attr("width", "100%")
				.attr("cellspacing", "0")
				.attr("cellpadding", "0")
				.append(row));

			var widthUsed = 0; // what pct of the bar is already in use?
			for(var i = 0; i < lines.length; i++) {
				var widthPct = 100 * (lines[i].startTime - sliceStart) / sliceDuration - widthUsed;
				var td = $("<td>").attr("width", widthPct + '%');
				row.append(td);
				widthUsed += widthPct;
			}
			row.append($("<td>").attr("width", 100 - widthUsed + '%'));

			$("#range").colResizable({
				liveDrag:true, 
				draggingClass:"rangeDrag", 
				gripInnerHtml:"<div class='rangeGrip'></div>", 
				onResize:onSlide,
				minWidth:8,
				tabText: _.pluck(lines, 'korean')
			});
		}
	};
})();
