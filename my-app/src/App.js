import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

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
import { PrivateRoute } from './components/PrivateRoute';
import Unauthorized from './components/Unauthorized';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    
    if (user) {
      setUserRole(user);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

  }, [isAdmin, isLoggedIn]);

  const getCurrentUser = (data) => {
    setUserRole(data);
  };

  const setUserRole = (data) => {
    setCurrentUser(data);
    setIsAdmin(data.roles.includes('ROLE_ADMIN'));
  };

  const logOut = () => {
    AuthService.logout();
    setIsAdmin(false);
    setCurrentUser(undefined);
    setIsLoggedIn(false);
  };

  return (
    <Router>
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
                    {
                      <div style={{ display: 'flex', left: '25%', position: 'absolute' }}>
                        {
                          isAdmin && 
                          <li className="nav-item nav-item-login">
                            <Link className="nav-link" to={'/users'} >
                              Cán bộ
                            </Link>
                          </li>
                        }
                        <li className="nav-item nav-item-login">
                          <Link className="nav-link" to={'/products'} >
                            Sản phẩm dịch vụ
                          </Link>
                        </li>
                      </div>
                    }
                    <li className="nav-item nav-item-login">
                      <Link className="nav-link" to={'/profile'} >
                        {currentUser.username}
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to={'/login'} onClick={logOut}>
                        Đăng xuất
                      </Link>
                    </li>
                  </>
                   :
                  <>
                    <li className="nav-item nav-item-login">
                      <Link className="nav-link" to={'/login'}>
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
              <Route exact path="/" element={isLoggedIn ? <Product getCurrentUser={getCurrentUser}/> : <Login />} />
              <Route path="/login" element={isLoggedIn ? <Product getCurrentUser={getCurrentUser} /> : <Login />} />
              <Route path="/sign-up" element={isLoggedIn ? <Product getCurrentUser={getCurrentUser} /> : <SignUp />} />
              <Route exact path='/' element={<PrivateRoute/>}>
                <Route path="/users" element={isAdmin ? <User getCurrentUser={getCurrentUser} /> : <Unauthorized /> } />
                <Route path="/products" element={<Product getCurrentUser={getCurrentUser} />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/products/:id" element={<ProductUser />} />
              </Route>
            </Routes>
          </div>
        </div>
        <AuthVerify logOut={logOut} />
      </div>
    </Router>
  )
}

export default App;
