module.exports = (models, { response }) => {
  return (req, res) => {
    const user = req.user;
    if (user) {
      response.generate(res, false, 'User details.', 200, user);
    } else {
      response.error(res, 'User not found.', 404);
    }
  };
};