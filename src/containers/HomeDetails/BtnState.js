import React, {Component, PropTypes} from 'react'
import { Link } from 'react-router'
import { Button,Toast } from 'antd-mobile';
import { lastTime } from '../../utils/'
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
    }
	handleClick(txt){
		Toast.info(txt,1.5);
	}
	signUp(){
		this.props.isApply()
	}
	render(){
		const {type, id , begin_date, deadline, end_date, signline} = this.props
		const today = new Date().getTime();
		let signlineDate = signline.substring(0,10).split('-');
		let deadlineDate = deadline.substring(0,10).split('-');
		let beginDate = begin_date.substring(0,10).split('-');
		let endDate = end_date.substring(0,10).split('-');
		signlineDate = signlineDate[1] + '/' + signlineDate[2] + '/' + signlineDate[0] + ' ' + signline.substring(10, 19);
		deadlineDate = deadlineDate[1] + '/' + deadlineDate[2] + '/' + deadlineDate[0] + ' ' + deadline.substring(10, 19);
		beginDate = beginDate[1] + '/' + beginDate[2] + '/' + beginDate[0] + ' ' + begin_date.substring(10, 19);
		endDate = endDate[1] + '/' + endDate[2] + '/' + endDate[0] + ' ' + deadlineDate.substring(10, 19);
		const differ = Date.parse(deadlineDate) - today;
		if(today < Date.parse(signlineDate)){
			return (<Button data-seed="logId" className="btn_default" onClick={ () => this.handleClick('预热中')}>预热中</Button>)
		}else if(today < Date.parse(deadlineDate)){
			return (<Button onClick={this.signUp.bind(this)} className="am-button btn_warn">我要报名 <span style={{fontSize:13,marginLeft:5}}>{lastTime(differ)}</span></Button>)
			//return (<Link to={{ pathname: `/home/enroll/${id}`, query:{type: `${type}` } }}  className="am-button btn_warn">我要报名 <span style={{fontSize:13,marginLeft:5}}>{lastTime(differ)}</span></Link>)
		}else if(today < Date.parse(beginDate)){
			return (<Button data-seed="logId" onClick={ () => this.handleClick('即将开始')}>即将开始</Button>)
		}else if(today < Date.parse(endDate)){
			return (<Button data-seed="logId" onClick={ () => this.handleClick('报名已结束')}>报名已结束</Button>)
		}else{
			return (<Button data-seed="logId" onClick={ () => this.handleClick('报名已结束')}>报名已结束</Button>)
		}

	}
}
export default BtnSate
