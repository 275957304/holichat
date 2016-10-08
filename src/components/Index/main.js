import React, { Component, PropTypes } from 'react'

class Main extends Component {
	constructor(props) {
        super(props)
		this.groupChat = this.groupChat.bind(this);
		this.attention = this.attention.bind(this);
		this.checkIn   = this.checkIn.bind(this);
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
	render() {
	// console.log(this.props)
		return (
			<div className="wx_main">
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
			</div>
		)
	}
}


export default Main
