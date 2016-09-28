import React, {Component, PropTypes} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Tool } from '../../utils/tool'
import * as CounterActions from '../../actions/'  //actions
import './app.css'
import Header from './Header'
import Footer from './Footer'
//https://github.com/zjy01/react_and_redux_and_router_example/tree/master/views/react


class App extends Component {
    constructor(props) {
        super(props)
    }
    componentWillMount() {
        this.checkSession()
    }
    checkSession(){
        const {user,isLogin,dispatch} = this.props;
        console.log(user)

        //if(!user.isLogin){
        //    console.log(this.props.location);
        //    console.log(this.props.history);
            //没有登录
            //记录当前页面path
            //跳转到SignIn Page处理登录 登录完成够会跳回当前页面
            //dispatch(CommonActions.setNextUrl(path))
            //browserHistory.push('/signin');
            //dispatch()
            //this.props.history.replaceState(null, '/signin');
        //}
    }

    render() {
        const { user, dispatch } = this.props;
        console.log(user)
        return (
            <div>
                <Header/>
                    <div className="weui_tab_bd">
                        {this.props.children}
                    </div>
                <Footer/>
            </div>
        )
    }
}
// App.propTypes = {
//     isLogin: React.PropTypes.bool.isRequired
// }
//export default connect(indexSelector)(App);




function mapStateToProps(state) {
  return {
    user : state.user
  }
}
export default connect(mapStateToProps,CounterActions)(App)
