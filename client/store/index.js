import {
  createStore,
  combineReducers,
  applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';

//Reducers
import LoginReducer from './reducers/LoginReducer';

const reducer = combineReducers({
  LoginReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;