import React, {Component, PropTypes} from 'react'
import { message } from 'antd';
import 'antd/lib/message/style/index.less';
class BtnSate extends Component {
	propTypes: {
		type: PropTypes.string.isRequired,
		begin_date: PropTypes.string.isRequired,
		deadline: PropTypes.string.isRequired,
		end_date: PropTypes.string.isRequired,
		signline: PropTypes.string.isRequired,
	}
	constructor(props) {
        super(props)
		this.handleClick = this.handleClick.bind(this);
    }
	handleClick(txt){
		message.config({top: 200,duration: 2,})
		message.warning(txt)
	}
	render(){
		const {type, begin_date, deadline, end_date, signline} = this.props
		const today = new Date().getTime();
		let signlineDate = signline.substring(0,10).split('-');
		let deadlineDate = deadline.substring(0,10).split('-');
		let beginDate = begin_date.substring(0,10).split('-');
		let endDate = end_date.substring(0,10).split('-');
		signlineDate = signlineDate[1] + '/' + signlineDate[2] + '/' + signlineDate[0] + ' ' + signline.substring(10, 19);
		deadlineDate = deadlineDate[1] + '/' + deadlineDate[2] + '/' + deadlineDate[0] + ' ' + deadline.substring(10, 19);
		beginDate = beginDate[1] + '/' + beginDate[2] + '/' + beginDate[0] + ' ' + begin_date.substring(10, 19);
		endDate = endDate[1] + '/' + endDate[2] + '/' + endDate[0] + ' ' + deadlineDate.substring(10, 19);
		
		if(today < Date.parse(signlineDate)){
			return (<div onClick={()=>this.handleClick('预热中')} className="weui-btn weui-btn_disabled weui-btn_default">预热中</div>)
		}else if(today < Date.parse(deadlineDate)){
			return (<a href="javascript:;" className="weui-btn weui-btn_warn">我要报名</a>)
		}else if(today < Date.parse(beginDate)){
			return (<div onClick={()=>this.handleClick('即将开始')} className="weui-btn weui-btn_disabled weui-btn_default">即将开始</div>)
		}else if(today < Date.parse(endDate)){
			return (<div onClick={()=>this.handleClick('报名已结束')} className="weui-btn weui-btn_disabled weui-btn_default">报名已结束</div>)
		}else{
			return (<div onClick={()=>this.handleClick('报名已结束')} className="weui-btn weui-btn_disabled weui-btn_default">报名已结束</div>)
		}

	}
}
export default BtnSate
