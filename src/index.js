import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import routes from './routes'
//const history = syncHistoryWithStore(hashHistory, store);
//rootStore
import configureStore from './store/configureStore'
const store = configureStore();
import 'normalize.css' //重置浏览器默认样式
//微信底层样式
import 'weui/dist/style/weui.min.css';
//import './font/iconfont.css'; //字体图标
render(
	<Provider store={store} key="provider">
		{routes}
	</Provider>,
	document.getElementById('app')
)
