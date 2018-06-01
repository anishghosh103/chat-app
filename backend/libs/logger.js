
const config = require('../config/app.config');

const log = (origin, message) => {
  if (config.env !== 'dev') return;
  console.log(`${origin}: ${message}`);
};

module.exports = { log };