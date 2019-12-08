FROM lws/php-fpm

RUN apt-get update \
    && apt-get install -y ssh \
    && useradd -ms /bin/bash junsenior \
    && echo "junsenior:junsenior" | chpasswd \
    && mkdir -p /var/run/sshd \
    && chown -R junsenior:junsenior /opt \
    && rm -rf /var/lib/apt/lists/* \
    && rm -rf /tmp/* \
    && echo Done!

EXPOSE 22

CMD ["/usr/sbin/sshd", "-D"]
