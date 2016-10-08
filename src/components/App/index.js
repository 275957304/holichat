import React, {Component, PropTypes} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { pushState } from 'redux-router';
import * as CounterActions from '../../actions/'  //actions
import './theme/index.css'

import Footer from './Footer'
import Toast from '../Common/toast/'

class App extends Component {
    constructor(props) {
        super(props)
    }
	componentWillMount () {
		//检查登录
		this.checkAuth(this.props.userInfo.loginState);
	}
	componentWillReceiveProps (nextProps) {
		let redirectAfterLogin = this.props.location.pathname;
		// const { dispatch, selectedReddit } = nextProps
		//console.log('WillReceiveProps:' + nextProps.userInfo.loginState)
		//this.checkAuth(nextProps.userInfo.loginState);
		if(!nextProps.userInfo.loginState){
			//检查登录
			this.context.router.push('/signin?next=${redirectAfterLogin}')
		}
	}

	checkAuth (loginState) {
		if (!loginState){
			const { actions, dispatch } = this.props
			//this.props.dispatch(loginCheck())
			actions.loginCheck()
		}
	}

    render() {
        const { userInfo, status , actions } = this.props;
		const currentPath = this.props.routes[1].path || 'index' ;
		//console.log(this.props.location.pathname)
        return (
            <div className="wx_app">
				<div className="weui_tab_bd">
					{this.props.children}
				</div>
				{status.msg === true ? <Toast txt={status.msgTxt} />: null}
                <Footer tab={currentPath} />
            </div>
        )
    }
}

//<Toast show={status.msg} txt={status.msgTxt} />

App.contextTypes = {
  router: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    userInfo: state.user,
	status : state.status
});

//将action的所有方法绑定到props上
const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(CounterActions, dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(App)
