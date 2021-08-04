FROM php:7.4-fpm

ENV PHP_XDEBUG_VERSION 2.9.8

ADD php.ini /usr/local/etc/php/

RUN apt-get update \
  && apt-get install -y git zip libzip-dev supervisor libpq-dev libicu-dev jpegoptim optipng libmagickwand-dev --no-install-recommends \
  && pecl install redis \
  && pecl install imagick \
  && pecl install xdebug-${PHP_XDEBUG_VERSION} \
  && docker-php-ext-enable imagick \
  && docker-php-ext-configure intl \
  && docker-php-ext-configure gd \
  && docker-php-ext-install pdo_pgsql bcmath opcache intl gd \
  && docker-php-ext-enable redis \
  && docker-php-ext-configure zip \
  && docker-php-ext-install zip \
  && docker-php-ext-enable xdebug \
  && rm -rf /var/lib/apt/lists/*

COPY ./xdebug.ini /usr/local/etc/php/conf.d/xdebug.ini

ARG USER_ID=1000
RUN usermod -u $USER_ID www-data

WORKDIR /srv/copmusic

ENTRYPOINT ["/usr/bin/supervisord", "-n", "-c",  "/etc/supervisor/conf.d/supervisor.conf"]
