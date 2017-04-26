import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router';
import { createForm } from 'rc-form';
import FormView from '../../components/Form/'

import { identityCodeValid, identityHKCodeValid, identityTWCodeValid } from '../../utils/verification'
import { accAdd } from '../../utils/'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as homeActions from '../../reducers/modules/home/action'


// let Hello = React.createClass({
//     render: function() {
//         var span = <span a="1">VaJoy</span>;
//         var newSpan = React.cloneElement( span, {b:'2'}, <em> CNBlog </em> );
//         console.log(newSpan.props);
//         return <div>Hello {span},{newSpan}</div>;
//     }
// });

const template = [
    {"id":"1681","event_id":"100654","event_project_id":"786","title":"点击报名","member_fee":"10.01","nomember_fee":"0.01","member_channel_fee":"0.00","nomember_channel_fee":"0.00","enroll_template":"{\"common\":[{\"type\":\"text\",\"name\":\"F5833b57309fcb\",\"label\":\"队伍名称\",\"required\":true,\"unique\":true},{\"type\":\"text\",\"name\":\"F5833b5730a06a\",\"label\":\"队长名称\",\"required\":true,\"unique\":false}],\"personal\":[{\"type\":\"name\",\"name\":\"F5833b5730a13a\",\"label\":\"姓名\",\"required\":true,\"unique\":false},{\"type\":\"tel\",\"name\":\"F5833b5730a1d6\",\"label\":\"电话\",\"required\":true,\"unique\":false,\"check_format\":true},{\"type\":\"certificate\",\"name\":\"F5833b5730a26d\",\"label\":\"证件\",\"required\":true,\"unique\":true,\"check_format\":true,\"options\":[{\"label\":\"身份证\",\"checked\":false,\"value\":\"cn_id\",\"visible\":true},{\"label\":\"港澳居民来往内地通行证\",\"checked\":false,\"value\":\"hk_id\",\"visible\":true},{\"label\":\"台湾居民来往大陆通行证\",\"checked\":false,\"value\":\"tw_id\",\"visible\":true},{\"label\":\"护照\",\"checked\":false,\"value\":\"passport\",\"visible\":true}],\"subname\":[\"card_type\",\"card_value\"]},{\"type\":\"dropdown\",\"name\":\"F5833b5730a309\",\"label\":\"服装尺码\",\"required\":true,\"options\":[{\"label\":\"S（160\\/76A）\",\"checked\":false},{\"label\":\"M（165\\/80A）\",\"checked\":false},{\"label\":\"L（175\\/88A）\",\"checked\":false},{\"label\":\"XL（180\\/92A）\",\"checked\":false}]}]}","single_person":"0","number_limit":"630","person_min":"1","person_max":"4","free_type":"PF","prepare_enroll":"0"},
    //{"id":"1685","event_id":"100655","event_project_id":"787","title":"全能","member_fee":"0.00","nomember_fee":"0.00","member_channel_fee":"0.00","nomember_channel_fee":"0.00","enroll_template":"{\"common\":[],\"personal\":[{\"type\":\"text\",\"name\":\"F584a247e50e1a\",\"label\":\"单行文本\",\"required\":false,\"unique\":false},{\"type\":\"number\",\"name\":\"F584a247e50eb7\",\"label\":\"数字\",\"required\":false,\"unique\":false},{\"type\":\"dropdown\",\"name\":\"F584a247e50f57\",\"label\":\"下拉菜单\",\"required\":false,\"options\":[{\"label\":\"选项 1\",\"checked\":false},{\"label\":\"选项 2\",\"checked\":false},{\"label\":\"选项 3\",\"checked\":false}]},{\"type\":\"name\",\"name\":\"F584a247e50fee\",\"label\":\"姓名\",\"required\":true,\"unique\":false},{\"type\":\"tel\",\"name\":\"F584a247e51083\",\"label\":\"电话\",\"required\":true,\"unique\":false,\"check_format\":true},{\"type\":\"certificate\",\"name\":\"F584a247e51118\",\"label\":\"证件\",\"required\":true,\"unique\":false,\"check_format\":true,\"options\":[{\"label\":\"身份证\",\"checked\":false,\"value\":\"cn_id\",\"visible\":true},{\"label\":\"港澳居民来往内地通行证\",\"checked\":false,\"value\":\"hk_id\",\"visible\":true},{\"label\":\"台湾居民来往大陆通行证\",\"checked\":false,\"value\":\"tw_id\",\"visible\":true},{\"label\":\"护照\",\"checked\":false,\"value\":\"passport\",\"visible\":true}],\"subname\":[\"card_type\",\"card_value\"]},{\"type\":\"radio\",\"name\":\"F584a247e511ac\",\"label\":\"单选\",\"required\":true,\"options\":[{\"label\":\"选项 1\",\"checked\":false},{\"label\":\"选项 2\",\"checked\":false},{\"label\":\"选项 3\",\"checked\":false}]},{\"type\":\"checkbox\",\"name\":\"F584a247e51240\",\"label\":\"多选\",\"required\":true,\"options\":[{\"label\":\"选项 1\",\"checked\":false},{\"label\":\"选项 2\",\"checked\":false},{\"label\":\"选项 3\",\"checked\":false}]},{\"type\":\"label\",\"name\":\"F584a247e512e4\",\"label\":\"备注\"},{\"type\":\"image_file\",\"name\":\"P584a247e5139a\",\"label\":\"图片上传\",\"required\":false},{\"type\":\"tel\",\"name\":\"F584a247e51448\",\"label\":\"电话\",\"required\":true,\"unique\":false,\"check_format\":true},{\"type\":\"tel\",\"name\":\"F584a247e514e0\",\"label\":\"电话\",\"required\":true,\"unique\":false,\"check_format\":true}]}","single_person":"1","number_limit":"100","person_min":"0","person_max":"0","free_type":"F","prepare_enroll":"0"},
    //{"id":"1474","event_id":"100603","event_project_id":"719","title":"女单","member_fee":"20.00","nomember_fee":"0.00","member_channel_fee":"0.00","nomember_channel_fee":"0.00","enroll_template":"{\"common\":[],\"personal\":[{\"type\":\"name\",\"label\":\"姓名\",\"name\":\"truename\",\"required\":true,\"unique\":false},{\"type\":\"text\",\"label\":\"身份证\",\"name\":\"idcard\",\"required\":false,\"unique\":false},{\"type\":\"tel\",\"label\":\"联系电话\",\"name\":\"phone\",\"required\":true,\"unique\":false,\"check_format\":true}]}","single_person":"1","number_limit":"12","person_min":"0","person_max":"0","free_type":"F","prepare_enroll":"0"},
    //{"id":"1474","event_id":"100603","event_project_id":"719","title":"女单","member_fee":"0.00","nomember_fee":"0.00","member_channel_fee":"0.00","nomember_channel_fee":"0.00","enroll_template":"{\"common\":[],\"personal\":[{\"type\":\"name\",\"label\":\"id\",\"name\":\"truenameeee\",\"required\":false,\"unique\":false},{\"type\":\"name\",\"label\":\"姓名\",\"name\":\"truename\",\"required\":true,\"unique\":true},{\"type\":\"name\",\"label\":\"姓名2\",\"name\":\"truename\",\"required\":true,\"unique\":true}]}","single_person":"1","number_limit":"12","person_min":"0","person_max":"0","free_type":"F","prepare_enroll":"0"}
    //图片上传{"id":"1474","event_id":"100603","event_project_id":"719","title":"女单","member_fee":"0.00","nomember_fee":"0.00","member_channel_fee":"0.00","nomember_channel_fee":"0.00","enroll_template":"{\"common\":[],\"personal\":[{\"type\":\"name\",\"label\":\"姓名\",\"name\":\"truename\",\"required\":true,\"unique\":false},{\"type\":\"image_file\",\"name\":\"P584a247e5139a\",\"label\":\"图片上传\",\"required\":false}]}","single_person":"1","number_limit":"12","person_min":"0","person_max":"0","free_type":"F","prepare_enroll":"0"}
]

