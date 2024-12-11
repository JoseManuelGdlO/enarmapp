# stage 1: BUILD

FROM node:16-alpine AS build

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN ls -alt

# stage 2: 
FROM nginx:1.18.1-alpine

COPY --from=build /usr/app/dist/enarmapp /usr/share/nginx/html

COPY --from=build /usr/app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80