import React, { Component, PropTypes } from 'react'
import './style.less'
import { Accordion, List, InputItem, Toast, Picker } from 'antd-mobile';
export default class EditDropdown extends Component{
	static propTypes: {
		form: PropTypes.object,
		error: PropTypes.object.isRequired,
		name: PropTypes.string.isRequired, //唯一的id
		data: PropTypes.object.isRequired, //数据
	}
	constructor(props) {
		super(props);
		this.name = this.props.name;
		this.options = [];
		this.parentError = true;
		this.state ={
			initialValue : '',
			//error_state : false
		}
	}
	componentWillMount(){
		let options = [];
		this.props.data.options.map( (val)=>{
			if(val.checked){
				this.setState({initialValue:val.label})
			}
			let option = {};
			option.value = val.label;
			option.label = val.label;
			options.push(option)
		})
		this.options = options;
	}
	// componentWillReceiveProps(nextProps){
	// 	const errorList = nextProps.error;
	// 	if(this.parentError){
	// 		errorList.map( val =>{
	// 			if(val == this.name){
	// 				this.setState({error_state:true})
	// 				this.parentError = false;
	// 			}
	// 		})
	// 	}
	// }
	selectChange(val){
		const value = val.join("")
		this.props.form.resetFields([this.name: val])
		this.setState({initialValue: value});
	}
	render(){
		const { form, data, name } = this.props;
		const { getFieldProps, getFieldError, isFieldValidating } = form
		const placeholder = '选择' + data.label;
		//是否必填
		let formOption = {initialValue:`${this.state.initialValue}`, rules: [{message:`${data.label}`}]}
		if(data.required){
			formOption = {initialValue:`${this.state.initialValue}`, rules: [{required: true,message:`${data.label}`}],validateTrigger: null}
		}
		return (
			<div className={ this.state.error_state ? 'error' : 'eitem'} >
				<List>
					<Picker extra={this.state.initialValue || '请选择'} title={placeholder}  data={this.options} cols={1} onChange={this.selectChange.bind(this)} >
						<List.Item arrow="horizontal">
							{data.label} <span className="red" dangerouslySetInnerHTML={{__html: data.required ? `*` : ''}} />
						</List.Item>
					</Picker>
					<div style={{display:'none'}}>
						<input {...getFieldProps( name , formOption)} />
					</div>
				</List>
			</div>
		)
	}
}
