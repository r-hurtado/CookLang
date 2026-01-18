ExampleDir := /mnt/c/Users/mieca/CookLang/examples

.PHONY: test watch run example clean

test:
	npm test

watch:
	npm run test:watch

testrun:
	echo $$PARAM

run:
	node src/cli.js $$PARAM

runr:
	@FILE=$$(ls $(ExampleDir) | shuf -n 1); \
	node src/cli.js $(ExampleDir)/$$FILE

example:
	node src/cli.js examples/Pancake.cook

clean:
	rm -rf coverage

