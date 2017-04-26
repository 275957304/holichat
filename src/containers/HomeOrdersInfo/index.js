import React, {Component, PropTypes} from 'react'
import { Link } from 'react-router'
import './style.less'
import { NavBar, ActivityIndicator, Icon, Modal } from 'antd-mobile';
import { getAddress } from '../../utils/address/'
import { httpRequest } from '../../api/'
/*
URL参数说明
#/home/info/100814?type=event&enroll=116973
100814 是指项目id
type 是指类别
enroll 报名id
*/

class OrdersInfo extends Component {
    static contextTypes = {
         router: PropTypes.object.isRequired
    }
    constructor(props){
        super(props);
        this.id = 0;
        this.types = 'event';
        this.introduction_url = '';
        this.introduction_params = {};
        this.order_url = "";
        this.order_params = {};
        this.state = {
            visible : true,
            order_loading : true,
            order_info : {},
            introduc_loading : true,
            introduction : {},
        }
    }
    componentWillMount(){
        //是否来源城市服务
        if( window.sessionStorage.getItem("source") == 'wxcity'){
            this.setState({visible: false});
        }
        const { params, itemActions } = this.props;
        this.id = params.id;
        const types = this.types = this.props.location.query.type;
        const enroll = this.props.location.query.enroll;
        if(types == 'activity'){
            this.introduction_url = 'get_activity_introduction';
            this.introduction_params = {'activity_id':params.id};
            this.order_url = "get_activity_eroll_order_info";
            this.order_params = {'activity_enroll_id':enroll};
        }else if(types == 'event'){
            this.introduction_url = 'get_competition_introduction';
            this.introduction_params = {'event_id':params.id};
            this.order_url = "get_eroll_order_info";
            this.order_params = {'event_enroll_id':enroll};
        }else if(types == 'training'){
            this.introduction_url = 'get_training_introduction';
            this.introduction_params = {'training_id':params.id};
            this.order_url = "get_training_eroll_order_info";
            this.order_params = {'training_enroll_id':enroll};
        }
	}
    componentDidMount() {
        // 赛事-活动-培训 项目详情
        httpRequest(this.introduction_url,this.introduction_params).then(function(data){
            this.setState({
                introduc_loading : false,
                introduction : data
            })
        }.bind(this))
        //订单详情
        httpRequest(this.order_url,this.order_params).then(function(data){
            this.setState({
                order_loading : false,
                order_info : data
            })
        }.bind(this))

        //获取openid
        httpRequest("get_user_info",{}).then((data) => {
            if(data.wx_openid){
                const openid = data.wx_openid;
                //微信订阅
                httpRequest('wx_subscribe',{'openid':openid}).then( (data) => {
                    if(data.subscribe == 1){
                        this.setState({visible: false});
                    }
                })
            }
        });

    }
    onClose(){
        this.setState({visible: false});
    }
    render(){
        console.log(this.state)
        const brief = this.state.introduction;
        if(!this.state.order_loading && !this.state.introduc_loading){
            return(
                <div className="wx_order_info">
                    <NavBar mode="light" onLeftClick={() => this.context.router.goBack()}>报名信息</NavBar>
                    <div className="order_info_main">
                        <h1 className="title">{brief.title}</h1>
                        <div className="rwm_img">
                            <img src={`http://pan.baidu.com/share/qrcode?w=300&h=300&url=${this.state.order_info.code}`} />
                            <p className="code">号码：{this.state.order_info.code}</p>
                        </div>
                        <div className="info_tit">活动详情</div>
                        <ul className="info_list">
                            <li><span><Icon type="environment-o" /> 地点： </span>{getAddress(brief.region_id).join('')}{brief.address}</li>
                            <li><span><Icon type="clock-circle-o" /> 时间： </span>{(brief.begin_date).substr(0,16)} ~ {(brief.end_date).substr(0,16)}</li>
                        </ul>
                        <div className="foot_btn">
                            <Link to={{ pathname: `/home/details/${this.id}`, query:{type: `${this.types}` } }}  className="info_btn">更多详情</Link>
                        </div>
                    </div>

                    <Modal onClose={this.onClose.bind(this)} transparent visible={this.state.visible} footer={[{ text: '确定', onPress: () => { console.log('ok'); this.onClose(); } }]}>
                        <div className="modal-demo-content">
                            <div className="demo-title">关注公众号了解最新赛事信息</div>
                            <div className="demo-image"><img src="http://m.holichat.com/dist/img/rwm.jpg" alt="活力圈" /></div>
                            <div className="demo-content">长按二维码关注活力圈公众号</div>
                        </div>
                    </Modal>

                </div>
            )
        }
        return <div className="loading"><NavBar mode="light" onLeftClick={() => this.context.router.goBack()}>报名信息</NavBar><ActivityIndicator text="加载中..."/></div>
    }
}

export default OrdersInfo
