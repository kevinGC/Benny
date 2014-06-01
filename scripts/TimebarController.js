var timebarController = (function() {


	return {
		// TODO poorly named
		updatePrefs: function(sliderSize, duration) {
			$("#timebar").rangeSlider({
				range: { min: sliderSize, max: sliderSize },
				bounds: { min: 0, max: duration },
				defaultValues: { min: 0, max: sliderSize }
			});
		}
	};
})();