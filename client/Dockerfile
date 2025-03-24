FROM node:22-alpine
RUN apk update && apk add bash

ARG VITE_API_URL=http://127.0.0.1:8080/api
ENV VITE_API_URL=$VITE_API_URL

WORKDIR /client

COPY src/ /client/src
COPY index.html /client/
COPY package.json /client/
COPY vite.config.js /client/

EXPOSE 4173

RUN npm install
RUN npm run build