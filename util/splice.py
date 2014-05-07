#!/usr/bin/python
import sys
import getopt
import subprocess

def weave(songName):
	# weave together english and korean lyrics
	englishFile = open(songName + "English", "r")
	koreanFile = open(songName + "Korean", "r")

	engLine = englishFile.readline()
	korLine = koreanFile.readline()
	# output = [engLine, korLine]
	output = []

	while engLine != "" and korLine != "":
		output.append(engLine)
		output.append(korLine)
		engLine = englishFile.readline()
		korLine = koreanFile.readline()

	songFile = open(songName + ".song", "w")
	for line in output:
		songFile.write(line)

		
if __name__ == "__main__":
	opts, args = getopt.getopt(sys.argv[1:], "j:w:")
	if len(opts) == 0:
		print "Bad command format"
		sys.exit(1);

	for opt, arg in opts:
		if opt == "-w":
			print "Weaving " + arg
			weave(arg)
		elif opt == "-j":
			print "Coverting to JSON"
			# JSONify(arg)
			utilDir = "/home/kevin/Documents/code/Benny/util/"
			songDir = "/home/kevin/Documents/code/Benny/res/songs/"
			subprocess.call(["node", utilDir + "convertSong.js", songDir + arg])
