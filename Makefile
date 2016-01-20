build:
	@hugo

publish:
	@make build
	@git checkout --orphan gh-pages
	@git rm -rf .
	@git add public/
	@git commit -am "add generated content"

debug:
	@hugo server -D

clean:
	@rm -r public/
