FROM php:7.4-fpm

ADD php.ini /usr/local/etc/php/

RUN apt-get update \
  && apt-get install -y git zip libzip-dev supervisor --no-install-recommends \
  && pecl install redis \
  && docker-php-ext-enable redis \
  && docker-php-ext-configure zip \
  && docker-php-ext-install zip \
  && rm -rf /var/lib/apt/lists/*

ARG USER_ID=1000
RUN usermod -u $USER_ID www-data

WORKDIR /srv/copmusic

ENTRYPOINT ["/usr/bin/supervisord", "-n", "-c",  "/etc/supervisor/conf.d/supervisor.conf"]
