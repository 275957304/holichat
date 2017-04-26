import React, {Component, PropTypes} from 'react'
import { Icon } from 'antd-mobile';
import { getImageUrlPath } from '../../api/'
import { getCurrentStatus } from '../../utils/'
import { getAddress } from '../../utils/address/'

let OtherInfo = React.createClass({
	render(){
		const info = this.props.info;
		const contractor = info.contractor ? <p>承办方：{info.contractor}</p> : '';
		const co_organizer = info.co_organizer ? <p>协办方：{info.co_organizer}</p> : '';
		const sponsor = info.sponsor ? <p>赞助单位：{info.sponsor}</p> : '';
		const longs = [{content:"自定义项",title:"哈只整个"}];
		if(info != ''){
			return (
				<div className="weui_media_desc intr_info">
					<p>主办单位：{info.organizer}</p>
					{contractor}
					{co_organizer}
					{sponsor}
				</div>
			)
		}
	}
});

let ContactItem = React.createClass({
	render(){
		const info = this.props.info;
		const wx = info.contact_wx ? <p>联系人微信：{info.contact_wx}</p> : '';
		const mail = info.contact_mail ? <p>联系人微信：{info.contact_mail}</p> : '';
		if(info != ''){
			return (
				<div className="weui_media_desc intr_info">
					<p>联系人：{info.contact_name}</p>
					<p>联系电话：{info.contact_tel}</p>
					{wx}{mail}
				</div>
			);
		}
	}
});

class Introduction extends Component {
	static propTypes = {
        type: PropTypes.string.isRequired,
        data: PropTypes.object.isRequired
    }
	constructor(props) {
        super(props);
		this.height = document.body.clientHeight - 120
    }
	render(){
		const brief = this.props.data
		const other = JSON.parse(brief.other_info)
		const begin_date = brief.begin_date.substring(0,10)
		const end_date = brief.end_date.substring(0,10)
		return(
			<div style={{height:this.height}} className="brief_area">
				<div className="weui-cells">
					<div className="weui-media-box weui-media-box_appmsg">
						<div className="weui-media-box__hd">
							<img className="weui-media-box__thumb" src={`${getImageUrlPath(brief.logo_image)}@150h_150w_1e_1c_10-2ci`} alt=""/>
						</div>
						<div className="weui-media-box__bd">
							<h4 className="weui-media-box__title">{brief.title}</h4>
							<div className="weui_media_desc">
								<div className="pull-right" dangerouslySetInnerHTML={{__html: `${getCurrentStatus(brief.signline,brief.deadline,brief.begin_date,brief.end_date)}`}} />
								<span className="red">¥ {brief.cost} 元起</span>
							</div>
						</div>
					</div>
				</div>
				<div className="weui-cells">
					<div className="weui-media-box weui-media-box_text">
						<h4 className="weui-media-box__title"><Icon type="file-text" /> 简介</h4>
						<div className="weui_media_desc intr_info">{brief.about}</div>
					</div>
				</div>
				<div className="weui-cells">
					<div className="weui-media-box weui-media-box_text">
						<h4 className="weui-media-box__title"><Icon type="solution" /> 组织方</h4>
						<OtherInfo info={other} />
					</div>
					<div className="weui-media-box weui-media-box_text">
						<h4 className="weui-media-box__title"><Icon type="clock-circle-o" /> 时间</h4>
						<div className="weui_media_desc intr_info">
							<p>报名时间：{brief.signline} 至 {brief.deadline}</p>
							<p>比赛时间：{begin_date} 至 {end_date}</p>
						</div>
					</div>
					<div className="weui-media-box weui-media-box_text">
						<h4 className="weui-media-box__title"><Icon type="environment-o" /> 地点</h4>
						<p className="weui_media_desc intr_info"> {getAddress(brief.region_id).join('')} {brief.address}</p>
					</div>
					<div className="weui-media-box weui-media-box_text">
						<h4 className="weui-media-box__title"><Icon type="phone" /> 联系方式</h4>
						<ContactItem info={other} />
					</div>
				</div>
			</div>
		)
	}
}
export default Introduction
