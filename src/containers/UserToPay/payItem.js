import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router';
import './style.less'
import { ActivityIndicator} from 'antd-mobile';
import { httpRequest, getImageUrlPath } from '../../api/'

/*
需要传入
type 类型
id 项目id
enroll_id  报名id
order 订单号
predpare 预报名
*/

class PayItem extends Component {
	constructor(props){
		super(props)
        this.url = ''
        this.params = {};
        this.types = '';
        this.state = {
            loading : true,
            order_no :'',
            sum_amount :'',
        }
	}
    //   `phone=${phone}&pwd=${md5(pwd)}&device=''&platform=weixin&channel=5000`
    componentWillMount(){
		console.log(this.props)
        const enroll_id = this.props.enroll_id
        switch (this.props.enroll_type.toUpperCase()) {
            case 'A': this.types = 'activity'; this.url = 'select_activity_enroll'; this.params = `activity_enroll_id_params=[${enroll_id}]`; break;  //这里传值要修改
            case 'E': this.types = 'event'; this.url = 'select_competition_enroll'; this.params = `event_enroll_id_params=[${enroll_id}]`; break;
            case 'T': this.types = 'training'; this.url = 'select_training_enroll'; this.params = `training_enroll_id_params=[${enroll_id}]`;  break;
        }
    }
    componentDidMount(){
        //选择赛事支付  select_competition_enroll
        httpRequest( this.url , this.params).then(function(data){
			//获取订单号
            this.setState({
                loading : false,
                order_no : data.order_no,
                sum_amount :data.sum_amount,
            })
        }.bind(this))

        //  'event/view/get_enroll_info', // 赛事报名表信息   判断是否预报名

    }
	render(){
        //console.log(this.props)
        if(this.state.loading){
            return <div className="list_link"><ActivityIndicator  animating  /></div>
        }
		return(
            <Link to={{ pathname: `/pay/${this.props.org_act_id}`, query:{ type: `${this.types}`, enroll: `${this.props.enroll_id}`, order: `${this.state.order_no}` , amount: `${this.state.sum_amount}` } }} className="list_link">
                <div className="box_hd">
                    <div className="img_hd"><img src={`${getImageUrlPath(this.props.logo_image)}@150h_150w_1e_1c_10-2ci`} alt={this.props.title}/></div>
                    <div className="flex_hd">
                        <div className="line2">{this.props.title}</div>
                        <div className="dose">
                            <span className="t_green">￥{this.props.enroll_amount}</span>
                            <div className="pull-right t_green">{this.props.paystate}</div>
                        </div>
                    </div>
                </div>
            </Link>
        )
	}
}
export default PayItem
