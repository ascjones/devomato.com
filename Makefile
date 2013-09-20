generate:
	grunt

generate-debug:
	node --debug-brk $(which grunt)

deploy:
	scp -rp out/** deploy@devomato.com:/var/www/devomato.com
