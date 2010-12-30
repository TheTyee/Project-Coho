all:
	cat app/coho*.js app/ext*.js > coho-debug.js
	cat app/coho*.js app/ext*.js | sed 's/console\.log(.*);//g' | ./jsmin "project coho; by Phillip Smith and Greg Heo" > coho.js

clean:
	rm -f coho-debug.js coho.js

jsmin: src/jsmin.c
	gcc -o jsmin src/jsmin.c
