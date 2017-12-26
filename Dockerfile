FROM smebberson/alpine-nginx-nodejs

ADD package.json /app/

WORKDIR /app
RUN npm install --registry=https://registry.npm.taobao.org

ADD . /app

RUN npm install --registry=https://registry.npm.taobao.org

RUN npm run build:prod

RUN mv /app/dist/* /usr/html/

RUN rm -rf /app