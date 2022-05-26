const _ = require('lodash');
const db = require('../models');
const getUserInfor = require('../helpers/getUserInfo');

const Product = db.product;
const getPagination = (page, size = 5) => {
  const limit = size ? +size : 5;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};
const validateAdminRole = (roles) => _.some(roles, { name: 'admin' });

// Create and Save a new Product
exports.create = (req, res) => {
  // Validate request
  if (!req.body.productName) {
    res.status(400).send({ message: 'Content can not be empty!' });
    return;
  }
  const getCurrentUser = getUserInfor(req, res);

  // Create a Product
  const product = new Product({
    productName: req.body.productName,
    customerType: req.body.customerType,
    customerInformation: req.body.customerInformation,
    customerName: req.body.customerName,
    dayAction: req.body.dayAction,
    cif: req.body.cif,
    user: getCurrentUser.id,
  });

  // Save Product in the database
  product
    .save(product)
    .then(async (data) => {
      const result = await data.populate({
        path: 'user',
        select: '_id username email roles',
        populate: {
          path: 'roles',
        },
      });

      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Tutorial.',
      });
    });
};
// Retrieve all Products from the database.
exports.findAll = (req, res) => {
  const getCurrentUser = getUserInfor(req, res);
  const userId = getCurrentUser.id;
  const userRoles = getCurrentUser.roles;
  const isUserAdmin = validateAdminRole(userRoles);
  const {
    page, size, cif, customerName,
  } = req.query;
  const { limit, offset } = getPagination(page, size);
  let query = {};

  if (!isUserAdmin) {
    query = {
      ...query,
      user: userId,
    };
  }

  if (cif) {
    query = {
      ...query,
      cif,
    };
  }

  if (customerName) {
    query = {
      ...query,
      customerName: { $regex: new RegExp(customerName), $options: 'i' },
    };
  }

  Product.paginate(query, { offset, limit })
    .then((data) => {
      res.send({
        totalItems: data.totalDocs,
        products: data.docs,
        totalPages: data.totalPages,
        currentPage: data.page - 1,
      });
    })
    .catch((err) => {
      res.status(500).send({ status: 500, message: err.message });
    });
};

// Find a single Product with an id
exports.findOne = (req, res) => {
  // const getCurrentUser = getUserInfor(req, res);
  // const userId = getCurrentUser.id;

  const { id } = req.params;
  Product.findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: `Not found Product with id ${id}` });
      } else res.send(data);
    })
    .catch(() => {
      res
        .status(500)
        .send({ message: `Error retrieving Product with id=${id}` });
    });
};

// Update a Product by the id in the request
exports.update = (req, res) => {
  const { id } = req.params;

  if (!req.body) {
    return res.status(400).send({
      message: 'Data to update can not be empty!',
    });
  }

  Product.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Product with id=${id}. Maybe Product was not found!`,
        });
      } else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

// Delete a Product with the specified id in the request
exports.delete = async (req, res) => {
  const { id } = req.params;
  const getCurrentUser = getUserInfor(req, res);
  const userId = getCurrentUser.id;

  const product = await Product.findById(id).orFail(() => {
    res.status(404).send({ message: 'Product not found' });
  });

  // Validate if product does not belongs to user
  if (product.user.toString() !== userId) {
    res.status(403).send({
      message: 'Access Denied',
    });
  } else {
    // Delete product
    Product.findByIdAndRemove(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Product with id=${id}. Maybe Product was not found!`,
          });
        } else {
          res.send({
            message: 'Product was deleted successfully!',
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message,
        });
      });
  }
};
