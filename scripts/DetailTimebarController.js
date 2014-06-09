var detailTimebarController = (function() {
	var detailTimebar = $("#detail-timebar");
	var sliceStart;
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

	var seeker = $("#detail-timebar-seeker");
	seeker.click(function(e) {
		debugger;
		var pctOffset = (e.pageX - seeker.offset().x) / seeker.width();
		songModel.seekInSlice(pctOffset);
	});

	return {
		// TODO weird args
		// TODO this is getting called twice when I move regular timebar
		updateLines: function(lines, sliceStart_, sliceDuration) {
			sliceStart   = sliceStart_
			var row      = $("<tr>");
			var detached = seeker.detach();
			detailTimebar.find("table").colResizable({ disable: true });
			detailTimebar
				.empty()
				.append(seeker)
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

			var range = $("#range");
			range.colResizable({
				liveDrag:true, 
				draggingClass:"rangeDrag", 
				gripInnerHtml:"<div class='rangeGrip'></div>", 
				onResize:onSlide,
				minWidth:8,
				tabText: _.pluck(lines, 'korean')
			});
			range.click(function() {
				console.log("HI IM A TABLE");
			});

		}
	};
})();
