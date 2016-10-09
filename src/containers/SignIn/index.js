import React, {Component, PropTypes} from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActions from '../../reducers/modules/user/action'
import md5 from 'md5'

class SignIn extends Component {
    // static propTypes = {
    //     routes : PropTypes.object.isRequired,
    //     store  : PropTypes.object.isRequired
    // }
    constructor(props) {
        super(props);
        //console.log(this.props.location.query.next)
        //const redirectRoute = this.props.location.query.next || '/login';
        this.login = this.login.bind(this);
    }
	componentWillReceiveProps (nextProps) {
		let redirectAfterLogin = this.props.location.pathname;
		// const { dispatch, selectedReddit } = nextProps
		if(nextProps.user.loginState){
			//这里要判断第一次进来时的next地址
			this.context.router.push('/')
		}
	}
    login(e) {
        e.preventDefault();
        const { dispatch } = this.props;
		const pas = md5(this.refs.password.value.trim());
        dispatch(userActions.loginUser({
            username: this.refs.username.value.trim(),
            password: md5(pas),
        }));
    }

    render () {
        return (
            <div className='login-box'>

                <form onSubmit={this.login}>
                    <p>
                        <input type="text" name="username" ref="username"/>
                    </p>
                    <p>
                        <input type="password" name="password" ref="password"/>
                    </p>
                    <button type="submit">登录</button>
                </form>
                <p>好吧，先用账号登录吧</p>
            </div>
        );
    }
}

SignIn.contextTypes = {
  router: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    user : state.user
});
export default connect(mapStateToProps)(SignIn);
