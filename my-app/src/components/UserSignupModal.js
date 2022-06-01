import React from 'react';
import { Modal, Button } from 'antd';

const UserSignupModal = ({ isModalVisible, handleOk }) => {
  Modal.success({
    content: 'Chúc mừng bạn đã đăng ký tài khoản thành công. Xin vui lòng đăng nhập!',
    onOk: handleOk,
    okText: 'Đăng nhập',
  });
};

export default UserSignupModal;