const events = require('events');
const eventEmitter = new events.EventEmitter();

const eventObj = {};

eventObj.emit = (str, obj) => {
  // console.log('EventObj.Emit', str, obj);
  eventEmitter.emit(str, obj);
};

eventObj.on = (str, callback) => {
  // console.log('EventObj.On', str);
  eventEmitter.on(str, callback);
};

module.exports = eventObj;