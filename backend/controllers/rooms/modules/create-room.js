const shortid = require('shortid');

module.exports = ({ Room }, { response, utils, eventEmitter, logger }) => {
  return (req, res) => {
    const roomId = shortid.generate();
    const name = req.body.name;
    const description = req.body.description || '';
    const creatorId = req.user.userId;

    if (!name) {
      response.error(res, 'Name not provided', 422);
      return;
    }

    validateName()
      .then(addRoom)
      .then(room => {
        response.generate(res, false, 'Room created successfully.', 200, room);
        eventEmitter.emit('created', room);
      })
      .catch(err => response.error(res, err));

    function validateName() {
      return utils.promise(cb => {
        Room.findOne({ name })
          .exec()
          .then(room => {
            if (room) {
              cb({ message: 'Name already exists.', status: 409, custom: true });
            } else {
              cb(null);
            }
          })
          .catch(err => cb(err));
      });
    }
    
    function addRoom() {
      return utils.promise(cb => {
        const room = new Room({
          roomId,
          name,
          description,
          creatorId
        });
        room.save((err, result) => {
          if (err) cb(err);
          else cb(null, room);
        });
      });
    }
  };
};