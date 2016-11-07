import React, {Component, PropTypes} from 'react'
import './style.less'

import EventTabs from '../EventTabs/'
import BtnSate from './btn_state'
import { Icon } from 'antd';
import { getImageUrlPath } from '../../api/'
import { getAddress } from '../../utils/address/'

let OtherInfo = React.createClass({
	render(){
		const info = this.props.info;
		const contractor = info.contractor ? <p>承办方：{info.contractor}</p> : '';
		const co_organizer = info.co_organizer ? <p>协办方：{info.co_organizer}</p> : '';
		const sponsor = info.sponsor ? <p>赞助单位：{info.sponsor}</p> : '';
		const longs = [{content:"自定义项",title:"哈只整个"}];
		return (
			<div className="weui_media_desc">
				<p>主办单位：{info.organizer}</p>
				{contractor}
				{co_organizer}
				{sponsor}
			</div>
		);
	}
});

let ContactItem = React.createClass({
	render(){
		const info = this.props.info;
		const wx = info.contact_wx ? <p>联系人微信：{info.contact_wx}</p> : '';
		const mail = info.contact_mail ? <p>联系人微信：{info.contact_mail}</p> : '';
		return (
			<div className="weui_media_desc">
				<p>联系人：{info.contact_name}</p>
				<p>联系电话：{info.contact_tel}</p>
				{wx}{mail}
			</div>
		);
	}
});

class EventDetails extends Component {
	propTypes: {
		data: PropTypes.object.isRequired
	}
	constructor(props) {
        super(props)
    }
    // componentWillMount(){
	// 	console.log(this.props)
	// }
	render(){
		const brief = this.props.data
		const other = JSON.parse(brief.other_info)
		const begin_date = brief.begin_date.substring(0,10)
		const end_date = brief.end_date.substring(0,10)
		//console.log(this.props)
		return(
			<div className="event_details">
				<EventTabs>
					<div name="简介">
						<div className="brief_area">
						<div className="weui-cells weui-media-box weui-media-box_appmsg mt0">
							<div className="weui-media-box__hd">
								<img className="weui-media-box__thumb" src={`${getImageUrlPath(brief.logo_image)}@150h_150w_1e_1c_10-2ci`} alt=""/>
							</div>
							<div className="weui-media-box__bd">
								<h4 className="weui-media-box__title">{brief.title}</h4>
								<div className="weui_media_desc">
									<div className="pull-right">报名中</div>
									<span className="red">¥ {brief.cost} 元起</span>
								</div>
								<p className="weui-media-box__desc">按钮</p>
							</div>
						</div>

						<div className="weui-cells">
							<div className="weui-media-box weui-media-box_text">
								<h4 className="weui-media-box__title"><Icon type="file-text" /> 简介</h4>
								<p className="weui_media_desc">{brief.about}</p>
							</div>
						</div>

						<div className="weui-cells">
							<div className="weui-media-box weui-media-box_text">
								<h4 className="weui-media-box__title host-icon"><Icon type="solution" /> 组织方</h4>
								<OtherInfo info={other} />
							</div>
							<div className="weui-media-box weui-media-box_text">
								<h4 className="weui-media-box__title host-icon"><Icon type="clock-circle-o" /> 时间</h4>
								<div className="weui_media_desc">
									<p>报名时间：{brief.signline} 至 {brief.deadline}</p>
									<p>比赛时间：{begin_date} 至 {end_date}</p>
								</div>
							</div>
							<div className="weui-media-box weui-media-box_text">
								<h4 className="weui-media-box__title host-icon"><Icon type="environment-o" /> 地点</h4>
								<p className="weui_media_desc"> {getAddress(brief.region_id)} {brief.address}</p>
							</div>
							<div className="weui-media-box weui-media-box_text">
								<h4 className="weui-media-box__title host-icon"><Icon type="phone" /> 联系方式</h4>
								<ContactItem info={other} />
							</div>
						</div>

						<div className="weui-footer_fixed-bottom">
							<BtnSate type={this.props.type} begin_date={brief.begin_date} deadline={brief.deadline} end_date={brief.end_date} signline={brief.signline} />
						</div>

						</div>
					</div>
					<div name="详情">
						<div className="brief_content" dangerouslySetInnerHTML={{__html: `${brief.content}`}} />
					</div>
					<div name="成绩">
						成绩成绩成绩成绩成绩成绩成绩成绩
						<p>这是调那个接口呢</p>
					</div>
					<div name="精彩瞬间">
						精彩瞬间精彩瞬间精彩瞬间精彩瞬间精彩瞬间精彩瞬间
						<p>这是调那个接口呢</p>
					</div>
				</EventTabs>
			</div>
		)
	}
}
export default EventDetails
