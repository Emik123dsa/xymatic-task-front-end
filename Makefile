default: init

init: reset-docker build up 

reset-docker: 
	-docker-compose rmi --rmi=local --volumes --remove-orphans 

up:
	docker-compose up -d --force-recreate 

build:
	docker-compose build

ssh:
	docker-compose exec fron t-kernel /bin/bash

yarn-install:
	docker-compose exec fron t-kernel '/bin/sh -c yarn install'
