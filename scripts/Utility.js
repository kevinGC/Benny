var Utility = (function() {

	return {
		parseArgs: function() {
			var args = location.search.substr(1).split("&");
			window.urlArgs = {};
			_.each(args, function(argStr) {
				var pair = argStr.split("=");
				urlArgs[pair[0]] = pair[1];
			});
			return urlArgs;
		}
	}
})();
