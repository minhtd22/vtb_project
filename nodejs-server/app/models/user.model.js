const department = ['DVKH', 'Bán lẻ', 'KHDN', 'PGD Ông Ích Khiêm', 'PGD Tây Hồ', 'PGD Nam ĐN'];

module.exports = (mongoose, mongoosePaginate) => {
  const userSchema = new mongoose.Schema(
    {
      username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
      },
      fullName: {
        type: String,
        required: true,
        trim: true,
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
      userCode: {
        type: String,
        unique: true,
      },
      department: {
        type: String,
        enum: department,
        required: true,
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

  userSchema.plugin(mongoosePaginate);

  const User = mongoose.model('User', userSchema);
  return User;
};
