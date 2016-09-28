export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_NOT = 'LOGIN_NOT';
//登录
import API from '../utils/apis'
import { Tool } from '../utils/tool'
const uid = Tool.getItem('uid');
const session = Tool.getItem('uid');
const device = Tool.getItem('device');




export function login_request(){
    return{
        type:LOGIN_REQUEST,
        user : '需要登录'
    }
}

export function isLogin(){
    return (dispatch, getState) => {
        fetch(API.check_session + `target_uid=${uid}&save_session=${session}&device=${device}`)
        .then(response => response.json())
        //.then(json => console.log(json))
        .then(function(json){
            if(json.ret != '0'){
                dispatch(login_request())
            }
        })
    }
}


// function fetch_login (user) {
//     return dispatch => {
//         dispatch(login_request( user));
//         return fetch(API.check_session + `username=${user.username}&password=${user.password}`)
//         .then( response => response.json())
//         .then(json => console.log(json))
//         //.then( json => dispatch( login_receive( user, json )))
//     }
// }






export const INCREMENT_COUNTER = 'INCREMENT_COUNTER'
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER'
//导出加一的方法
export function increment() {
  return {
    type: INCREMENT_COUNTER
  }
}
//导出减一的方法
export function decrement() {
  return {
    type: DECREMENT_COUNTER
  }
}
//导出奇数加一的方法，该方法返回一个方法，包含dispatch和getState两个参数，dispatch用于执行action的方法，getState返回state
export function incrementIfOdd() {
  return (dispatch, getState) => {
    //获取state对象中的counter属性值
    const { counter } = getState()

    //偶数则返回
    if (counter % 2 === 0) {
      return
    }
    //没有返回就执行加一
    dispatch(increment())
  }
}
//导出一个方法,包含一个默认参数delay,返回一个方法,一秒后加一
export function incrementAsync(delay = 1000) {
  return dispatch => {
    setTimeout(() => {
      dispatch(increment())
    }, delay)
  }
}




// function fetch_logout () {
//     return dispatch => {
//         return fetch(`http://localhost:3000/users/logout`, {
//             credentials: 'same-origin'
//         })
//         .then( response => response.json())
//         .then(
//             json => {
//                 if(json.status)
//                 return dispatch(logout_result())
//             }
//         )
//     }
// }


// reqwest 做请求
// export const getArticles = (curPage,category = '') => {
//     return (dispatch,getState)=>{
//         reqwest({
//                 url:'/article/list',
//                 method:'get',
//                 type:'json',
//                 data:{
//                     limit:LIMIT,
//                     page:curPage,
//                     category:category
//                 },
//                 error:function (error) {
//                     dispatch(setSnackbar('加载文章列表失败了T—T 刷新试试'));
//                 },
//                 success:function (data) {
//                     dispatch(setLoading(false));
//                     dispatch(setArticleList(data.articleList));
//                     dispatch(setCurPage(curPage));
//                 }
//             });
//     }
// }
