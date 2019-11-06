FROM node:latest
ADD ./for-update.sh /opt/
RUN apt update && apt install git nginx gettext -y && npm install -g cnpm --registry=https://registry.npm.taobao.org && mkdir /opt/aux-shipping-web
RUN echo '!#/bin/bash'>/opt/update.sh && echo 'cd /opt/aux-shipping-web && git pull && cnpm install && npm run build:prod && rm -rf /usr/share/nginx/html/* && cp -r dist/* /usr/share/nginx/html/'>/opt/update.sh
RUN cd /opt && chmod 744 update.sh && chmod 744 for-update.sh && rm -rf /etc/nginx/sites-enabled/default
CMD git clone $GIT_PATH /opt/aux-shipping-web && cd /opt && ./update.sh && cp /opt/aux-shipping-web/nginx.conf /etc/nginx/app.template && envsubst '$SERVER_HOST $SERVER_PORT $SERVER_SSL_PORT $BACKEND_HOST $BACKEND_PORT' < /etc/nginx/app.template > /etc/nginx/conf.d/default.conf && service nginx start && /opt/for-update.sh
