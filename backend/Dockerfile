FROM node:alpine
USER node
WORKDIR /home/node
COPY ./package.json .
COPY ./package-lock.json .
RUN npm install --production --no-progress
COPY . .
ENTRYPOINT [ "npm", "run" ]
CMD [ "start" ]
EXPOSE 3333