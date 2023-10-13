FROM node:18.18.0

LABEL version="1.0"
LABEL description="Frontend app for haiku weather"
LABEL maintainer = ["bae.webdev@gmail.com"]

WORKDIR /app

COPY package.json ./

RUN npm ci

COPY . .

EXPOSE 3000

CMD ["npm", "start"]