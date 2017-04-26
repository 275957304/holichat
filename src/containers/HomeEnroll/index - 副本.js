import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as itemActions from '../../reducers/modules/item/action'
import './style.less'
import { NavBar , ActivityIndicator, List, Toast} from 'antd-mobile';
import EnrollItem from './Item'
class HomeEnroll extends Component {
    constructor(props){
        super(props);
        this.types = this.props.location.query.type;
        this.state = {
            loading:true,
            selectEnroll : {}
        };
        this.submitHandler = this.submitHandler.bind(this)
    }
    componentDidMount() {
        const { params, itemActions } = this.props;
        //获取组别信息
        if(this.types == 'activity'){
            itemActions.get_activity_enroll_info({'activity_id':params.id})
        }else if(this.types == 'event'){
            itemActions.get_competition_enroll_info({'event_id':params.id})
        }else if(this.types == 'training'){
            itemActions.get_training_enroll_info({'training_id':params.id})
        }

    }
    componentWillReceiveProps(nextProps){
        this.setState({loading:nextProps.item.enroll.loading})
    }
    handleCheck(data){
        this.setState({selectEnroll:  Object.assign({}, this.state.selectEnroll,data) })
    }
    enrollCheck(info){
        console.log("去做项目是否存在接口")
        console.log(info)
    }
    submitHandler(e){
        //console.log(this.state.selectEnroll) //所有选中元素的状态
        e.preventDefault();
        const { params, itemActions } = this.props;
        const allEnroll = this.props.item.enroll.data;
        let seleEnroll = [] //选中元素
        for(let item in this.state.selectEnroll){
            if(this.state.selectEnroll[item]){
                seleEnroll.push(item)
            }
        }
        if(seleEnroll.length<1) return Toast.info('请选择组别',1.5);
        //判断是否有预报名
        seleEnroll.map( id => {
            allEnroll.map((item) => {
                item.group.map((val) => {
                    if( val.id == id ){
                        const info = {
                            id : val.id,
                            project_id : val.activity_project_id || val.event_project_id || val.training_project_id,
                            group_id : val.activity_id || val.event_id || val.training_id
                        }
                        if(val.prepare_enroll !=0 ){
                            if(window.confirm(`您选择的( ${item.title} - ${val.title} )已开启预报名，需要主办方审核通过后才能成功报名，若审核不通过，将退还报名费用`)){
                                //console.log(seleEnroll)
                                this.enrollCheck(info)
                            }
                        }else{
                            //不是预报名
                            this.enrollCheck(info)
                        }
                    }
                })
            })
        })
        //赛事报名检测
        // if(this.types == 'activity'){
        //     itemActions.aaaaa({'activity_id':params.id})
        // }else if(this.types == 'event'){
        //     itemActions.check_competition_enroll({'event_id':params.id,'project_id':project,'group_id':group.id})
        // }else if(this.types == 'training'){
        //     itemActions.aaaa({'training_id':params.id})
        // }


        //console.log(this.props)这里去判断是那个项目的分项

        // inputValue = React.findDOMNode(this.refs.input).value
        // http://www.tuicool.com/articles/yIziUzf
        //http://react-china.org/t/react/1284/8
        // 表单验证http://react-china.org/t/guan-yu-biao-dan-yan-zheng-zi-dong-hua/795
        //100809

        //console.log(this.state.selectEnroll)
    }

    render(){
        const { item } = this.props
        const enroll = item.enroll

        if(this.state.loading){
            return <div><NavBar mode="light" onLeftClick={() => this.props.history.goBack()}>组别选择</NavBar><br/><br/><br/><div className="loading"><ActivityIndicator text="加载中..."/></div></div>
        }
        let list = enroll.data.map(function(item,index){
                return <EnrollItem key={index} type={this.types} title={item.title} data={item.group}  handleCheck={this.handleCheck.bind(this)} />
        }.bind(this));
        return (
            <div className="enroll_item">
                <NavBar mode="light" onLeftClick={() => this.props.history.goBack()}>组别选择</NavBar>
                <form onSubmit={this.submitHandler}>
                    <div className="weui-cells weui-cells_checkbox">
                        {list}
                    </div>
                    <div className="footer_fixed-bottom">
                        <button className="am-button btn_warn" type="submit">下一步</button>
                    </div>
                </form>
            </div>
        )
    }
}
HomeEnroll.contextTypes = {
    router: PropTypes.object.isRequired
};
// to={{ pathname: `/home/enroll/${id}`, query:{type: `${type}` } }}
export default connect(
   state => ({
       item : state.item
   }),
   dispatch => ({
       itemActions: bindActionCreators(itemActions, dispatch)
   })
)(HomeEnroll)
