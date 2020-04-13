FROM node:alpine
WORKDIR /app
COPY ./package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3333
CMD ["node", "ace", "migration:run", "--force"]
CMD ["npm", "run", "start"]