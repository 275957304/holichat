import React, { Component, PropTypes } from 'react'
import './style.less'
import { List, Toast, Radio } from 'antd-mobile';
const Item = List.Item;
const RadioItem = Radio.RadioItem;
export default class EditRadio extends Component{
	static propTypes: {
		form: PropTypes.object,
		name: PropTypes.string.isRequired, //唯一的id
		data: PropTypes.object.isRequired, //数据
	}
	constructor(props) {
		super(props);
		this.options = [];
		this.name = this.props.name;
		this.required = this.props.data.required;
		this.state = {
			value : '',
			error_state : false
		}
	}
	componentWillMount(){
		let options = [];
		this.props.data.options.map( (val)=>{
			if(val.checked){
				this.setState({value:val.label})
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
	// 	errorList.map( val =>{
	// 		if(val == this.name){
	// 			this.setState({error_state:true})
	// 		}
	// 	})
	// }
	onChange(val){
		//this.props.check(this.props.form.getFieldsValue())
		if(this.state.value == val){
			// if(this.required){
			// 	this.props.form.resetFields([this.name: ''])
			// 	this.setState({value: ''});
			// }else{
			// 	this.setState({value: ''});
			// }
			this.props.form.resetFields([this.name: ''])
			this.setState({value: ''});
		}else{
			this.props.form.resetFields([this.name: val])
			this.setState({value: val, error_state:false});
		}
	}
	render(){
		const { form, data, name } = this.props;
		const { getFieldProps, getFieldError, isFieldValidating } = form
		const placeholder = '请输入' + data.label;
		//是否必填
		let formOption = {initialValue:`${this.state.value}`, rules: [{message:`${data.label}`}]}
		if(data.required){
			formOption = {initialValue:`${this.state.value}`, rules: [{required: true,message:`${data.label}`}],validateTrigger: null}
		}
		return (
			<List>
				<div className={ this.state.error_state ? 'error' : 'eitem'} >
					<Item> {data.label} <span className="red" dangerouslySetInnerHTML={{__html: data.required ? `*` : ''}} /> </Item>
				</div>
				{
					this.options.map( i => (
						<RadioItem key={i.value} checked={ this.state.value === i.value} onChange={() => this.onChange(i.value)}>
							{i.label}
						</RadioItem>
					))
				}
				<div style={{width:1,height:1}}>
					<input {...getFieldProps(name,formOption)} />
				</div>
			</List>
		)
	}
}
