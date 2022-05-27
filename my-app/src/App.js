import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Login from './components/Login';
import SignUp from './components/SignUp';
import logo from './logo.svg';
import './App.css';
import UserService from './services/user.service';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import myImage from './assets/images/logo.png';

// function App() {
//   const [data, setData] = React.useState(null);
//   useEffect(() => {
//     UserService.getPublicContent()
//       .then((res) => {console.log('res', res); setData(res.data)})
//   }, []);

//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>{!data ? "Loading..." : data}</p>
//       </header>
//     </div>
//   );
// }
function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={'/sign-in'}>
              <img alt="logo" width={130} height={50} src={myImage}></img>
            </Link>
            <div>
              <ul className="navbar-nav ml-auto">
                <li className="nav-item nav-item-login">
                  <Link className="nav-link" to={'/sign-in'}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/sign-up'}>
                    Sign up
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App;
