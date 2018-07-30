#@ latest but for development should be a specifed version nginx:.13.12
FROM nginx

#add our editable config to our container
ADD nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

RUN echo "daemon off;" >> /etc/nginx/nginx.conf

CMD service nginx start