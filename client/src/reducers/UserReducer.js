const initialState = {
  user: null,
};

 const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'setUserInfo':
      console.log('setting user info', action.user, action.status);
      if(action.status === 'persistent'){
        console.log('we in persistent');
        return {...state, user: action.user, loggedIn: true};
      }
      return {...state, user: action.user, signedUp: true};
    case 'loginUser':
      console.log('in login user in reducer', action.user);
      return {...state, user: {...state.user, ...action.user}, loggedIn: true};
    case 'setUserToken':
      // console.log('in set user token', action.token, {...state, user: {...state.user, token: action.token}});
      return {...state, user: {...state.user, token: action.token}};

    case 'setWindowDimensions':
      console.log('window dimensions', action.width, action.height);
      return {...state, height: action.height, width: action.width};
    default:
      return state;
  }
}

 export default UserReducer;
