import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as itemActions from '../../reducers/modules/item/action'
import Header from '../../components/Header/'
import './style.less'
import { Spin } from 'antd';
import 'antd/lib/spin/style/index.less';
//const CheckboxGroup = Checkbox.Group;
class HomeEnroll extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading : true
        };
        this.onChange = this.onChange.bind(this)
    }
    componentDidMount() {
        const { params, itemActions } = this.props;
        const types = this.props.location.query.type;
        //获取组别信息
        if(types == 'activity'){
            itemActions.get_activity_enroll_info({'activity_id':params.id})
        }else if(types == 'event'){
            itemActions.get_competition_enroll_info({'event_id':params.id})
        }else if(types == 'training'){
            itemActions.get_training_enroll_info({'training_id':params.id})
        }

    }
    onChange(e){
        console.log(`checked = ${e.target.checked}`);
    }
    render(){
        const { item } = this.props
        if(item.enroll.loading){
            return <Spin size="large" spinning={item.loading}></Spin>
        }
        const project = item.enroll.data.project
        console.log(project)
        return (
            <div className="enroll_item">
                <Header title="组别选择" leftTo="fanhui" />
                <div className="weui-cells__title">毽球</div>
                <div className="weui-cells weui-cells_radio">

                    fdsfds

                </div>
                <div className="weui-footer_fixed-bottom">
                    <a className="weui-btn weui-btn_warn" href="signup">下一步</a>
                </div>
            </div>
        )
    }
}
//<Link to={{ pathname: `/home/signup/${id}`, query:{type: `${type}` } }}  className="weui-btn weui-btn_warn">下一步</Link>
//https://github.com/ShanZiJun/react_begin/blob/Login_test/src/components/Singup/Singup.jsx
//http://blog.csdn.net/wustzbq0713/article/details/51397310
export default connect(
   state => ({
       item : state.item
   }),
   dispatch => ({
       itemActions: bindActionCreators(itemActions, dispatch)
   })
)(HomeEnroll)
