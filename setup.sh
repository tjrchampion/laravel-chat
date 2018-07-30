#!/bin/bash

#clone the latest laravel into directory
#git clone https://github.com/laravel/laravel.git web

#move directory
cd web

#run composer install in container then dispose of it
docker container run --rm -v $(pwd):/app composer install

#rename the env
mv .env.example .env

#move directory
cd ../

#run everything 
docker-compose up
