FROM repasscloud/optechx.portal.node AS builder
ARG NG_CLI_ANALYTICS="false"
COPY [ ".", "." ]
WORKDIR /app
RUN npm run ng build

FROM repasscloud/ubuntu-20.04:apache AS apachectl
COPY --from=builder /app/dist /var/www/html
COPY --from=builder /var/www/html/.htaccess /var/www/html/.htaccess
COPY --from=builder /etc/apache2/apache2.conf /etc/apache2/apache2.conf
COPY --from=builder /etc/apache2/sites-available/000-default.conf /etc/apache2/sites-available/000-default.conf

EXPOSE 80
CMD [ "apachectl", "-D", "FOREGROUND" ]