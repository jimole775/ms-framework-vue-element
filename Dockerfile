FROM nginx:latest

ADD ./dist/ /usr/share/nginx/html
ADD ./nginx.conf /etc/nginx/app.template

ENV SERVER_HOST=localhost
ENV SERVER_PORT=80
ENV SERVER_SSL_PORT=443

ENV BACKEND_HOST=47.101.67.149
ENV BACKEND_PORT=8080

CMD envsubst '$SERVER_HOST $SERVER_PORT $SERVER_SSL_PORT $BACKEND_HOST $BACKEND_PORT' < /etc/nginx/app.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
