FROM nodesource/centos7:0.10.45

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY ./package.json /usr/src/app/

RUN npm install

COPY . /usr/src/app

EXPOSE 8181

CMD [ "npm", "start" ]
