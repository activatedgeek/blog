##
# Makefile for linux based installations
#
debug:
	@hugo server -D -v

public:
	@hugo -v
	@cp _redirects public/

.PHONY: debug
