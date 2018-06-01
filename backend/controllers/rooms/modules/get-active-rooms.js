module.exports = ({ Room }, { response }) => (req, res) => {
  Room.find({ active: true })
    .select('-_id -__v')
    .exec()
    .then(rooms => {
      if (rooms === null) response.error(res, 'No active rooms found.', 404);
      else response.generate(res, false, 'Rooms found.', 200, rooms);
    })
    .catch(err => response.error(res, err));
};