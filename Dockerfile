FROM node:14-alpine

COPY ./package.json /app/
WORKDIR /app/
RUN npm i

COPY . /app/
EXPOSE 8080

ENTRYPOINT /app/start.sh
