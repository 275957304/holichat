import { LOGIN_REQUEST } from '../actions/'
import { Tool } from '../utils/tool'
Tool.setItem('loginState',true)
const loginState = Tool.getItem('loginState');
export default function user(state = loginState , action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            state = false;
            break;
        default:
            return state
    }
}


// fetch(API.check_session + `target_uid=${user.username}&save_session=${user.password}&device=${user.device}`,
//      {
//          method:'GET',
//          headers:{'Cache-Control': 'no-cache'},
//      }
// ).then(function(response) {
//     return response.json();
//  })
//  .then(function(data) {
//      console.log(data);
//  })
//  .catch(function(err) {
//      console.log("Oops, error");
//  });


// export default function user(state = ${loginState} , action) {
//     switch (action.type) {
//         case LOGIN_REQUEST:
//             return Object.assign({}, state, {
//                 isLogin: false,
//                 user: action.user
//             });
//             break;
//         default:
//             return state
//     }
// }
