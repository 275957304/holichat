import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as itemActions from '../../reducers/modules/item/action'
import Header from '../../components/Header/'
import './detail.less'


import EventDetails from '../../components/EventDetails/'
import { Spin } from 'antd';
import 'antd/lib/spin/style/index.less';

class EventDetail extends Component {
    constructor(props){
        super(props)
    }
    componentDidMount() {
        const {params, itemActions} = this.props;
        const param = {'event_id': params.id }
        //获取赛事简介信息
        itemActions.getBrief(param);
    }
    render(){
        const {item} = this.props;
        if(!item.loading){
            console.log(item)
            return <div className="event_detail"><Header title="赛事" leftTo="fanhui" /> <EventDetails type="event" data={item.brief} /></div>
        }
        return <Spin size="large" spinning={item.loading}></Spin>
    }
}

export default connect(
   state => ({
       item : state.item
   }),
   dispatch => ({
       itemActions: bindActionCreators(itemActions, dispatch)
   })
)(EventDetail)
