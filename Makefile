all:
	cat app/*.js > coho-debug.js
	cat app/*.js | ./jsmin "project coho; by Phillip Smith and Greg Heo" > coho.js

clean:
	rm -f coho-debug.js coho.js

jsmin: src/jsmin.c
	gcc -o jsmin src/jsmin.c
