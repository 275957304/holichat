import React from 'react'
//import checkLogin from './utils/checkLogin/'
//this.props.params.id

// function redirectToDashboard(nextState, replace){
// 	if(!checkLogin.loggedIn()){
// 		replace({
// 			pathname: '/signin',
// 			state: { nextPathname: nextState.location.pathname }
// 		})
// 	}
// }

const Home = {
	path:'/home',
	getComponent: (nextState, cb) => {
		require.ensure([], (require) => {
			cb(null, require('./containers/Home/').default)
		}, 'home')
	}
}
const HomeEvent = {
	path: '/home/event',
	getComponent: (nextState, cb) => {
		require.ensure([], (require) => {
			cb(null, require('./containers/Event/').default)
		},'event')
	}
}
const HomeDetail = {
	path: '/home/event/:id',
	getComponent: (nextState, cb) => {
		require.ensure([], (require) => {
			cb(null, require('./containers/EventDetail/').default)
		},'eventDetail')
	}
}

const Messages = {
	path:'/messages',
	getComponent: (nextState, cb) => {
		require.ensure([], (require) => {
			cb(null, require('./containers/Messages/').default)
		}, 'messages')
	}
}

const User = {
	path:'/user',
	getComponent: (nextState, cb) => {
		require.ensure([], (require) => {
			cb(null, require('./containers/User/').default)
		}, 'user')
	}
}

const Signin = {
	path:'/signin',
	getComponent: (nextState, cb) => {
		require.ensure([], (require) => {
			cb(null, require('./containers/SignIn/').default)
		}, 'signin')
	}
}

const Other = {
	path: '/',
	getComponent: (nextState, cb) => {
		require.ensure([], (require) => {
			cb(null, require('./containers/Index/').default)
		}, 'index')
	}
}

const Page404 = {
	path: '*',
	getComponent: (nextState, cb) => {
		require.ensure([], (require) => {
			cb(null, require('./containers/Page404/').default)
		}, 'index')
	}
}


const routes = {
	component: require('./containers/App/').default,
	//onEnter: redirectToDashboard,
	childRoutes :[
		Home,
		HomeEvent,
		HomeDetail,
		Messages,
		User,
		Signin,
		Other,
		Page404
	]
};





export default routes;
