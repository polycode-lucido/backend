FROM node:16-alpine

LABEL MAINTAINER="lucido-simon <simon.lucido@etu.umontpellier.fr>"
LABEL APP="polycode-lucido"

ENV PORT=""

WORKDIR /usr/app

COPY package.json .
COPY yarn.lock .
RUN npm install -f

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start:prod"]