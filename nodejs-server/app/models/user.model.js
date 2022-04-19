const { mongoose } = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: false,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model('User', userSchema);
