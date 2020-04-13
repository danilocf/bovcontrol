FROM node:alpine as build
USER node
WORKDIR /home/node
COPY ./package.json .
COPY ./package-lock.json .
RUN npm install --production --no-progress
COPY . .
# ENTRYPOINT [  ]
CMD [ "npm", "run", "build" ]

FROM nginx:latest
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]