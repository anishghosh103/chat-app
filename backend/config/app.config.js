const shortid = require('shortid');

module.exports = {
  port: 3000,
  env: 'dev',
  db: {
    uri: "mongodb://127.0.0.1:27017/chatApp"
  },
  secret: 'secretkey',
  dataKey: 'eyJhbGciOiJIUzI',
  baseUrl: 'http://localhost:3000'
};