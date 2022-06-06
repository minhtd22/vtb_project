import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Login from './components/Login';
import SignUp from './components/SignUp';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import myImage from './assets/images/logo.jpg';
import AuthService from './services/auth.service';
import User from './components/User';
import Profile from './components/Profile';
import Product from './components/Product';
import ProductUser from './components/ProductUser';
import AuthVerify from './common/AuthVerify';

function App() {
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const history = createBrowserHistory()

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    
    if (user) {
      setCurrentUser(user);
      setShowAdminBoard(user.roles.includes('ROLE_ADMIN'));
    }

  }, [showAdminBoard]);
  

  const logOut = () => {
    AuthService.logout();
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  }

  return (
    <Router history={history}>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={'/'}>
              <img alt="logo" width={165} height={60} src={myImage}></img>
            </Link>
            <div>
              <ul className="navbar-nav ml-auto">
                {currentUser ?
                  <>
                    {showAdminBoard && <div style={{ display: 'flex', left: '25%', position: 'absolute' }}>
                      <li className="nav-item nav-item-login">
                        <Link className="nav-link" to={'/users'} >
                          Cán bộ
                        </Link>
                      </li>
                      <li className="nav-item nav-item-login">
                        <Link className="nav-link" to={'/products'} >
                          Sản phẩm dịch vụ
                        </Link>
                      </li>
                    </div>}
                    <li className="nav-item nav-item-login">
                      <Link className="nav-link" to={'/profile'} >
                        {currentUser.username}
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to={'/sign-in'} onClick={logOut}>
                        Đăng xuất
                      </Link>
                    </li>
                  </>
                   :
                  <>
                    <li className="nav-item nav-item-login">
                      <Link className="nav-link" to={'/sign-in'}>
                        Đăng nhập
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to={'/sign-up'}>
                        Đăng ký
                      </Link>
                    </li>
                  </>
                }
              </ul>
            </div>
          </div>
        </nav>
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route exact path="/" element={currentUser ? <User /> : <Login />} />
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/users" element={<User />} />
              <Route path="/products" element={<Product />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/products/:id" element={<ProductUser />} />
            </Routes>
          </div>
        </div>
        {/* <AuthVerify logOut={logOut} /> */}
      </div>
    </Router>
  )
}

export default App;
