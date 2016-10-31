import React from 'react'
// 引入React-Router模块
// import {Router, Route, IndexRoute, browserHistory, hashHistory} from 'react-router';
// import { createBrowserHistory } from 'history';
const routes = {
	component: require('./containers/App/').default,
	childRoutes : [
		{
			path:'/home',
			getComponent: (nextState, cb) => {
				require.ensure([], (require) => {
					cb(null, require('./containers/Home/').default)
				}, 'home')
			}
		},
		{
			//onEnter: redirectToLogin,
			childRoutes: [
				{
					path: '/home/event',
					getComponent: (nextState, cb) => {
						require.ensure([], (require) => {
							cb(null, require('./containers/Event/').default)
						},'event')
					}
				},
				{
					path: '/home/event/:id',
					getComponent: (nextState, cb) => {
						require.ensure([], (require) => {
							cb(null, require('./containers/EventDetail/').default)
						},'eventDetail')
					}
				}
			]
		},
		{
			path:'/messages',
			getComponent: (nextState, cb) => {
				require.ensure([], (require) => {
					cb(null, require('./containers/Messages/').default)
				}, 'messages')
			}
		},
		{
			path:'/user',
			getComponent: (nextState, cb) => {
				require.ensure([], (require) => {
					cb(null, require('./containers/User/').default)
				}, 'user')
			}
		},
		{
			path: '/',
			getComponent: (nextState, cb) => {
				require.ensure([], (require) => {
					cb(null, require('./containers/Index/').default)
				}, 'index')
			}
		}
	]
};
export default routes;
