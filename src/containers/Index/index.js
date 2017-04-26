import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as quanziActions from '../../reducers/modules/quanzi/action'
import Menu from '../../components/Menu/'
import Slider from '../../components/Slider/'
import './index.less'
import {ActivityIndicator , Tabs, NavBar, Icon } from 'antd-mobile';
const TabPane = Tabs.TabPane;

class Index extends Component {
    static contextTypes = {
         router: PropTypes.object.isRequired
    }
    constructor(props) {
        super(props)
		// this.groupChat = this.groupChat.bind(this);
		// this.attention = this.attention.bind(this);
		// this.checkIn   = this.checkIn.bind(this);
    }
    componentWillMount(){
        const { quanziActions, dispatch } = this.props
        quanziActions.get_community_banner();
        quanziActions.set_home_community({home_cid:5});
	}
    render(){
        const { quanzi } = this.props;
        //console.log(this.props)
        return(
            <div className="wx_index">
                <NavBar mode="light" onLeftClick={() => this.context.router.goBack()}>活力圈</NavBar>
                {quanzi.banner.is_banner ? <Slider autoplay={false} items={quanzi.banner.list} /> : <ActivityIndicator text="加载中..." /> }
                <div className="index-tabs">
                    <Tabs swipeable="true" defaultActiveKey="1" >
                        <TabPane tab="选项卡一" key="1">
                            选项卡一内容
                        </TabPane>
                        <TabPane tab="选项卡二" key="2">
                            选项卡二内容
                        </TabPane>
                        <TabPane tab="选项卡三" key="3">
                            选项卡三内容
                        </TabPane>
                        <TabPane tab="选项卡四" key="4">
                            选项卡一内容
                        </TabPane>
                        <TabPane tab="选项卡六" key="5">
                            选项卡一内容
                        </TabPane>
                        <TabPane tab="选项卡d" key="6">
                            选项卡一内容fdsfdsfds
                        </TabPane>
                    </Tabs>
    			</div>
                <Menu tab="index" />
            </div>
        )
    }
}

export default connect(
   state => ({
       quanzi : state.quanzi
   }),
   dispatch => ({
       quanziActions: bindActionCreators(quanziActions, dispatch)
   })
)(Index)
