FROM node:16

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --save

COPY . /app/

CMD ["npm", "run", "start"]