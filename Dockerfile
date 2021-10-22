FROM node:12

LABEL "cl.apgca.appNode" = "Jesus Antonio Garcia Zurita"
LABEL version = "1.0.0"

RUN mkdir -p /opt/apphapi

WORKDIR /opt/apphapi

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 10001

CMD ["npm", "start"]

ENV TZ=America/Mexico_City
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone