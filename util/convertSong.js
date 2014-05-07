var fs = require("fs");

var lines = fs.readFileSync(process.argv[2], { encoding: "utf8" }).split("\n");
var lyrics = { lines: [] };

var curLine = 0;
while(curLine < lines.length) {
	var lyric = {};
	lyric.english   = lines[curLine++];
	lyric.korean    = lines[curLine++];
	lyric.startTime = parseInt(lines[curLine++]);
	lyric.metadata  = [];

	while(lines[curLine] !== '') {
		var matches = lines[curLine++].match(/^(\d+) (\d+) (.*)$/);
		lyric.metadata.push({
			start  : parseInt(matches[1]),
			length : parseInt(matches[2]),
			info   : matches[3]
		});
	}

	lyrics.lines.push(lyric);
	curLine++;
}

console.log(JSON.stringify(lyrics));
