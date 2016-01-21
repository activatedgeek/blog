debug:
	@hugo server -D

publish:
	@hugo
	@git checkout --orphan gh-pages
	@git rm -rf ./
	@mv public/* ./; rm -r public/
	@echo 'devblog.sanyamkapoor.com' > CNAME
	@git add -A
	@git commit -am "site generated @ $(date)"
	@git push --force origin gh-pages
	@git checkout master
	@git branch -D gh-pages

publish-ci:
	@hugo
	@git checkout --orphan gh-pages
	@git rm -rf ./
	@mv public/* ./; rm -r public/
	@echo 'devblog.sanyamkapoor.com' > CNAME
	@git add -A
	@git commit -am "site generated @ $(date)"

clean:
	@rm -r public/
