FROM php:7.2-fpm

MAINTAINER Tom Champion <hello@tomchampion.xyz>

RUN apt-get update && apt-get install -y libpng-dev \
    libmcrypt-dev libpq-dev

RUN docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql \
    && docker-php-ext-install pgsql pdo_pgsql