import React, {Component, PropTypes} from 'react'
import {Link , History} from 'react-router';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as itemActions from '../../reducers/modules/item/action'
import bs64  from 'base64-js'
import './style.less'
import { NavBar , ActivityIndicator, Toast, Modal } from 'antd-mobile';
const alert = Modal.alert;
import EnrollItem from './Item'
import FormView from '../../components/Form/'
import { httpRequest } from '../../api/'
// console.log(bs64.btoa('javascript'))
// console.log(bs64.atob('amF2YXNjcmlwdA=='))
class HomeEnroll extends Component {
    static contextTypes = {
         router: PropTypes.object.isRequired
    }
    constructor(props){
        super(props);
        this.type = 'event';
        this.id = 0;
        this.predpare = 0;
        this.enrollChectUrl = ""; //赛事报名检测
        this.enrollChectId = "";
        this.checkboxs = [];
        this.state = {
            loading:true,
            check : false, //报名检查
            ispop : true, // 是否预报名
            reset : [], //表单提交返回重复
            ischeck : [], //项目报名以满
            coupon : '',
            selectEnroll : {}
        }
        this.submitHandler = this.submitHandler.bind(this)
    }
    componentWillMount(){
        this.type = this.props.location.query.type;
        this.id = this.props.params.id;
        //this.setState({type:this.props.location.query.type})
    }
    componentDidMount() {
        const { params, itemActions } = this.props;
        console.log(this.props)
        const id = params.id;
        const types = this.type;
        //获取组别信息
        if(types == 'activity'){
            itemActions.get_enroll_info('get_activity_enroll_info',{'activity_id':id});
            this.enrollChectId = 'activity_id';
            this.enrollChectUrl = 'check_activity_enroll';
        }else if(types == 'event'){
            itemActions.get_enroll_info('get_competition_enroll_info',{'event_id':id})
            this.enrollChectId = 'event_id';
            this.enrollChectUrl = 'check_competition_enroll';
        }else if(types == 'training'){
            itemActions.get_enroll_info('get_training_enroll_info',{'training_id':id})
            this.enrollChectId = 'training_id';
            this.enrollChectUrl = 'check_training_enroll';
        }
    }
    componentWillReceiveProps(nextProps){
        //是否完成组别加载 与 是否报名检测通过
        this.setState({
            loading : nextProps.item.enroll.loading,
            check : nextProps.item.check_enroll
        })
    }
    componentWillUnmount(){
        console.log('componentWillUnmount')
        this.enterBack()
        // this.context.router.setRouteLeaveHook(
        // this.props.route,
        // this.routerWillLeave
        // )
    }
    handleCheck(id){
        const isChec = this.checkboxs.indexOf(id)
        isChec<0 ? this.checkboxs.push(id) : this.checkboxs.splice(isChec,1)
        console.log('选择了项目id：' + this.checkboxs)
    }
    submitHandler(e){
        e.preventDefault();
        const seleEnroll = this.checkboxs;
        if(seleEnroll.length<1) return  Toast.info('请选择组别',1);
        const allEnroll = this.props.item.enroll.data;
        let groupInfo = [];
        let isPrepare = true;
        //判断是否有预报名
        this.setState({ ispop : true })
        seleEnroll.map( id => {
            allEnroll.map( item => {
                item.group.map( val => {
                    if( val.id == id ){
                        const info = {project_id : val.activity_project_id || val.event_project_id || val.training_project_id,group_id : val.id}
                        info[this.enrollChectId] = val.activity_id || val.event_id || val.training_id;
                        if(val.prepare_enroll !=0 && isPrepare){
                            this.predpare = val.prepare_enroll;
                            isPrepare = false;
                            this.setState({ ispop : false })
                            alert('预报名', `您选择的( ${item.title} - ${val.title} )已开启预报名，需要主办方审核通过后才能成功报名，若审核不通过，将退还报名费用`, [
                                {text:'取消', onPress: () => this.setState({ ispop : false }) },
                                {text:'确定', onPress: () => this.setState({ ispop : true }) }
                            ])
                        }
                        groupInfo.push(info)
                    }
                })
            })
        })

        // Promise.all 全部检测  赛事报名检测
        let promises = [];
        let checkarray = this.state.ischeck;
        //Toast.loading("检测所选项目是否可以报名")
        groupInfo.map( param => {
            promises.push(
                new Promise((resolve,reject)=>{
                    httpRequest(this.enrollChectUrl,param).then(
                        (data) =>{
                            if(data == ''){
                                resolve(data)
                            }else{
                                checkarray.push(param.group_id)
                                reject(data)
                            }
                        }
                    )
                })
            )
        });
        Promise.all(promises).then(
            (ok) => {
                //显示报名表
                this.showWriteForm()
            }
        ).catch((err) => {
            this.setState({ischeck : checkarray})
            //console.log(err)
        })

    }
    showWriteForm(){
        const { itemActions } = this.props;
        itemActions.check_enroll();
    }
    enterBack(){
        const { itemActions } = this.props;
        itemActions.HideApplyForm()
        this.setState({check:false})
        this.checkboxs = [];
    }
    enrollData(data){
        this.setState({reset: []})
        console.log("数据接收成功")
        //const baseData = BASE64.encoder();
        //console.log(data)
        //提交数据时判断 coupon是否为空
        let pid = '';
        let eurl = '';
        let enroll_data = '';
        let surl = '';
        let sparams = '';
        const type = this.type;
        const id = this.id;
        if(type == 'activity'){
            pid = 'activity_id';
            enroll_data = 'activity_enroll_data';
            eurl = 'activity_enroll';
            surl = 'select_activity_enroll'; //选择赛事支付
            sparams = 'activity_enroll_id_params';
        }else if(type == 'event'){
            pid = 'event_id';
            enroll_data = 'event_enroll_data';
            eurl = 'competition_enroll';
            surl = 'select_competition_enroll';
            sparams = 'event_enroll_id_params';
        }else if(type == 'training'){
            pid = 'training_id';
            enroll_data = 'training_enroll_data';
            eurl = 'training_enroll';
            surl = 'select_training_enroll';
            sparams = 'training_enroll_id_params';
        }

        //编码
        const jsonDate = JSON.stringify(data);
        const baseData = bs64.btoa(unescape(encodeURIComponent(jsonDate)));
        //return decodeURIComponent(escape(atob(this)));
        console.log(baseData)
        let param = `entrance_type=a&entrance_community_cid=0&${pid}=${id}&${enroll_data}=${baseData}`;
        if(this.state.coupon != ''){
            param += `&coupon_code=${this.state.coupon}`
        }
        Toast.loading('加载中...');
        //提交接口
        httpRequest(eurl, param).then(
            (data) => {
                if(data.length > 0 ){
                    //选择赛事支付
                    const enroll_id = data.join(",");
                    httpRequest(surl, `${sparams}=[${enroll_id}]`).then(
                        (enrollData) =>{
                            Toast.hide();
                            console.log(enrollData)
                            const order = enrollData.order_no;
                            const amount = enrollData.sum_amount;
                            if(amount == 0){
                                alert(this.predpare)
                                //如果是预报名不用到详情页 预报名 0是不用审核，1是先付后审模式，2是先审后付模式。
                                if( this.predpare != '0'){
                                    this.context.router.push({pathname: '/user/payed'});
                                    return
                                }
                                this.context.router.push({pathname: '/home/info/' + this.id, query: {'type': this.type,'enroll': data[0]}});
        					}else{
                                this.context.router.replace({pathname: '/pay/' + this.id ,query: {'type': this.type,'order': order,'amount': amount,'enroll': data[0], 'predpare': this.predpare }});
        					};
                        }
                    )
                }
                if(data.ret == '7401'){
                    Toast.hide();
                    const list = data.data;
                    this.setState({reset: list})
                }
            }
        );
    }
    getCoupon(code){
        this.setState({ coupon: code })
    }
    render(){
        const { item } = this.props;
        if(this.state.loading){
            return <div><NavBar mode="light" onLeftClick={() => this.context.router.goBack()}>组别选择</NavBar><br/><br/><br/><div className="loading"><ActivityIndicator text="加载中..."/></div></div>
        }

        let list = item.enroll.data.map(function(item,index){
                return <EnrollItem key={index} type={this.type} title={item.title} data={item.group} check={this.state.ischeck} handleCheck={this.handleCheck.bind(this)} />
        }.bind(this));

        //填写报名表***********
        if(this.state.check && this.state.ispop){
            return(
                <div className="enreoll">
                    <NavBar mode="light" onLeftClick={() => this.enterBack()}>参赛者信息</NavBar>
                    <FormView type={this.type} select={this.checkboxs} templet={item.enroll.data} submit={this.enrollData.bind(this)} coupon={this.getCoupon.bind(this)} reset={this.state.reset} />
                </div>
            )
        }

        //组别选择
        if(!(this.state.loading && this.state.check)){
            return(
                <div className="enroll">
                    <NavBar mode="light" onLeftClick={() => this.context.router.goBack()}>组别选择</NavBar>
                    <form onSubmit={this.submitHandler}>
                        {list}
                        <div className="footer_fixed-bottom">
                            <button className="am-button btn_warn" type="submit">下一步</button>
                        </div>
                    </form>
                </div>
            )
        }
    }
}

export default connect(
   state => ({
       item : state.item,
       user : state.user,
   }),
   dispatch => ({
       itemActions: bindActionCreators(itemActions, dispatch)
   })
)(HomeEnroll)
