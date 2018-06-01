module.exports = (models, { response }) => {
  return (req, res) => {
    res.clearCookie('authToken');
    response.generate(res, false, 'Logout successful.', 200, null);
  };
};