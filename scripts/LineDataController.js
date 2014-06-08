var lineDataController = (function() {
	var dataForm = $("#line-data > form");
	var curLineNum; // priv ivar prevents having to awkwardly pass around

	// helper func that returns appropriate HTML input given metadata info
	var buildMetadataInput = function(datum, index) {
		var datumElem = $("<div>");
		for(var prop in datum) {
			var input = $("<label>").html(prop)
				.append($("<input>")
					.attr("type", "text")
					.attr("value", datum[prop]));
			datumElem.append(input);
		}

		datumElem.append($("<button>")
			.html("Remove")
			.click(function() {
				datumElem.remove();
				songModel.removeMetadata(curLineNum, index);
			}));
		return datumElem;
	};

	var addMetadata = function() {
		songModel.addMetadata(curLineNum);
	};

	return {
		updateLine: function(line, lineNum) {
			if(!line) // possible there's no current line
				return;

			curLineNum = lineNum;
			dataForm.empty();
			$("#current-lyrics").empty();
			$("#current-lyrics").append("<p>" + line.english + "</p>");
			$("#current-lyrics").append("<p>" + line.korean + "</p>");
			var metadataInputs = _(line.metadata).map(buildMetadataInput);
			_(metadataInputs).each(function(inputs) { dataForm.append(inputs); });
			var addMetaButton = $("<button>")
				.html("Add metadata")
				.attr("type", "button")
				.click(addMetadata);
			dataForm.append(addMetaButton);
		}
	};
})();