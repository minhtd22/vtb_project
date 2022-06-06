const customerType = ['KHDN', 'KHCN'];
// const productName = [
//   'Cho vay vốn SXKD',
//   'Cho vay vốn đầu tư dự án',
//   'Giao dịch MBNT',
//   'DV chuyển tiền ngoại tệ đến/đi',
//   'POS',
//   'QR',
//   'Chi lương',
//   'Tiền gửi có kỳ hạn',
//   'Tài khoản thanh toán',
//   'Trái phiếu NHCT phát hành',
//   'Tài khoản ký quỹ',
//   'Thấu chi',
//   'TTTM & Bảo lãnh',
//   'Efast',
//   'Bảo hiểm phi nhân thọ',
//   'Bảo hiểm nhân thọ',
//   'Cho vay tiêu dùng',
//   'Ipay',
//   'Thẻ GNQT',
//   'Thẻ TDQT',
//   'TK số đẹp/Alias',
// ];

module.exports = (mongoose, mongoosePaginate) => {
  const productSchema = new mongoose.Schema(
    {
      productName: {
        type: String,
        // enum: productName,
        required: true,
      },
      customerType: {
        type: String,
        enum: customerType,
        required: true,
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
        required: true,
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    },
    { timestamps: true },
  );
  productSchema.plugin(mongoosePaginate);

  const Product = mongoose.model('Product', productSchema);

  return Product;
};
