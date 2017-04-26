import React, { Component, PropTypes } from 'react'
import { List, InputItem , Toast, Icon } from 'antd-mobile';
import { httpRequest } from '../../api/'
export default class Coupon extends Component{
	constructor(props) {
		super(props);
		this.state = {
			disabled : false,
			icon : '',
			color : ''
		}
	}
	coupon(code){
		if(code !=''){
			const { type, id } = this.props;
			let url = '';
			let param = {};
			if(type == 'activity'){
				url = "get_activity_coupon_info";
				param = {"code":code, "activity_id": id}
	        }else if(type == 'event'){
				url = "get_event_coupon_info";
				param = {"code":code, "event_id": id}
	        }else if(type == 'training'){
				url = "get_training_coupon_info";
				param = {"code":code, "training_id": id}
	        }
			httpRequest(url, param).then(
				(data) => {
					console.log(data)
					if( data.remain_qty > 0 ){
						this.props.code(code);
						this.setState({disabled:true,icon:'check',color : 'green'})
						return false
					}
					this.setState({icon:'cross',color : 'red'})
				}
			);
		}
	}
	render(){
		return (
			<div style={{marginTop:20}}>
				<List>
					<InputItem placeholder="请输入优惠码" type="number" extra={<b className={this.state.color}><Icon type={this.state.icon}/></b>} disabled={this.state.disabled} onBlur={this.coupon.bind(this)}>优惠码</InputItem>
				</List>
			</div>
		)
	}
}
