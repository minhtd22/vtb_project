import React from "react";

const SignUp = () => {
  return (
    <form>
      <h3>Đăng ký thông tin</h3>
      <div className="mb-3">
        <label>Họ và tên</label>
        <input type="text" className="form-control" placeholder="Họ và tên" />
      </div>
      <div className="mb-3">
        <label>Email</label>
        <input
          type="email"
          className="form-control"
          placeholder="Vui lòng nhập Email"
        />
      </div>
      <div className="mb-3">
        <label>Mã cán bộ</label>
        <input
          type="code"
          className="form-control"
          placeholder="Vui lòng nhập mã cán bộ"
        />
      </div>
      {/* <div className="mb-3">
        <label>Phòng ban</label>
        <input
          type="department"
          className="form-control"
          placeholder="Chọn phòng ban"
        />
      </div> */}
      <div class="mb-3">
        <div class="input-group-prepend">
          <label>
            Phòng ban
          </label>
        </div>
        <select class="custom-select dropdown-select" id="inputGroupSelect01">
          <option selected>Chọn...</option>
          <option value="1">DVKH</option>
          <option value="2">Bán lẻ</option>
          <option value="3">PGD Ông Ích Khiêm</option>
          <option value="4">PGD Tây Hồ</option>
          <option value="5">PGD Đà Nẵng</option>
        </select>
      </div>
      <div className="mb-3">
        <label>Mật khẩu</label>
        <input
          type="password"
          className="form-control"
          placeholder="Vui lòng nhập mật khẩu"
        />
      </div>
      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Đăng ký
        </button>
      </div>
      <p className="forgot-password text-right">
        Đã có tài khoản <a href="/sign-in">Đăng nhập?</a>
      </p>
    </form>
  );
};

export default SignUp;
