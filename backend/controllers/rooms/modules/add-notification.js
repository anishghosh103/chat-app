module.exports = (RoomUpdates) => (roomId, message, senderId, senderName, cb) => {
  const update = new RoomUpdates({
    roomId,
    type: 'notification',
    message,
    senderId,
    senderName,
    time: Date.now()
  });
  update.save((err, result) => {
    if (!cb) return;
    if (err) cb(err);
    else {
      cb(null, result);
    }
  });
};