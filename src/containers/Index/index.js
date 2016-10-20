import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as quanziActions from '../../reducers/modules/quanzi/action'
import Header from '../../components/Header/'
import Slider from '../../components/Slider/'
import './index.less'

import { Tabs } from 'antd';
import 'antd/lib/tabs/style/index.less';
const TabPane = Tabs.TabPane;
class Index extends Component {
    constructor(props) {
        super(props)
		this.groupChat = this.groupChat.bind(this);
		this.attention = this.attention.bind(this);
		this.checkIn   = this.checkIn.bind(this);
    }
    componentWillMount(){
        const { quanziActions, dispatch } = this.props
        quanziActions.get_community_banner()
	}
	groupChat(){
		console.log('群聊')
	}
	attention(){
		console.log('已关注')
	}
	checkIn(){
		console.log('签到')
	}
    callback(key){
        console.log(key);
    }
    render(){
        const { quanzi } = this.props;
        return(
            <div className="wx_index">
                <Header title="活力圈" leftTo="quanzi" />
                {quanzi.banner.is_banner ? <Slider autoplay={false} items={quanzi.banner.list} /> : ""}


                <div className="weui-panel__bd">
					<div className="weui-media-box weui-media-box_appmsg">
						<div className="weui-media__hd">
							<img className="weui-media__thumb img_rounded" width="40" src="http://m.holichat.com/dist/img/icon_152.png" alt="" />
						</div>
						<div className="weui-media__bd">
							<h4 className="weui-media__title">活力圈</h4>
							<div className="wx_main_btn">
								<button className="weui-btn weui-btn_mini green_btn" onClick={this.groupChat}>群聊</button>
								<button className="weui-btn weui-btn_mini blue_btn" onClick={this.attention}>已关注</button>
								<button className="weui-btn weui-btn_mini pink_btn" onClick={this.checkIn}>签到</button>
							</div>
						</div>
					</div>
				</div>
				<div className="weui-panel__ft">
					<a href="javascript:void(0);" className="weui-cell weui-cell_access weui-cell_link">
					<div className="weui-cell__hd"><span className="bulletin">公告：</span></div>
					<div className="weui-cell__bd">欢迎加入活力圈</div>
					<div className="weui-cell__ft f12">2016-09-22</div>
					</a>
				</div>
                <div className="index_tabs">
    				<Tabs defaultActiveKey="3" onChange={this.callback}>
    					<TabPane tab="主页" key="1">主页 内容</TabPane>
    					<TabPane tab="活动" key="2">活动 内容</TabPane>
    					<TabPane tab="赛事" key="3">赛事 内容</TabPane>
    					<TabPane tab="培训" key="4">培训 内容</TabPane>
    					<TabPane tab="相册" key="5">相册 内容</TabPane>
    					<TabPane tab="资讯" key="6">资讯 内容</TabPane>
    					<TabPane tab="场馆" key="7">场馆 内容</TabPane>
    				</Tabs>
    			</div>
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
