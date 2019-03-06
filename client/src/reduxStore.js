import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import UserReducer from './reducers/UserReducer';

const appReducer = combineReducers({
  userInfo: UserReducer,
});

const rootReducer = (state, action) => {
    if (action.type === 'Logout') {
        state = undefined;
    }
    return appReducer(state, action);
};

const store = createStore(rootReducer, {}, applyMiddleware(thunk));

export default store;
