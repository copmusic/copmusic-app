FROM ubuntu:16.04
RUN set -ex \
    && rm -rf /tmp/repimport \
    && mkdir -m 700 /tmp/repimport \
    && LC_ALL=C.UTF-8 gpg \
        --homedir /tmp/repimport \
        --keyserver keyserver.ubuntu.com \
        --recv-key 14AA40EC0831756756D7F66C4F4EA0AAE5267A6C \
    && LC_ALL=C.UTF-8 gpg \
        --homedir /tmp/repimport \
        -a \
        --export 14AA40EC0831756756D7F66C4F4EA0AAE5267A6C \
        | apt-key add - \
    && rm -rf /tmp/repimport \
    && echo "deb http://ppa.launchpad.net/ondrej/php/ubuntu xenial main" \
        > /etc/apt/sources.list.d/ondrej-ubuntu-php-xenial.list \
    && echo "deb http://ppa.launchpad.net/ondrej/php/ubuntu xenial main" \
        > /etc/apt/sources.list.d/ondrej-ubuntu-php-xenial.list \
    && apt-get update \
    && apt-get install zlib1g-dev libzmq-dev -y --no-install-recommends \
    && apt-get install -y --no-install-recommends \
        ca-certificates \
        file \
        git \
        re2c \
        unzip \
        php-fpm \
        php-bcmath \
        php-curl \
        php-gd \
        php-gmp \
        php-imap \
        php-intl \
        php-mbstring \
        php-pgsql \
        php-sqlite3 \
        php-xml \
        php-zip \
        php-imagick \
        php-redis \
        php-sodium \
        php-xdebug \
        php-pear \
        php-zmq

RUN set -ex \
    sed -i "$ s|\-n||g" /usr/bin/pecl

RUN set -ex \
    pear install PHP_Codesniffer \
    && rm -rf /var/lib/apt/lists/* \
    && rm -rf /tmp/*

RUN set -ex \
    && cd /tmp \
    && php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" \
    && php composer-setup.php --install-dir=/usr/bin --filename=composer \
    && chmod +x /usr/bin/composer \
    && rm -rf /tmp/*

RUN set -ex \
    && mkdir -p /opt/data \
    && chown www-data:www-data /opt/data \
    && mkdir -p /run/php \
	&& cd /etc/php/7.3/fpm \
	&& { \
		echo '[global]'; \
		echo 'error_log = /proc/self/fd/2'; \
		echo; \
		echo '[www]'; \
		echo '; if we send this to /proc/self/fd/1, it never appears'; \
		echo 'access.log = /proc/self/fd/2'; \
		echo; \
		echo 'clear_env = no'; \
		echo; \
		echo '; Ensure worker stdout and stderr are sent to the main error log.'; \
		echo 'catch_workers_output = yes'; \
	} | tee pool.d/docker.conf \
	&& { \
		echo '[global]'; \
		echo 'daemonize = no'; \
		echo; \
		echo '[www]'; \
		echo 'listen = 9000'; \
	} | tee pool.d/zz-docker.conf

COPY docker-php-entrypoint /usr/local/bin/

ENTRYPOINT ["docker-php-entrypoint"]

WORKDIR /project

CMD ["php-fpm7.3"]
