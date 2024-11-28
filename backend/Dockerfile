FROM node:20.10.0
WORKDIR /backend
COPY package.json . 
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]