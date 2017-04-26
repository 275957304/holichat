import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router';
import { Modal, NavBar, List, Button, Toast, Checkbox } from 'antd-mobile';
const CheckboxItem = Checkbox.CheckboxItem;
const alert = Modal.alert;
const Item = List.Item;
const AgreeItem = Checkbox.AgreeItem;
import './style.css'
import wxicon from '../../images/pay/wx.jpg'
import { httpRequest } from '../../api/'
/*
需要传入
type 类型
id 项目id
enroll_id  报名id
order 订单号
predpare  是否预报名
amount : 价格
*/
class Pay extends Component {
    static contextTypes = {
        router: PropTypes.object.isRequired
    }
    constructor(props){
        super(props);
        this.type = '';
        this.id = '';
        this.enroll = '';
        this.predpare = '';
        this.state = {
            isPay : true
        }
    }
    back(){
        alert('是否放弃支付', '放弃后您可以在“我的未支付”中继续支付未支付的订单', [
            { text: '放弃', onPress: () => this.context.router.goBack() },
            { text: '取消'},
        ]);
    }
    componentWillMount(){
        const {enroll, predpare, type } = this.props.location.query
        this.type = type;
        this.predpare = predpare;
        this.enroll = enroll;
        this.id = this.props.params.id;
        console.log(this.props)
    }
    unifiedorder(openid){
        // 微信支付接口
        const order = this.props.location.query.order;
        const param = `openid=${openid}&order=${order}&body=报名成功&type=mp`;
        httpRequest("wx_unifiedorder", param).then((data) => {
            Toast.hide()
            console.log(data);
            const nonce_str = data.nonce_str;
            const prepay_id = data.prepay_id;
            const sign = data.sign;
            const time = data.time.toString();
            wx.ready(() => {
                wx.chooseWXPay({
    				timestamp: time, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
    				nonceStr: nonce_str, // 支付签名随机串，不长于 32 位
    				package:'prepay_id=' + prepay_id , // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
    				signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
    				paySign: sign, // 支付签名
    				success: res => {
                        if(this.predpare != '0'){
							this.context.router.push({pathname: '/user/payed'});
						}
                        this.context.router.push({pathname: '/home/info/' + this.id, query: {'type': this.type,'enroll': this.enroll }});
                    }
    			});
                wx.error( res => {
                    alert('微信支付失败' + res)
                });
    			//wx.hideOptionMenu();
            });
        })
    }
    pay(){
        if(!this.state.isPay){
            Toast.info('请选择免责声明',2);
            return false
        }
        if("micromessenger" != navigator.userAgent.toLowerCase().match(/MicroMessenger/i)){
            Toast.info('请微信中操作!!!',2);
            return false;
        }
        Toast.loading('加载中...',0);
        //获取openid
        httpRequest("get_user_info",{}).then(function(data){
            if(data.wx_openid){
                this.unifiedorder(data.wx_openid)
            }
        }.bind(this))
    }
    disclaimer(){
        this.setState({isPay:!this.state.isPay})
    }
    render(){
        const query = this.props.location.query;
        const amount = "￥" + query.amount;
        return(
            <div className="pay">
				<NavBar mode="light" onLeftClick={() => this.back()}>订单支付</NavBar>
                <List renderHeader={() => '订单编号:'+ query.order }>
                    <Item thumb={wxicon} extra={amount}>微信支付</Item>
                </List>
                <AgreeItem data-seed="logId" defaultChecked onChange={this.disclaimer.bind(this)}>
                    我已阅读并同意<a href="http://m.holichat.com/disclaimer.html">《免责声明》</a>
                </AgreeItem>
                <div className="footer_fixed-bottom">
                    <Button className="btn_warn" type="ghost" onClick={this.pay.bind(this)}>去支付</Button>
                </div>
            </div>
        )
    }
}
export default Pay
