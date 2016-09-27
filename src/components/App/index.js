import React, {Component, PropTypes} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as CounterActions from '../../actions/'  //actions
import './app.css'
import Header from './Header'
import Footer from './Footer'
//https://github.com/zjy01/react_and_redux_and_router_example/tree/master/views/react


class App extends Component {
    componentWillMount() {
       console.log("这里来判断用户是否登录");
    }
    render() {
        // 通过调用 connect() 注入:
        const { getMessage, a , b } = this.props;
        console.log(getMessage)
        //var tab = this.props.location.query.tab || 'home';
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
    addNumber : state.setApp
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(CounterActions, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
