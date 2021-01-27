import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

//Reducers
import LoginReducer from './reducers/LoginReducer';
import TopicReducer from './reducers/TopicReducer';
import HomeReducer from './reducers/HomeReducer';
import DiscussionReducer from './reducers/DiscussionReducer';
import ResponseReducer from './reducers/ResponseReducer';
import ProfileReducer from './reducers/ProfileReducer';
import VerificationReducer from './reducers/VerificationReducer';
import PrivateDiscussionReducer from './reducers/PrivateDiscussionReducer';
import SearchReducer from './reducers/SearchReducer';
import PlayerReducer from './reducers/PlayerReducer';
import CreateCommunityReducer from './reducers/CreateCommunityReducer';

const reducer = combineReducers({
  LoginReducer,
  TopicReducer,
  HomeReducer,
  DiscussionReducer,
  ResponseReducer,
  ProfileReducer,
  VerificationReducer,
  PrivateDiscussionReducer,
  SearchReducer,
  PlayerReducer,
  CreateCommunityReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
