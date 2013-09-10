generate:
	node site

deploy:
	scp -rp devomato.com root@178.79.153.60:/var/www
