import React from 'react';

export const setUserInfo = (user, status) => ({type: 'setUserInfo', user, status});

export const loginUser = (user) => ({type: 'loginUser', user});

export const setUserToken = (token) => ({type: 'setUserToken', token});

export const logout = () => ({type: 'Logout'});

//COMMON FUNCTION BELOW

export const renderErrors = (comp) => {
  return comp.state.error.map((e) => {
    return (
      <li className="error">
        {e}
      </li>
    )
  });
}
