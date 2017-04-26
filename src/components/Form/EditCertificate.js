import React, { Component, PropTypes } from 'react'
import './style.less'
import { Accordion, List, InputItem, Toast, Flex, Picker } from 'antd-mobile';
import { identityCodeValid, identityHKCodeValid, identityTWCodeValid } from '../../utils/verification'
export default class EditCertificate extends Component{
	static propTypes: {
		form: PropTypes.object,
		error: PropTypes.object.isRequired,
		name: PropTypes.string.isRequired, //唯一的id
		data: PropTypes.object.isRequired, //数据
	}
	constructor(props) {
		super(props);
		this.name = this.props.name;
		this.required = this.props.data.required;
		this.label = this.props.data.label;
		this.unique = this.props.data.unique;
		this.selectCardType = {
			'cn_id'   : "身份证",
			'hk_id'   : "港澳居民来往内地通行证",
			'tw_id'   : "台湾居民来往大陆通行证",
			'passport': "护照",
		};
		this.state = {
            card : 'cn_id',
			error_state : false
        }
	}
	componentWillReceiveProps(nextProps){
		const errorList = nextProps.error;
		if(errorList.length >0 ){
			errorList.map( val =>{
				if(val == this.name){
					this.setState({error_state:true})
				}
			})
		}
	}
	checkFormat(value){
		//const getInput = this.props.form.getFieldInstance(`${this.name}.card_value`)
		const types = this.state.card;
		if(this.required && value ==''){
			Toast.info(`${this.label}不能为空`,1);
			//getInput.refs.input.focus();
			return
		}
		if( types == 'cn_id' && !identityCodeValid(value) ){
			//Toast.info(`${this.props.data.title},参加者${this.props.data.index + 1}的身份证号码不正确`);
			Toast.info(`参加者${this.props.data.index + 1}的身份证号码不正确`);
			return
		}
		if( types == 'hk_id' && !identityHKCodeValid(value) ){
			Toast.info(`参加者${this.props.data.index + 1}的港澳居民来往内地通行证不正确`);
			return
		}
		if( types == 'tw_id' && !identityTWCodeValid(value) ){
			Toast.info(`参加者${this.props.data.index + 1}的台湾居民来往大陆通行证不正确`);
			return
		}
		//检查重复项目
		if( this.unique ){
			const all = this.props.form.getFieldsValue();
			const thisName = this.name.split('_');
			for(let name in all){
				const key = name.split('_');
				if(this.name == name) continue
				if(thisName[0] == key[0] && thisName[3] == key[3] && this.state.card == all[name].card_type && value == all[name].card_value){
					const index = parseInt(key[2]) + 1
					Toast.info(`${this.label}与参加者${index}重复,请重新填写!`,3);
					return
				}
			}
		}

		this.setState({error_state:false})
	}
	cardType(value){
		const getVal = value.join("");
		this.setState({card: getVal });
	}
	render(){
		const { form, data, name } = this.props;
		const { getFieldProps } = form
		const placeholder = '请输入' + data.label + '号';
		let formOption = {rules: [{message:`${data.label}`,}]}
		if(data.required){
			formOption = {rules: [{required: true, message:`${data.label}`,},{type:'string',min: 1,},],validateTrigger: null}
		}
		return (
			<div className={ this.state.error_state ? 'error' : 'eitem'} >
				<List>
					<div style={{display:'none'}}>
						<input {...getFieldProps(`${name}.card_type`, {initialValue:`${this.state.card}`})} />
					</div>
					<Picker extra={this.selectCardType[this.state.card]} title="选择证件类型"  data={data.options} cols={1} onChange={this.cardType.bind(this)} >
						<List.Item arrow="horizontal">证件类型</List.Item>
					</Picker>
				</List>
				<List>
					<List><InputItem onBlur={this.checkFormat.bind(this)} {...getFieldProps(`${name}.card_value`, formOption )} placeholder={placeholder} >{data.label}号码 <span className="red" dangerouslySetInnerHTML={{__html: data.required ? `*` : ''}} /> </InputItem></List>
				</List>
			</div>
		)
	}
}