class Form extends Component {
    static propTypes : {
        form: PropTypes.object
    }
    constructor(props){
        super(props);
        this.templateData = template;
        this.typematch = {}; //名字 -- 类型
        this.dataTemp = []; //提交服务格式
        this.totalpire = [];
        this.state = {
            total : 0,  //总价格
            error : [],
            submit : false,
        }
    }
    componentDidMount(){
        template.map( val => {
            let match = {};
            const temp = JSON.parse(val.enroll_template);
            const data = {
                "project_id": val.event_project_id,
                "group_id": val.id,
            }
            data.common_data = {};
            data.personal_data = [];
            this.dataTemp.push(data)

            //公共区
            if(val.single_person != '1'){
                temp.common.map( c => {
                    const para = {type : c.type, required : c.required, unique : c.unique}
                    const name = c.name;
                    match[name] = para;
                })
            }
            temp.personal.map( c => {
                const para = {type : c.type, required : c.required, unique : c.unique}
                const name = c.name;
                match[name] = para;
            })
            this.typematch = Object.assign({}, this.typematch, match);
        })
    }
    dataSort(data){
        let dsort = {};
        for(let key in data){
            const info = key.split('_');
            const index = info[0]
            let addItem = {}
            addItem[key] = data[key]
            dsort[index] = Object.assign({}, dsort[index], addItem)
        }
        return dsort
    }
    checkItem(data){
        //判断类型与值是正确
        let errorArray = [];
        for(let key in data){
            const value = data[key];
            const info = key.split('_');
            const name = info[3];
            const type = this.typematch[name].type;
            const required = this.typematch[name].required;
            const unique = this.typematch[name].unique;
            //是否必填项
            if(type == 'certificate' && required && !value.card_value ){
                errorArray.push(key)
                continue
            }
            if(required && !value){
                errorArray.push(key)
            }
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
                    const u_info = n.split('_');
                    if(key == n) break
                    if(type == 'certificate' && name == u_info[3] && value.card_type == data[n].card_type  && value.card_value == data[n].card_value ){
                        errorArray.push(key)
                    }
                    if(name == u_info[3] && value == data[n]){
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
                let person = {};
                for(let key in  group){
                    const info = key.split('_');
                    const name = info[3];
                    group_id = info[1];
                    const value = group[key];
                    //判断
                    if( info[2] == 'c'){
                        common_data[name] = value;
                    }else{
                        const persons_index = info[2];
                        person[name] = value;
                        personal_data[persons_index] = person;
                    }
                }
                //数据插入到模板数据
                this.dataTemp.map(temp=>{
                    if(temp.group_id == group_id){
                        temp.personal_data = personal_data;
                        temp.common_data = common_data;
                    }
                })
            }
            console.log(this.dataTemp)
            //提交吧
        }
    }
    onSubmit = (e) => {
        // formOption.validateMessages: Object
        e.preventDefault();
        const getValue = this.props.form.getFieldsValue()
        this.checkItem(getValue)
    }
    priceTotal(val){
        this.totalpire[val.index] = val.price;
        let total = 0;
        for(let i=0; i<this.totalpire.length;i++){
            total = accAdd(total,this.totalpire[i])
        }
        this.setState({total: total})
    }
    render() {
        const { form } = this.props;
        const { getFieldProps, getFieldError, isFieldValidating } = form
        const disabled = false;

        return(<div className="form_item">
            <form style={{paddingBottom:40}} onSubmit={this.onSubmit}>
                {
                    this.templateData.map(function(formData,index){
                        return <FormView key={"form_" + index} project_index={index} form={form} error={this.state.error} formData={formData} total={this.priceTotal.bind(this)} />
                    }.bind(this))
                }

                {/*这里还要做优惠码*/}

                <div style={{backgroundColor:"#fff"}} className="footer_fixed-bottom">
                    <div style={{float:"left",paddingLeft:20,lineHeight:"38px"}}>总计：<span className="red">￥{this.state.total}</span></div>
                    <button disabled={disabled} style={{width:"30%",padding:10,border:"none",backgroundColor:"#ff6060",color:"white",float:"right"}} type="submit">提交订单</button>
                </div>
            </form>
        </div>)
  }
}

/*
export default createForm({
  validateMessages: {
    required(field) {
      //requiredToast(field)
      return `${field} 必填`;
    },
  },
})(Form)
*/

const NewForm = createForm({
    validateMessages: {
        required(field) {
            //requiredToast(field)
            return `${field} 必填`;
        },
    },
})(Form);


export default connect(
   state => ({
       home : state.home
   }),
   dispatch => ({
       homeActions: bindActionCreators(homeActions, dispatch)
   })
)(NewForm)
