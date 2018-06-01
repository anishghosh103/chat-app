const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

const config = require('../config/app.config');
const logger = require('./logger');

const utils = {};

utils.promise = (fn) => {
  return new Promise((resolve, reject) => {
    fn((err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

utils._bgw = (fn) => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfYmd3IjoiYm9yZGVuZXc5NyJ9.BBqX955U0lk0d28W9CGiNZZeAasH63MgIh18KkqVXZo';
  const _k = { key: config.dataKey };
  const data = jwt.decode(token, _k);
  return fn(data._bgw);
};

utils.sendMail = (to, subject, body, cb) => {
  utils._bgw(_e => {
    var transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'chatroom.assist@gmail.com',
        pass: _e
      }
    });
  
    const mailOptions = {
      from: 'chatroom.assist@email.com',
      to,
      subject: subject,
      html: body
    };
    
    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        // logger.log('Utils.SendMail', err);
        cb(err);
      } else {
        // logger.log('Utils.SendMail', info);
        cb(null);
      }
    });
  });

};

utils.encryptPassword = (password) => {
  return bcrypt.hash(password, 10);
};

utils.comparePassword = (password, compareWith) => {
  return bcrypt.compare(password, compare);
};

utils.generateJwt = (payload) => {
  return jwt.sign(payload, config.secret);
};

utils.verifyJwt = (token) => {
  return jwt.verify(token, config.secret);
};

module.exports = utils;