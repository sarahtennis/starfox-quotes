FROM node:20.9.0-alpine

USER node
RUN mkdir -p /home/node/app
WORKDIR /home/node


COPY --chown=node:node package*.json ./
RUN npm install

COPY --chown=node:node . .

EXPOSE 8080

CMD [ "node", "index.js" ]
