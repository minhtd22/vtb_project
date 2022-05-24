const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');

const getUserInfo = (req, res) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(403).send({ message: 'Access denied, no token provided!' });
  }

  try {
    const currentUser = jwt.decode(token, config.secret);

    console.log('currentUser', currentUser);
    return currentUser;
  } catch (ex) {
    res.status(400).send('Invalid JWT.');
  }
};

module.exports = getUserInfo;
