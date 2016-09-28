import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
// 引入React-Router模块
import {Router, Route, IndexRoute, browserHistory, hashHistory} from 'react-router';
//rootStore
import configureStore from './store/configureStore'
const store = configureStore();
import 'normalize.css' //重置浏览器默认样式
//微信底层样式
import 'weui/dist/style/weui.min.css';

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

render(
	<Provider store={store}>
		<Router history={hashHistory}>
            <Route path="/" onEnter={ loginRequireAuth} component={App}>
                <IndexRoute component={Index} />
                <Route path="home" component={Home}/>
                <Route path="messages" component={Messages}/>
                <Route path="user" component={User}/>
                <Route path="signin" component={SignIn}/>
            </Route>
        </Router>
	</Provider>,
	document.getElementById('app'),
    ()=>console.log('完成')
)

//import { apis } from './utils/apis'  //这个是底层URL地址
//console.log(apis.sys_info);
