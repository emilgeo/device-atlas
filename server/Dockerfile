FROM node:22-alpine
RUN apk update && apk add bash && apk add curl

WORKDIR /server

COPY src/ /server/src
COPY package.json /server

EXPOSE 8080

RUN npm install