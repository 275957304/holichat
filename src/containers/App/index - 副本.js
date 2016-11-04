import React, {Component, PropTypes} from 'react'
import { message } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from '../../reducers/modules/user/action'
import '../../font/custom.less'
import './app.less'

class App extends Component {
    constructor(props) {
        super(props)
    }
    componentWillMount() {
		//检查登录
		this.checkAuth(this.props.user.loginState);
	}
    componentWillReceiveProps (nextProps) {
		let redirectAfterLogin = this.props.location.pathname;
		// const { dispatch, selectedReddit } = nextProps
		//console.log('WillReceiveProps:' + nextProps.userInfo.loginState)
		//this.checkAuth(nextProps.userInfo.loginState);
		if(!nextProps.user.loginState){
			//检查登录
			//this.context.router.push('/signin?next=${redirectAfterLogin}')
			this.context.router.push('/signin')
		}
	}

    
    checkAuth (loginState) {
		if (!loginState){
			const { userActions, dispatch } = this.props
			userActions.loginCheck()
		}
	}

    render() {
        const { user, status , actions } = this.props;
        return(
            <div className="wx_app">
                {this.props.children}
            </div>
        )
    }
}

App.contextTypes = {
    router: PropTypes.object.isRequired
};

export default connect(
   state => ({
       user : state.user
   }),
   dispatch => ({
     userActions: bindActionCreators(userActions, dispatch)
   })
)(App)
