import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as itemActions from '../../reducers/modules/item/action'
import './style.less'
import { createForm } from 'rc-form';
import { Toast } from 'antd-mobile';
import FormGroup from './FormGroup'
import Coupon from './Coupon'
import { identityCodeValid, identityHKCodeValid, identityTWCodeValid } from '../../utils/verification'
import { accAdd } from '../../utils/'

class Form extends Component {
    static propTypes = {
        form: PropTypes.object,
        reset: PropTypes.array,
        type: PropTypes.string.isRequired,
        select: PropTypes.array.isRequired,
        templet: PropTypes.array.isRequired,
    }
    constructor(props){
        super(props);
        this.id = 0 ;
        this.resetState = true;
        this.templateData = [] //选择项目模板
        this.typematch = {}; //名字 -- 类型
        this.groupProject = {}; //预存 group_id 与 project_id
        this.totalpire = [];
        this.projectTitle =[];
        this.state = {
            total : 0,  //总价格
            error : [],
            submit : false,
        }
    };
    componentWillMount(){
        const { select, templet } = this.props;
        let seleTemplet = []
        select.map(id=>{
            templet.map( project => {
                project.group.map( group =>{
                    if(group.id == id){
                        seleTemplet.push(group)
                    }
                })
            })
        });
        this.templateData = seleTemplet;
        //表单元素格式规则
        seleTemplet.map( (val, index) =>{
        //this.templateData.map( (val, index) =>{
            let match = {};
            const temp = JSON.parse(val.enroll_template);
            const gid = val.id;
            const project_id = val.event_project_id || val.activity_project_id || val.training_project_id;
            this.id = val.event_id || val.activity_id || val.training_id;
            this.groupProject[gid] = {"project_id": project_id,"group_id": val.id, "index": index};
            this.projectTitle.push(val.title)
            //公共区
            if(val.single_person != '1'){
                temp.common.map( val => {
                    const name = val.name;
                    match[name] = val;
                })
            }
            temp.personal.map( val => {
                const name = val.name;
                match[name] = val;
            })
            this.typematch = Object.assign({}, this.typematch, match);
        })
    }
    componentDidMount() {
        const { params, itemActions, type } = this.props;
        const id = this.id;
        //获取组别信息
        if(type == 'activity'){
            //是否有优惠码
            itemActions.is_coupon('is_activity_coupon',{'activity_id':id})
        }else if(type == 'event'){
            itemActions.is_coupon('is_event_coupon',{'event_id':id})
        }else if(type == 'training'){
            itemActions.is_coupon('is_training_coupon',{'training_id':id})
        }
    }
    componentWillReceiveProps(nextProps){
        //hasOwnProperty
        const reset = nextProps.reset;
        console.log(reset)
        if(reset.length > 0 && this.resetState){
            const resetList = []
            reset.map( val =>{
                const project = this.groupProject[val.group_id].index;
                const group = val.group_id;
                val.personal.map( item => {
                    const index = item.index //第几个参加者
                    for(let name in item.data){
                        const key = project + '&' + group + '&' + index + '&' + name
                        resetList.push(key)
                    }
                })
            });
            //光标定位
            const fname = resetList[0].split('&')[3];
            const type = this.typematch[fname].type
            if(type == 'certificate'){
                const id = resetList[0] + '.card_value';
                this.props.form.getFieldInstance(id).refs.input.focus();
            }else{
                this.props.form.getFieldInstance(resetList[0]).refs.input.focus();
            }
            this.resetState = false
            this.setState({error : resetList})
        }
	}
    dataSort(data){
        let dsort = {};
        for(let key in data){
            const info = key.split('&');
            const index = info[0]
            let addItem = {}
            addItem[key] = data[key]
            dsort[index] = Object.assign({}, dsort[index], addItem)
        }
        return dsort
    }
    checkItem(data){
        const quantity = this.templateData.length;
        let errorArray = [];
        let submitData = [];
        for(let key in data){
            const value = data[key];
            const info = key.split('&');
            let name = info[3];
            const type = this.typematch[name].type;
            const required = this.typematch[name].required;
            const unique = this.typematch[name].unique;
            //再次检查必填项
            /*
            if(type == 'certificate' && required && !value.card_value ){
                errorArray.push(key)
                continue
            }
            if(required && !value){
                errorArray.push(key)
                continue
            }
            */
            //判断格式是否正确
            if(type == 'certificate' && value.card_value ){
                const card_type = value.card_type;
                const card_valu = value.card_value;
                if(!card_valu || (card_type == 'cn_id' && !identityCodeValid(card_valu)) || (card_type == 'hk_id' && !identityHKCodeValid(card_valu)) || (card_type == 'tw_id' && !identityTWCodeValid(card_valu))){
                    errorArray.push(key)
                    continue
                }
            }
            if(value && type == 'tel' && !/^(13\d|14\d|15\d|17\d|18\d)\d{8}$/.test(value)){
                errorArray.push(key)
                continue
            }
            //不允许重复
            if(unique){
                console.warn(key + '要查是否重复' + unique)
                for(let n in data){
                    const u_info = n.split('&');
                    //名字相同 与 不是本项目的返回
                    if(key == n || info[0] != u_info[0]) break
                    if(type == 'certificate' && name == u_info[3] && value.card_type == data[n].card_type  && value.card_value == data[n].card_value ){
                        errorArray.push(key)
                    }
                    if( name == u_info[3] && value == data[n]){
                        errorArray.push(key)
                    }
                }
            }
        }

        if(errorArray.length > 0){
            //是否有错误项目
            //console.log(errorArray)
            this.setState({error: errorArray})
        }else{
            //全部正确 数据插入到模板数据
            const dataSort = this.dataSort(data)
            for(let i in dataSort){
                const group = dataSort[i];
                let group_id = 0 ;
                let personal_data = [];
                let common_data = {};
                for(let key in  group){
                    const info = key.split('&');
                    const name = info[3];
                    group_id = info[1];
                    const value = group[key];
                    //如果没有填写、
                    if(!value){continue};
                    //判断
                    if( info[2] == 'c'){
                        common_data[name] = value;
                    }else{
                        const first = info[2];
                        let person ={}
                        person[name] = value;
                        personal_data[first] = Object.assign({}, personal_data[first], person)
                    }
                }
                //数据插入提交数组里
                submitData.push({
                    "personal_data" : personal_data,
                    "common_data" : common_data,
                    "project_id": this.groupProject[group_id].project_id,
                    "group_id": this.groupProject[group_id].group_id
                })
            }
            //判断项目是否都有填写
            const ratio = submitData.length - this.templateData.length;
            if(ratio != 0){
                const t = this.projectTitle[ this.projectTitle.length + ratio ]
                Toast.info(`请完善项目${t}`,2);
                return false;
            }
            //console.log(submitData)
            this.setState({error: []})
            this.resetState = true;
            this.props.submit(submitData)
        }
    }
    onSubmit = (e) => {
        e.preventDefault();
        let isRequired = false;
        // const getValue = this.props.form.getFieldsValue()
        // console.log(getValue)
        // this.checkItem(getValue)

        // this.props.form.validateFieldsAndScroll({ scroll: { offsetTop: 20 } }, (error, values) => {
        //     if (!error) {
        //         console.log('ok', values);
        //     } else {
        //         console.log('error', error, values);
        //     }
        // });
        this.props.form.validateFields((error, values) => {
            console.log(values)
            if(error){
                //必填项目
                for(let name in error){
                    const n = name.split('&');
                    let ename = n[3].split('.')[0];
                    let text = "请填写"
                    if(this.typematch[ename].type == 'dropdown' || this.typematch[ename].type == 'radio' || this.typematch[ename].type == 'checkbox'){
                        text = '请选择'
                    }
                    if(n[2] == 'c'){
                        Toast.info(`${text}：${this.projectTitle[n[0]]}的, ${this.typematch[ename].label}`,2);
                        //Toast.info(`${text}：${this.projectTitle[n[0]]}的, ${this.typematch[n[3]].label}`,2);
                    }else{
                        const index = parseInt(n[2]) + 1;
                        Toast.info(`${text}：${this.projectTitle[n[0]]},参加者${index} 的${ this.typematch[ename].label }`,2);
                    }
                    break;
                }
                //这里要清空上去
                //this.props.form.resetFields();
            }else{
                isRequired = true;
            }
        });
        //全面检验格式
        if(isRequired){
            const getValue = this.props.form.getFieldsValue();
            this.checkItem(getValue);
        }
    }
    priceTotal(value){
        //console.log(value)
        this.totalpire[value.index] = value.price;
        let total = 0;
        for(let i=0; i<this.totalpire.length;i++){
            total = accAdd(total,this.totalpire[i])
        }
        this.setState({total: total})
    }
    render() {
        //console.log(this.props)
        return (<div className="form_item">
                <form style={{paddingBottom:40}} onSubmit={this.onSubmit}>
                    {
                        this.templateData.map(function(data,index){
                            return <FormGroup key={index} form={this.props.form} error={this.state.error} data={data} index={index} total={this.priceTotal.bind(this)} />
                        }.bind(this))
                    }
                    {this.props.item.is_coupon ? <Coupon type={this.props.type} id={this.id} code={this.props.coupon} /> : null}
                    <div style={{backgroundColor:"#fff",zIndex:2,borderTop:"1px solid #ddd"}} className="footer_fixed-bottom">
                        <div style={{float:"left",paddingLeft:20,lineHeight:"42px"}}>总计：<span className="red">￥{this.state.total}</span></div>
                        <button style={{width:"35%",padding:12,border:"none",backgroundColor:"#e64340",color:"white",float:"right"}} type="submit">提交订单</button>
                    </div>
                </form>
        </div>);
    }
}

const NewForm = createForm({
    validateMessages: {
        required(field) {
            return `${field} 必填`;
        }
    },
})(Form)

export default connect(
   state => ({
       item : state.item
   }),
   dispatch => ({
       itemActions: bindActionCreators(itemActions, dispatch)
   })
)(NewForm)
