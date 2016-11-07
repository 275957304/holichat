import React, {Component, PropTypes} from 'react'
import { message } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from '../../reducers/modules/user/action'
import './app.less'
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {checkNum : true}
    }
    componentWillMount() {
        //console.log(this.props)
		//检查登录
		this.checkAuth(this.props.user.loginState);
	}

    componentWillReceiveProps(nextProps){
        const redirectAfterLogin = this.props.location.pathname + this.props.location.search
        if(!nextProps.user.loginState && this.state.checkNum){
            this.setState({checkNum: false});
            this.context.router.push(`/signin?next=${redirectAfterLogin}`)
        }
    }

    checkAuth (loginState){
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
