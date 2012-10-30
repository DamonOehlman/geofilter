SHELL := /bin/bash

build:
	@interleave build src/*.js
	@interleave build src/converters/*.js

test:
	@mocha --reporter spec

.PHONY: test