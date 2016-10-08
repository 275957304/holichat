import React, { Component, PropTypes } from 'react'
import { Tabs } from 'antd';
import 'antd/lib/tabs/style/index.css';
const TabPane = Tabs.TabPane;

function callback(key) {
	console.log(key);
}
class TabsList extends Component {
	
	render() {
		return (
			<div className="index_tabs">
				<Tabs defaultActiveKey="3" onChange={callback}>
					<TabPane tab="主页" key="1">主页 内容</TabPane>
					<TabPane tab="活动" key="2">活动 内容</TabPane>
					<TabPane tab="赛事" key="3">赛事 内容</TabPane>
					<TabPane tab="培训" key="4">培训 内容</TabPane>
					<TabPane tab="相册" key="5">相册 内容</TabPane>
					<TabPane tab="资讯" key="6">资讯 内容</TabPane>
					<TabPane tab="场馆" key="7">场馆 内容</TabPane>
				</Tabs>
			</div>
		)
	}
}

export default TabsList
