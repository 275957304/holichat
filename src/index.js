import React from 'react'
import { render } from 'react-dom'
import {Router, Route, IndexRoute, browserHistory, hashHistory} from 'react-router';
import { Provider } from 'react-redux'
import routes from './routes'
import configureStore from './store/configureStore'
//let unsubscribe = store.subscribe(() => {console.log('state发生了变化')})
const store = configureStore();
import './style/app.less'
render(
	<Provider store={store} key="provider">
		<Router history={hashHistory} routes={routes}/>
	</Provider>,
	document.getElementById('app')
)

// https://github.com/ReactTraining/react-router/blob/master/docs/guides/Histories.md
// http://nphard.me/2016/03/07/nginx-for-react/
// https://my.oschina.net/u/2380148/blog/639919
// 性能优化 immutable.js
