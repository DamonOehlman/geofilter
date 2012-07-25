SHELL := /bin/bash

build:
	@interleave build src/*.js --wrap
	@interleave build src/converters/*.js --wrap

test:
	@mocha --reporter spec

.PHONY: test