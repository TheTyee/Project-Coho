int:
	cat app/coho*.js targets/integration/coho-configuration.js app/ext*.js > coho-debug.js
	cp -v targets/integration/index.html targets/integration/cache.manifest .
	echo "# built on `date`" >> cache.manifest

prod:
	cat app/coho*.js targets/production/coho-configuration.js app/ext*.js | sed 's/console\.log(.*);//g' | ./jsmin "project coho; by Phillip Smith and Greg Heo" > coho.js
	cp -v targets/production/index.html targets/production/cache.manifest .
	echo "# built on `date`" >> cache.manifest

clean:
	rm -f coho-debug.js coho.js index.html cache.manifest

jsmin: src/jsmin.c
	gcc -o jsmin src/jsmin.c

