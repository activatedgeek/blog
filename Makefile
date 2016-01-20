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

debug:
	@hugo server -D

clean:
	@rm -r public/
