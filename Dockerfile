FROM node:9.10.1

WORKDIR /usr/node-app

COPY package.json /usr/node-app
COPY package-lock.json /usr/node-app

RUN npm install -g gulp

COPY . /usr/node-app

EXPOSE 3000
EXPOSE 3001

CMD [ "npm", "start" ]