.PHONY: web test

web:
	`npm bin`/webpack
	python -m SimpleHTTPServer 8000

test:
	npm run test