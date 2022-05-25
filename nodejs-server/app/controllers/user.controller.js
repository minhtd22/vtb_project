const _ = require('lodash');
const db = require('../models');
const getUserInfor = require('../helpers/getUserInfo');

const User = db.user;

const getPagination = (page, size = 5) => {
  const limit = size ? +size : 5;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};

// Get all users
exports.findAll = (req, res) => {
  const getCurrentUser = getUserInfor(req, res);
  const userRoles = getCurrentUser.roles;
  const isUserAdmin = _.some(userRoles, { name: 'admin' });
  const { page, size } = req.query;

  const { limit, offset } = getPagination(page, size);
  const query = {};

  if (isUserAdmin) {
    User.paginate(query, { offset, limit })
      .then((data) => {
        res.send({
          totalItems: data.totalDocs,
          users: data.docs,
          totalPages: data.totalPages,
          currentPage: data.page - 1,
        });
      })
      .catch((err) => {
        res.status(500).send({ status: 500, message: err.message });
      });
  } else {
    res.status(403).send({ status: 403, message: 'Access Denied' });
  }
};

// Get user detail
exports.findOne = (req, res) => {
  const getCurrentUser = getUserInfor(req, res);
  const userRoles = getCurrentUser.roles;
  const isUserAdmin = _.some(userRoles, { name: 'admin' });
  const { id } = req.params;
  const userId = getCurrentUser.id;

  if (isUserAdmin || userId === id) {
    User.findById(id)
      .then((data) => {
        if (!data) { res.status(404).send({ message: `Not found User with id ${id}` }); } else res.send(data);
      })
      .catch(() => {
        res
          .status(500)
          .send({ message: `Error retrieving User with id=${id}` });
      });
  } else {
    res.status(403).send({ status: 403, message: 'Access Denied' });
  }
};

// Update an User by the id in the request
exports.update = (req, res) => {
  const { id } = req.params;
  const getCurrentUser = getUserInfor(req, res);
  const userRoles = getCurrentUser.roles;
  const isUserAdmin = _.some(userRoles, { name: 'admin' });
  const userId = getCurrentUser.id;

  if (_.isEmpty(req.body)) {
    return res.status(400).send({
      message: 'Data to update can not be empty!',
    });
  }

  if (isUserAdmin || userId === id) {
    User.findByIdAndUpdate(id, req.body, { new: true })
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update User with id=${id}. Maybe User was not found!`,
          });
        } else res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message,
        });
      });
  }
};

exports.allAccess = (req, res) => {
  res.status(200).send('Public Content.');
};
exports.userBoard = (req, res) => {
  res.status(200).send('User Content.');
};
exports.adminBoard = (req, res) => {
  res.status(200).send('Admin Content.');
};
exports.moderatorBoard = (req, res) => {
  res.status(200).send('Moderator Content.');
};
