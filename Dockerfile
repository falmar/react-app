FROM node:6

COPY . /src/app

WORKDIR /src/app

RUN npm install

expose 80 3000

CMD ["npm", "run", "prod-server"]
