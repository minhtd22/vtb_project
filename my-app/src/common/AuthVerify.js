import React from 'react';
import { withRouter } from 'react-router-dom';
import jwt from 'jwt-decode';

const AuthVerify = (props) => {
  props.history.listen(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user.accessToken;


    if (user) {
      const { exp } = jwt(token);
      
      console.log('exp', exp);
      console.log('Date.now()', Date.now());
      if (exp * 1000 < Date.now()) {
        props.logOut();
      }
    }
  });
  return <div></div>;
};

export default AuthVerify;