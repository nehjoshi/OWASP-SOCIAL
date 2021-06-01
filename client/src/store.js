import { combineReducers, createStore } from 'redux';
import LoginReducer from './reducers/LoginReducer';

const reducers = combineReducers({ auth: LoginReducer })
const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;