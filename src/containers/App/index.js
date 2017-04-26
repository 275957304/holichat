import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from '../../reducers/modules/user/action'
import bs64  from 'base64-js'

class App extends Component {
    constructor(props) {
        super(props);
        this.isLoginUrl = true;
        this.stateLogin = false;
    }
    componentWillMount(){
        const iscode = this.props.location.query.code;
        if(iscode){
            this.stateLogin = true;
            const str = JSON.stringify({ "code" : iscode ,"type" : 'mp'});
            const bs = bs64.btoa(str);
            let param = `type=weixin&platform=weixin&channel=5000&params=${bs}`;
            console.log(param)
            this.props.userActions.otherLogin( 'other_login', param )
        }else if(!this.props.user.loginState){
            this.props.userActions.loginCheck()
        }
	}
    componentWillReceiveProps(nextProps){
        console.log(nextProps)
        const backurl = this.props.location.pathname + this.props.location.search;
        if(!nextProps.user.loginState && this.isLoginUrl ){
            this.isLoginUrl = false;
            if("micromessenger" == navigator.userAgent.toLowerCase().match(/MicroMessenger/i)){
                const back = encodeURIComponent(window.location.href);
                const stateBack = encodeURIComponent(backurl);
                window.location.href =  `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxcc5c198d146a1779&redirect_uri=${back}&response_type=code&scope=snsapi_userinfo&state=${backurl}#wechat_redirect`
            }else{
                this.context.router.replace({pathname:'/signin',query:{ state: backurl}});
            }
        }
        if(this.stateLogin && this.isLoginUrl){
            this.isLoginUrl = false;
            const stateUrl = this.props.location.query.state || '/'
            this.context.router.replace(stateUrl);
        }
    }
    componentDidMount(){
        //console.log('城市定位')
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
