.PHONY: test watch run example clean

test:
	npm test

watch:
	npm run test:watch

run:
	node src/cli.js $(file)

example:
	node src/cli.js examples/chocolate-cookies.cook

clean:
	rm -rf coverage

