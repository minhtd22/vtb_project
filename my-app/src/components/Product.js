import { Input, Table } from 'antd';
import moment from 'moment';
import React, { useState, useEffect } from 'react';

import AuthService from '../services/auth.service';
import ProductService from '../services/product.service';

const Product = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const customFetch = async () => {
    setIsLoading(true);

    ProductService.getAllProducts(10000, 0).then(
      (response) => {
        setProducts(response.data);
        setIsLoading(false);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setProducts(_content);
      }
    );
  };

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowAdminBoard(user.roles.includes('ROLE_ADMIN'));
    }

    customFetch();
  }, []);

  const onSearchCustomerName = value => {
    ProductService.getAllProducts(undefined, undefined, undefined, value)
      .then(response => {
        setProducts(response.data);
        console.log('response.data search', response.data);
      })
  };

  const columns = [
    {
      title: 'Cán bộ',
      dataIndex: ['user', 'fullName'],
      key: 'fullName',
      render: (value) => <div style={{ fontWeight: 'bold' }}>{value}</div>
    },
    {
      title: 'Mã Cán bộ',
      dataIndex: ['user', 'userCode'],
      key: 'userCode',
    },
    {
      title: 'Phòng',
      dataIndex: ['user', 'department'],
      key: 'department',
    },
    {
      title: 'Tên khách hàng',
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      title: 'CIF',
      dataIndex: 'cif',
      key: 'cif',
    },
    {
      title: 'Thông tin KH',
      dataIndex: 'customerInformation',
      key: 'customerInformation',
    },
    {
      title: 'Loại KH',
      dataIndex: 'customerType',
      key: 'customerType',
    },
    {
      title: 'Sản phẩm DV',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: 'Ngày đăng ký',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (value) => {
        const date = moment.utc(value).local().format('DD-MM-YYYY');
        return date;
      }
    },
    {
      title: 'Ngày thực hiện',
      dataIndex: 'dayAction',
      key: 'dayAction',
    },
    {
      title: 'Kết quả',
      dataIndex: 'result',
      key: 'result',
    },
    {
      title: 'Ghi chú',
      dataIndex: 'note',
      key: 'note',
    },
  ];

  return (
    <div>
      <div className='search-user'>
        <Input.Search
          placeholder="Nhập tìm kiếm tên khách hàng"
          onSearch={onSearchCustomerName}
          enterButton
        />
      </div>

      <div>
        {
          // Render admin page
          currentUser && showAdminBoard && 
          <Table
              dataSource={products.data}
              columns={columns}
              rowKey={obj => obj._id}
              loading={isLoading}
              on
          >
          </Table>
        }
      </div>
    </div>
  )
};

export default Product;
