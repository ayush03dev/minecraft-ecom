import {combineReducers} from 'redux';
import loadingReducer from './loadingReducer';
import playerReducer from './playerReducer';

export default combineReducers({loading: loadingReducer, player: playerReducer});