FROM node:12

WORKDIR /apphapi

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]

ENV TZ=America/Mexico_City
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone