import express from 'express';
import bodyParser from 'body-parser';
import Service from './services/serviceInterface';
import { AppRouter } from './routes/index';
import PoolService from './services/poolService';

const services: Service[] = [];

function initializeServices() {
  services.push(PoolService);
}

function destroyServices() {
  services.forEach((service) => {
    service.destroy();
  });
}

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

AppRouter.initRoutes(app);

const server = app.listen(port, () => {
  console.log(`App running on port ${port}.`);
  initializeServices();
});

server.on('close', () => {
  destroyServices();
});

// Ctrl+C
process.on('SIGINT', () => {
  server.close(() => {
    process.exit(0);
  });
});

// termination
process.on('SIGTERM', () => {
  server.close(() => {
    process.exit(0);
  });
});
