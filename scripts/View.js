var view = (function() {
	var metadata = null;

	var displayMetadata = function(line, index) {
		var relevant = _(metadata).filter(function(datum) {
			return datum.start <= index && datum.start + datum.length > index;
		});
		$("#info > ul").empty();
		_(relevant).each(function(datum) {
			// var chars = line.korean.substr(datum.start, datum.length);
			var a = $("<a>")
				.html(datum.info)
				.attr("href", datum.link)
				.attr("target", "_blank");
			var li = $("<li>").append(a);
			$("#info > ul").append(li);
		});
	}

	// TODO need c?
	var getSmartChar = function(line, index) { // huehuehue
		return $("<span>")
			.html(line.korean[index])
			.mouseover(_.partial(displayMetadata, line, index));
	};

	var updateLineWithTag = function(line, id) {
		var koreanSpans = [];
		for(var i = 0; i < line.korean.length; i++) {
			koreanSpans.push(getSmartChar(line, i));
		}
		$(id + " > div#korean-scroll > p").html(koreanSpans);
		$(id + " > div#english-scroll > p").html(line.english);
		metadata = line.metadata;
	};

	return {
		addSong: function(songName, cb ){
			var nameElem = $("<li>")
				.html(songName)
				.click(cb);
			$("#songList").append(nameElem);
		},

		setLines: function(english, korean, callbacks) {
			$("#lyrics > table").empty();
			for(var i = 0; i < english.length; i++) {
				var row = $("<tr>");
				row.append($("<td>").html(english[i]).click(callbacks[i]));
				row.append($("<td>").html(korean[i]).click(callbacks[i]));
				$("#lyrics > table").append(row);
			}
		},

		// TODO
		setVideo: function(name) {
			var video = $("<video>")
				.css("width", "640px")
				.css("height", "360px")
				.attr("id", "vid")
				.append($("<source>")
					.attr("src", "res/video/Genie.mp4")
					.attr("type", "video/mp4"))
					.attr("controls", "");
			$("#video-holder").empty();
			$("#video-holder").append(video);
		},

		seekVideo: function(time) {
			$("#vid")[0].currentTime = time;
		},

		setRunLoop: function(cb) {
			$("#vid").on("timeupdate", function() {
				cb($("#vid")[0].currentTime);
			});
		},

		// TODO naming. These should be updates, Controller should be set
		updateLine: function(line) {
			updateLineWithTag(line, "#scroller");
		},
	};
})();
