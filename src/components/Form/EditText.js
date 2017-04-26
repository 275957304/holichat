import React, { Component, PropTypes } from 'react'
import './style.less'
import { Accordion, List, InputItem,Toast } from 'antd-mobile';
export default class EditText extends Component{
	static propTypes: {
		form: PropTypes.object,
		error: PropTypes.object.isRequired,
		name: PropTypes.string.isRequired, //唯一的id
		data: PropTypes.object.isRequired, //数据
	}
	constructor(props) {
		super(props);
		this.inputType = "text"
		this.types = this.props.data.type;
		this.required = this.props.data.required;
		this.unique = this.props.data.unique;
		this.label = this.props.data.label;
		this.type_name = this.props.data.name;
		this.name = this.props.name;
		this.state = {
			error_state : false
		}
	}
	componentWillMount(){
		if(this.types == 'tel' || this.types == 'number'){
			this.inputType = "number"
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
		};
	}
	checkFormat(value){
		//const getInput = this.props.form.getFieldInstance(this.name)
		if(this.required && value ==''){
			Toast.info(`${this.label}不能为空`,1);
			//getInput.refs.input.focus();
			return
		}
		if(this.types == 'tel' && !/^(13\d|14[57]|15\d|17[678]|18\d)\d{8}$/.test(value) && value !='' ){
			//this.props.form.resetFields([this.name: value])
			Toast.info(`${this.label}不正确`,1);
			return
		}
		//检查是否重复
		if(this.unique && value !='' ){
			const all = this.props.form.getFieldsValue();
			const thisName = this.name.split('_');
			for(let name in all){
				const key = name.split('_');
				if(this.name == name) continue
				if(thisName[0] == key[0] && thisName[3] == key[3] && value == all[name]){
					const index = parseInt(key[2]) + 1
					Toast.info(`${this.label}与参加者${index}重复,请重新填写!`,3);
					return
				}
			}
		}
		//if(this.types == 'tel' && /^(13\d|14[57]|15\d|17[678]|18\d)\d{8}$/.test(value)){
		this.setState({error_state:false})
		//}
	}
	render(){
		const { form, data, name } = this.props;
		const { getFieldProps } = form
		const placeholder = '请输入' + data.label;
		//是否必填
		let formOption = {rules: [{message:`${data.label}`}],validateTrigger:null,}
		if(data.required){
			formOption = {rules: [{required: true}, {message:`${data.label}`}],validateTrigger:null}
		}
		return (
			<div className={ this.state.error_state ? 'error' : 'eitem'} >
				<List>
					<InputItem onBlur={this.checkFormat.bind(this)} {...getFieldProps(name,formOption)} type={this.inputType} placeholder={placeholder} >
						{data.label}  <span className="red" dangerouslySetInnerHTML={{__html: data.required ? `*` : ''}} />
					</InputItem>
				</List>
			</div>
		)
	}
}
