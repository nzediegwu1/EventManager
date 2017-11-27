import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import events from './routers/eventRouter';
import centers from './routers/centerRouter';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve('./././Template')));
app.use('/api/v1/events', events);
app.use('/api/v1/centers', centers);


app.get('/', (req, res) => {
  res.sendFile(path.resolve('./././Template/index.html'));
});

export default app;
