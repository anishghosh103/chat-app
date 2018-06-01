module.exports = ({ Room }, { response }) => (req, res) => {
  const roomId = req.params.id;
  Room.findOne({ roomId })
    .select('-_id -__v')
    .exec()
    .then(room => {
      if (room === null) response.error(res, 'Room not found.', 404);
      else response.generate(res, false, 'Room details.', 200, room);
    })
    .catch(err => response.error(res, err));
};