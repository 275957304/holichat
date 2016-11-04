import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';

import user from './modules/user/reducer';
import quanzi from './modules/quanzi/reducer';
import home from './modules/home/reducer';
import item from './modules/item/reducer';

const rootReducer = combineReducers({
    user,
    quanzi,
    home,
    item,
    router: routerStateReducer
})
export default rootReducer
