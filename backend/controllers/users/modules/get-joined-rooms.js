module.exports = ({ User, Room, RoomUpdates }, { response, utils, logger }) => {
  return (req, res) => {
    const userId = req.params.id;
    
    verifyUser()
    .then(getRooms)
    .then(getNotificationCount)
    .then(rooms => response.generate(res, false, 'Rooms Found.', 200, rooms))
    .catch(err => response.error(res, err));
    
    function verifyUser() {
      return utils.promise(cb => {
        User.findOne({ userId })
          .exec()
          .then(user => {
            if (user) cb(null);
            else cb({ message: 'User Not Found.', status: 404, custom: true });
          })
          .catch(err => cb(err));
      });
    }
  
    function getRooms() {
      return utils.promise(cb => {
        Room.find({ "users.userId": userId })
          .select('-_id -__v')
          .lean()
          .exec()
          .then(rooms => {
            if (rooms) cb(null, rooms);
            else cb({ message: 'No rooms found.', status: 404, custom: true });
          })
          .catch(err => cb(err));
      });
    }
  
    function getNotificationCount(rooms) {
      return utils.promise(cb => {
        let len = rooms.length;
        let stop = false;
        rooms.forEach((room, index) => {
          if (stop) return;
          const lastViewed = room.users.find(user => user.userId === userId).lastViewed;
          RoomUpdates.find({ roomId: room.roomId, time: { "$gte": lastViewed } })
            .count((err, count) => {
              if (err) {
                cb(err);
                stop = true;
              } else {
                rooms[index].notification = count;
                if (--len === 0) {
                  cb(null, rooms);
                }
              }
            });
        });
      });
    }
  };
};