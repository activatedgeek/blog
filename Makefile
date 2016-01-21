debug:
	@hugo server -D

build:
	@hugo
	@git checkout --orphan gh-pages
	@git rm -rf ./
	@mv public/* ./; rm -r public/
	@echo 'devblog.sanyamkapoor.com' > CNAME
	@git add -A
	@git commit -am "site generated @ $(date)"
	@git checkout master

publish:
	@git push -f origin gh-pages

publish-ci:
	@git push -f https://activatedgeek:${GH_ACCESS_TOKEN}@github.com/activatedgeek/blog gh-pages

clean:
	@rm -r public/
	@git branch -D gh-pages
