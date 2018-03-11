﻿import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import events from './routers/eventRouter';
import centers from './routers/centerRouter';
import users from './routers/userRouter';
import swaggerTools from 'swagger-tools';
import swaggerDoc from './swaggerDoc.json';
import cors from 'cors';
import history from 'connect-history-api-fallback';

const app = express();
const options = {
  controllers: './Server/controllers',
  useStubs: true,
};

app.use(cors());
swaggerTools.initializeMiddleware(swaggerDoc, middleware => {
  app.use(middleware.swaggerMetadata());
  app.use(middleware.swaggerValidator());
  app.use(middleware.swaggerRouter(options));
  app.use(middleware.swaggerUi());
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // to allow chai-http post and put tests to run
app.use('/public', express.static(path.join(__dirname, './public')));
app.use(history());
app.use(express.static(path.join(__dirname, '../Client/dist')));
app.use('/api/v1/events', events);
app.use('/api/v1/centers', centers);
app.use('/api/v1/users', users);

export default app;
