const { mongoose } = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    customerType: {
      type: String,
      enum: ['KHDN', 'KHCN'],
      required: false,
    },
    customerInformation: {
      type: String,
    },
    customerName: {
      type: String,
    },
    cif: {
      type: String,
    },
    note: {
      type: String,
    },
    result: {
      type: String,
    },
    dayAction: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Product', productSchema);
