import express from 'express';
import router from './router';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
});

app.use('/characters', router);

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
});