FROM node:alpine as build
WORKDIR /app
COPY . .
RUN npm install --production
EXPOSE 3333
ENTRYPOINT ./run.sh
