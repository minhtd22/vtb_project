/* eslint-disable no-shadow */
const db = require('../models');

const { ROLES } = db;
const User = db.user;

const checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    username: req.body.username,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (user) {
      res.status(400).send({ message: 'Tài khoản đã được đăng ký!' });
      return;
    }

    // Email
    if (req.body.email) {
      User.findOne({
        email: req.body.email,
      }).exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        if (user) {
          res.status(400).send({ message: 'Email đã được đăng ký!' });
          return;
        }
        next();
      });
    }
  });
};

const checkDuplicateUserCode = (req, res, next) => {
  // UserCode
  if (req.body.userCode) {
    User.findOne({
      userCode: req.body.userCode,
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (user) {
        res.status(400).send({ message: 'Mã cán bộ đã được đăng ký!' });
        return;
      }
      next();
    });
  } else {
    next();
  }
};

const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `Failed! Role ${req.body.roles[i]} does not exist!`,
        });
        return;
      }
    }
  }
  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkDuplicateUserCode,
  checkRolesExisted,
};

module.exports = verifySignUp;
