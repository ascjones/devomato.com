generate:
	node site

deploy:
	scp -rp out root@178.79.153.60:/var/www
