##
# Makefile for linux based installations
#
debug:
	@hugo server -D -v

public:
	@cd cv && pdflatex -interaction=nonstopmode -halt-on-error -output-directory build resume.tex && cd ..
	@cd cv && pdflatex -interaction=nonstopmode -halt-on-error -output-directory build SOP_NYU_Courant.tex && cd ..
	@mv cv/build/*.pdf static/files
	@hugo -v
	@cp _redirects public/

install:
	@curl -LO https://github.com/gohugoio/hugo/releases/download/v0.29/hugo_0.29_Linux-64bit.deb && sudo dpkg -i hugo_0.29_Linux-64bit.deb
	@curl -LO https://github.com/netlify/netlifyctl/releases/download/v0.1.4/netlifyctl-linux-amd64.tar.gz && tar -xzvf netlifyctl-linux-amd64.tar.gz
	# @sudo apt-get install textlive-full
	@sudo apt-get install texlive-latex-base texlive-latex-extra texlive-fonts-recommended texlive-fonts-extra
	@sudo pip install -r requirements.txt

deploy:
	@./netlifyctl deploy -A $(NETLIFY_ACCESS_TOKEN)

.PHONY: debug install
