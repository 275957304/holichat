import { combineReducers } from 'redux'
import { routerStateReducer } from 'redux-router'
//import { routerReducer } from 'react-router-redux';

//引作用户信息
import user from './user'
import status from './status'

//合并reducers
const rootReducer = combineReducers({
    user,
	status,
	//routing: routerReducer,
    router: routerStateReducer
})
export default rootReducer
