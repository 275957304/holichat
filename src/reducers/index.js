import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';


import user from './modules/user/reducer';
import quanzi from './modules/quanzi/reducer';

const rootReducer = combineReducers({
    user,
    quanzi,
    router: routerStateReducer
})
export default rootReducer
