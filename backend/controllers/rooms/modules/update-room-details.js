module.exports = ({ Room }, { response, utils, logger }) => {
  return (req, res) => {
    const roomId = req.params.id;
    const userId = req.user.userId;
    const name = req.body.name;
    const description = req.body.description;

    verifyCreator()
      .then(updateRoom)
      .then(room => response.generate(res, false, 'Room updated successfully.', 200, room))
      .catch(err => response.error(res, err));

    function verifyCreator() {
      return utils.promise(cb => {
        Room.verifyCreator(roomId, userId)
          .then(room => cb(null, room))
          .catch(err => cb(err));
      });
    }

    function updateRoom(room) {
      return utils.promise(cb => {
        room.name = name;
        room.description = description;
        room.save((err, result) => {
          if (err) cb(err);
          else cb(null, result);
        });
      });
    }
  };
};