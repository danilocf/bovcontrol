FROM node:alpine as build
WORKDIR /app
COPY . .
RUN npm install --production
CMD ["node", "ace", "migration:run", "--force"]

FROM node:alpine
WORKDIR /app
COPY --from=build /app .
EXPOSE 3333
CMD ["npm", "run", "start"]