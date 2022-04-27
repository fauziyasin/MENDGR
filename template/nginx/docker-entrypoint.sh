#!/usr/bin/env sh
set -eu 

envsubst '
${DB_NAME}
${DB_USER_KEY}
${DB_USER_SECRET}
${DB_PORT}
${NGINX_PORT}
${NGINX_SSL_PORT}
${API_PORT}
${CLIENT_PORT}
' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

exec "$@"