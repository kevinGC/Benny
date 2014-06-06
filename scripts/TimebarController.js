var timebarController = (function() {
	var _timebar = $("#timebar");
	_timebar.on("userValuesChanged", function(e, data) {
		songModel.seek(data.values.min);
	});

	return {
		// TODO poorly named
		init: function(sliderDuration, songDuration) {
			_timebar.rangeSlider({
				range: { min: sliderDuration, max: sliderDuration },
				bounds: { min: 0, max: songDuration },
				defaultValues: { min: 0, max: sliderDuration }
			});
		},

		updateTime: function(time, sliderDuration) {
			_timebar.rangeSlider("values", time, time + sliderDuration);
		}
	};
})();