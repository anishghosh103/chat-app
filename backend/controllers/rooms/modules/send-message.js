module.exports = ({ Room, RoomUpdates }, { response, utils, eventEmitter }) => {
  return (req, res) => {
    const roomId = req.params.id;

    const chat = {
      roomId,
      type: 'chat',
      senderId: req.user.userId,
      senderName: req.user.name,
      message: req.body.message,
      time: new Date()
    };
    
    if (!chat.message) {
      response.error(res, 'Message not provided.', 422);
      return;
    }
    
    getRoom()
      .then(addMessage)
      .then(data => {
        data.room.lastUpdated = Date.now();
        data.room.save();
        response.generate(res, false, 'Message sent successfully.', 200, data.chat);
        eventEmitter.emit('update', data.chat);
      })
      .catch(err => response.error(res, err));
      
    function getRoom() {
      return utils.promise(cb => {
        Room.findOne({ roomId })
          .exec()
          .then(room => {
            if (room) cb(null, room);
            else cb({ message: 'Room Not Found.', status: 404, custom: true });
          })
          .catch(err => cb(err));
      });
    }
  
    function addMessage(room) {
      return utils.promise(cb => {
        new RoomUpdates(chat).save((err, result) => {
          if (err) cb(err);
          else cb(null, { room, chat });
        });
      });
    }
  };
};