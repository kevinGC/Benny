var lineDataController = (function() {
	var dataForm = $("#line-data > form");

	return {
		updateLine: function(line) {
			if(!line) // possible there's no current line
				return;

			dataForm.empty();
			// dataForm.append("<p>" + line.english + "</p>");
			// dataForm.append("<p>" + line.korean + "</p>");
			$("#current-lyrics").empty();
			$("#current-lyrics").append("<p>" + line.english + "</p>");
			$("#current-lyrics").append("<p>" + line.korean + "</p>");
			var metadataInputs = _(line.metadata).map(function(datum) {
				var datumElem = $("<div>");
				for(var prop in datum) {
					var input = $("<label>").html(prop)
						.append($("<input>")
							.attr("type", "text")
							.attr("value", datum[prop]));
					datumElem.append(input);
				}
				return datumElem;
			});
			for(var i = 0; i < metadataInputs.length; i++) {
				dataForm.append(metadataInputs[i]);
			}
		}
	};
})();