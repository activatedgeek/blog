publish:
	@git branch -D gh-pages; true
	@git checkout --orphan gh-pages
	@hugo
	@git rm -rf ./
	@mv public/* ./; rm -r public/
	@git add -A
	@git commit -am "site generated @ $(date)"
	@git push --force origin gh-pages
	@git checkout master

publish-ci:
	@git branch -D gh-pages; true
	@git checkout --orphan gh-pages
	@hugo
	@git rm -rf ./
	@mv public/* ./; rm -r public/
	@git add -A
	@git commit -am "site generated @ $(date)"
	@git push -f -q https://activatedgeek:${GH_API_KEY}@${GH_REF} gh-pages &2>/dev/null
	@git checkout master

debug:
	@hugo server -D

clean:
	@rm -r public/
