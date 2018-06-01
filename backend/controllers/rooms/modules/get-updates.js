module.exports = ({ RoomUpdates }, { response }) => (req, res) => {
  const roomId = req.params.id;

  const filters = {
    skip: Number(req.query.skip) || 0,
    limit: Number(req.query.limit) || 20
  };
  
  RoomUpdates.find({ roomId })
    .count((err, count) => {
      if (err) {
        response.error(res, err);
      } else {
        RoomUpdates.find({ roomId })
          .sort('-time')
          .skip(filters.skip).limit(filters.limit)
          .lean()
          .exec()
          .then(docs => {
            if (docs) {
              response.generate(res, false, 'Room Updates', 200, { updates: docs, count });
            } else {
              response.error(res, { message: 'No chats found.', status: 404, custom: true });
            }
          })
          .catch(err => response.error(res, err));
      }
    });
};