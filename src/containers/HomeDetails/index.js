import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as itemActions from '../../reducers/modules/item/action'
import Header from '../../components/Header/'
import './detail.less'

import Tabs from '../../components/Tabs/'
import { Spin } from 'antd';
import 'antd/lib/spin/style/index.less';
import Introduction from './Introduction'
import Details from './Details'
import Result from './Result'
import Theme from './Theme'

class HomeDetails extends Component {
    constructor(props){
        super(props);
        this.state = {type : '', id : 0}
        this.activeIndex = this.activeIndex.bind(this);
    }
    componentDidMount() {
        const { params, itemActions } = this.props;
        const types = this.props.location.query.type;
        //设置属性与id
        this.setState({type: types, id: params.id})
        //获取简介信息
        if(types == 'activity'){
            itemActions.get_activity_introduction({'activity_id':params.id})
        }else if(types == 'event'){
            itemActions.get_competition_introduction({'event_id':params.id})
        }else if(types == 'training'){
            itemActions.get_training_introduction({'training_id':params.id})
        }

    }
    activeIndex(index){
        const type = this.state.type
        const id = this.state.id
        const { itemActions } = this.props;
		if(index === 2 && (type == 'activity')){
            itemActions.get_activity_result({'activity_id':id})
        }else if(index === 2 && (type == 'event')){
            itemActions.get_competition_result({'event_id':id})
        }else if(index === 2 && (type == 'training')){
            itemActions.get_training_result({'training_id':id})
        }

        if(index === 3){
            console.log('请调精彩瞬间接口')
        }

    }
    render(){
        const { item , location } = this.props;
        const type = location.query.type;
        console.log(item)
        if(!item.loading){
            return(
                <div className="event_detail">
                    <Header title="赛事" leftTo="fanhui" />
                    <Tabs activeIndex={ this.activeIndex } >
                        <div name="简介">
                            <Introduction type={type}  data={item.brief} />
                        </div>
                        <div name="详情">
                            <Details data={item.brief.content} />
                        </div>
                        <div name="成绩">
                            {item.result == '' ? '没有内容' : <Result data={item.result} />}
                        </div>
                        <div name="精彩瞬间">
                            <Theme />
                        </div>
                    </Tabs>
                </div>
            )
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
)(HomeDetails)
