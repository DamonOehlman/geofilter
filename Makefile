SHELL := /bin/bash

build:
	@node_modules/interleave/bin/interleave src --package
	@node_modules/interleave/bin/interleave src/converters/ogc.js --package

test:
	@mocha --reporter spec

.PHONY: test