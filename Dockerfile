FROM node:10

WORKDIR /src

COPY . .

COPY package*.json ./

RUN npm install

EXPOSE 8080

CMD ["npm", "run", "serve"]