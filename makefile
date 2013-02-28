test:
	mocha \
	--globals 'environment,log' \
	--ui tdd \
	--reporter list \
	test/test.*.js

test-w:
	mocha \
	--globals 'environment,log' \
	--ui tdd \
	--reporter spec \
	--watch test/test.*.js

.PHONY: test test-w