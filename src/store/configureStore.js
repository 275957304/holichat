import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducer from '../reducers'

////创建一个 Redux store 来以存放应用中所有的 state，应用中应有且仅有一个 store。

//applyMiddleware来自redux可以包装 store 的 dispatch
//thunk作用是使action创建函数可以返回一个function代替一个action对象
const createStoreWithMiddleware = compose(
    applyMiddleware(
        thunk
    )
    //window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore)

//console.log('createStoreWithMiddleware' + createStoreWithMiddleware);

export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(reducer, initialState)

  //热替换选项
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers')
      store.replaceReducer(nextReducer)
    })
  }
  return store
}

/*
中间件的概念我没看懂, 只是大致抄了一遍代码尝试了一遍
思路是用高阶函数对 store 做了一些封装, 插入了一些 Action 的操作
*/



/*
import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import reducer from '../reducers'
const finalCreactStore = applyMiddleware(thunk)(createStore);
const store = finalCreactStore(reducer);
export default store;
*/
