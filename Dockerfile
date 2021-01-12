FROM nginx:latest

COPY ./dist/ /usr/share/nginx/html/

COPY default.template /etc/nginx/conf.d/default.conf

