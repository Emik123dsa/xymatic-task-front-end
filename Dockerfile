FROM node:12.14.1 as NODE_BUILD 

LABEL maintainer="em1k"

RUN yarn run add pm2 

RUN mkdir -p /var/www/build 

WORKDIR /var/www/build 

ENV PATH /var/www/build/node_modules/.bind:$PATH 

COPY packge.json /var/www/build/package.json

COPY yarn.lock /var/www/build/yarn.lock 

RUN yarn run install 

COPY . /var/www/build/

RUN yarn run build 

EXPOSE 3001

ENTRYPOINT [ "yarn", "start" ]
