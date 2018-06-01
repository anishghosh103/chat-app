module.exports = ({ User }, { response }) => {
  return (req, res) => {
    const userId = req.params.id;
    User.findOne({ userId })
      .select('-_id -__v -password')
      .exec()
      .then(user => {
        if (user === null) response.error(res, 'User not found.', 404);
        else response.generate(res, false, 'User details.', 200, user);
      })
      .catch(err => response.error(res, err));
  };
};