import React from 'react'
// 引入React-Router模块
import {Router, Route, IndexRoute, browserHistory, hashHistory} from 'react-router';
import { createBrowserHistory } from 'history';
import {
	App,
	Index,
	Home,
	Messages,
	User,
	SignIn,
	Page404
} from './containers'

//console.log(createBrowserHistory)

const routes = (
    <Router history={hashHistory}>
        <Route path="/" component={App}>
			<IndexRoute component={Index} />
			<Route path="home" component={Home}/>
			<Route path="messages" component={Messages}/>
			<Route path="user" component={User}/>
        </Route>
		<Route path="signin" component={SignIn}/>
		<Route path="*" component={Page404} />
    </Router>
);

export default routes;
