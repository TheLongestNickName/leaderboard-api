FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install -D nodemon
RUN npm install -D cookie-parser
RUN npm install -D express-session
RUN npm install -D cors
RUN npm install


COPY . .

EXPOSE 3000

CMD ["node", "index.js"]
