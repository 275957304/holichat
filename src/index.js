import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
// 引入React-Router模块
import {Router, Route, IndexRoute, browserHistory, hashHistory} from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
//const history = syncHistoryWithStore(hashHistory, store);
//rootStore
import configureStore from './store/configureStore'
const store = configureStore();
import 'normalize.css' //重置浏览器默认样式
//微信底层样式
import 'weui/dist/style/weui.min.css';
//import './font/iconfont.css'; //字体图标

// 引入单个页面
import App from './components/App/'
import Index from './components/Index/'
import Home from './components/Home/'
import Messages from './components/Messages/'
import User from './components/User/'
import SignIn from './components/SignIn/'

// store.subscribe(function () {
//     console.log(store.getState());
// });

const loginRequireAuth = function () {
    console.log("开始加载")
}

// 此处用于添加根路径
// const history = useBasename(createHashHistory)({
//   queryKey: '_key',
//   basename: '',
// });

//console.log(syncHistoryWithStore)

render(
	<Provider store={store}>
		<Router history={hashHistory}>
            <Route path="/" onEnter={ loginRequireAuth} component={App}>
                <IndexRoute component={Index} />
                <Route path="home" component={Home}/>
                <Route path="messages" component={Messages}/>
                <Route path="user" component={User}/>
            </Route>
            <Route path="signin" component={SignIn}/>
        </Router>
	</Provider>,
	document.getElementById('app')
)
