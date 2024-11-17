FROM node:20.10-alpine3.18

USER node
RUN mkdir -p /home/node/app
WORKDIR /home/node

ENV USER=$USER
ENV HOST=$HOST
ENV DATABASE=$DATABASE
ENV PASSWORD=$PASSWORD
ENV PORT=$PORT

COPY --chown=node:node package*.json ./
RUN npm install

COPY --chown=node:node . .

EXPOSE 3000

CMD [ "node", "./dist/index.js"]
