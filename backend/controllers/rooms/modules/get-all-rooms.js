module.exports = ({ Room }, { response }) => (req, res) => {
  Room.find({})
    .select('-_id -__v')
    .exec()
    .then(rooms => {
      if (rooms === null) response.error(res, 'No rooms found.', 404);
      else response.generate(res, false, 'Rooms found.', 200, rooms);
    })
    .catch(err => response.error(res, err));
};