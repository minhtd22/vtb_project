const db = require('../models');
const getUserInfor = require('../helpers/getUserInfo');

const Product = db.product;

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
        }
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

  Product.find({ user: userId }).then(async data => {
    try {
      res.send({ status: 200, data });        
    } catch (err) {
        res.status(500).send({ status: 500, message: err.message });
    }
  })
};

// Find a single Product with an id
exports.findOne = (req, res) => {
  // const getCurrentUser = getUserInfor(req, res);
  // const userId = getCurrentUser.id;

  const id = req.params.id;
  Product.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Product with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Product with id=" + id });
    });
};

// Update a Product by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  Product.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Product with id=${id}. Maybe Product was not found!`
        });
      } else res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message,
      });
    });
};

// // Delete a Product with the specified id in the request
// exports.delete = (req, res) => {

// };
// // Delete all Products from the database.
// exports.deleteAll = (req, res) => {

// };
// // Find all published Tutorials
// exports.findAllPublished = (req, res) => {

// };
