import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';


import user from './modules/user/reducer';
import quanzi from './modules/quanzi/reducer';
import home from './modules/home/reducer';

const rootReducer = combineReducers({
    user,
    quanzi,
    home,
    router: routerStateReducer
})
export default rootReducer
