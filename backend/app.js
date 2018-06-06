const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');

const api = require('./routes/api');
const config = require('./config/app.config');
const logger = require('./libs/logger');
const socketLib = require('./libs/socket');

const app = express();
const server = http.createServer(app);
const socketServer = socketLib.setServer(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());
app.use(cors());

app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.use('/api', api);
app.get('/apiDoc', (req, res) => {
  res.sendFile(path.join(__dirname, 'api-doc/index.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

server.listen(config.port, () => {
  logger.log('HttpServerStarted', `API running on localhost:${config.port}`);
  mongoose.connect(config.db.uri, (err) => {
    if (err) logger.log('MongooseConnect', err);
    else logger.log('MongooseConnect', 'Successful');
  });
});