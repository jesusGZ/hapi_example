FROM node:16.16.0-bullseye-slim


LABEL "cl.apgca.appNode" = "Jesus Antonio Garcia Zurita"
LABEL version = "1.0"

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /apphapi

COPY package*.json ./

RUN npm install

COPY --chown=node:node . .

COPY . .

EXPOSE 10001

CMD [ "npm", "run", "start" ]

ENV TZ=America/Mexico_City
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone


