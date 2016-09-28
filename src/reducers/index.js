import { combineReducers } from 'redux'
//引作用户信息
import user from './user'

//合并reducers
const rootReducer = combineReducers({
    user
})
export default rootReducer
