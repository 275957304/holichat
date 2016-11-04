import * as types from '../../types'
/*
const InitState = {
  user: null,
  loading: false,
  errmsg: null
}

export default function news(state = InitState, action = {}) {
  switch (action.type) {
    case `${types.LOGIN}_LOADING`:
      return Object.assign({}, state, {'loading': true});
    case `${types.LOGIN}_SUCCESS`:
      return Object.assign({}, state, {'loading': false, 'user':action.payload.user});
    case `${types.LOGIN}_ERROR`:
      return Object.assign({}, state, {'loading': false, 'errmsg':types.ERROR_SERVER, 'user': null});
    case `${types.LOGOUT}_SUCCESS`:
      return Object.assign({}, state, {'user': null});
    default:
      return state;
  }
}
*/

const userInfo = {
    loginState : false,
}
export default function user(state = userInfo, action ){
    switch(action.type){
        case types.LOGIN_USER_SUCCESS:
            return Object.assign({}, state,{loginState: true},action.payload);
		case types.LOGIN_USER_ERROR:
            return Object.assign({}, state, action.payload)
        default:
            return state
    }
}
