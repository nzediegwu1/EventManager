import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import events from './routers/eventRouter';
import centers from './routers/centerRouter';
import users from './routers/userRouter';
import facilities from './routers/facilityRouter';
import swaggerTools from 'swagger-tools';
import swaggerDoc from './swaggerDoc.json';
import cors from 'cors';
import history from 'connect-history-api-fallback';
import * as http from 'http';

const app = express();
/*
const environment = process.env.NODE_ENV;
const options = {
  controllers: environment === 'development' ? './server/controllers' : './server/dist/controllers',
  useStubs: true,
};

swaggerTools.initializeMiddleware(swaggerDoc, middleware => {
  app.use(middleware.swaggerMetadata());
  app.use(middleware.swaggerValidator());
  app.use(middleware.swaggerRouter(options));
  app.use(middleware.swaggerUi());
});
*/
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // to allow chai-http post and put tests to run
app.use(history());
app.use(express.static(path.join(__dirname, '../../client/dist')));
app.use('/images', express.static(path.join(__dirname, '../../client/src/resources/images')));
app.use('/api/v1/events', events);
app.use('/api/v1/centers', centers);
app.use('/api/v1/users', users);
app.use('/api/v1/facilities', facilities);

const port = process.env.PORT || 8080;
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server is up at ${port}`);
});
