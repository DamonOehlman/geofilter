SHELL := /bin/bash

build:
	@interleave src --package
	@interleave src/converters --package

test:
	@mocha --reporter spec

.PHONY: test