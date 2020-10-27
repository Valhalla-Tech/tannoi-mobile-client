import {
  createStore,
  combineReducers,
  applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';

//Reducers
import LoginReducer from './reducers/LoginReducer';
import TopicReducer from './reducers/TopicReducer';
import HomeReducer from './reducers/HomeReducer';

const reducer = combineReducers({
  LoginReducer,
  TopicReducer,
  HomeReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;