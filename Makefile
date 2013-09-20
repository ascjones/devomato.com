generate:
	grunt

generate-debug:
	node --debug-brk $(which grunt)

deploy:
	scp -rp out/** deploy@178.79.153.60:/var/www/devomato.com
