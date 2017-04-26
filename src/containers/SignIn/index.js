import React, {Component, PropTypes} from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActions from '../../reducers/modules/user/action'
import md5 from 'md5'
import bs64  from 'base64-js'
import { Button, ActivityIndicator } from 'antd-mobile';

class SignIn extends Component {
    static contextTypes = {
         router: PropTypes.object.isRequired
    }
    constructor(props) {
        super(props);
        this.stateUrl = "";
    }
    componentWillMount(){
        this.stateUrl = this.props.location.query.state || '/'
    }
	componentWillReceiveProps(nextProps) {
		if(nextProps.user.loginState){
			this.context.router.replace(this.stateUrl)
		}
	}

    login(e) {
        e.preventDefault();
        const { dispatch } = this.props
        const phone =  this.refs.username.value.trim();
        const pwd = md5(this.refs.password.value.trim());
        const param = `phone=${phone}&pwd=${md5(pwd)}&device=''&platform=weixin&channel=5000`
        dispatch(userActions.login('login', param));
    }
    render () {
        return (
            <div className='login-box'>
                <form onSubmit={this.login.bind(this)}>
                    <p>
                        <input type="text" name="username" ref="username"/>
                    </p>
                    <p>
                        <input type="password" name="password" ref="password"/>
                    </p>
                    <br/>
                    <button type="submit">登录</button>
                </form>
                <p>好吧，先用账号登录吧</p>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user : state.user
});
export default connect(mapStateToProps)(SignIn);
