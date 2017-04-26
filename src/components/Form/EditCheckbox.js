import React, { Component, PropTypes } from 'react'
import './style.less'
import { List, Toast, Flex, Checkbox } from 'antd-mobile';
const CheckboxItem = Checkbox.CheckboxItem;
const Item = List.Item;

const RenderOptions = React.createClass({
	render(){
		const data = this.props.data;
		const that = this.props.that;
		if(data.checked){
			return (<CheckboxItem defaultChecked key={data.value} onChange={() => that.onChange(data.value)}>{data.label}</CheckboxItem>)
		}else{
			return (<CheckboxItem key={data.value} onChange={() => that.onChange(data.value)}>{data.label}</CheckboxItem>)
		}
	}
});


export default class EditCheckbox extends Component{
	static propTypes: {
		form: PropTypes.object,
		name: PropTypes.string.isRequired, //唯一的id
		data: PropTypes.object.isRequired, //数据
	}
	constructor(props) {
		super(props);
		this.options = [];
		this.checkboxs = []; //选中的option
		this.name = this.props.name;
		//this.parentError = true;
		this.state = {
			value : "",
			error_state : false
		}
	}
	componentWillMount(){
		let options = [];
		let checkeds = [];
		this.props.data.options.map( (val)=>{
			let option = {};
		    if(val.checked){
		        checkeds.push(val.label)
		    }
			option.checked = val.checked;
		    option.value = val.label;
		    option.label = val.label;
		    options.push(option)
		})
		this.checkboxs = checkeds;
		this.setState({value:checkeds.join(',')})  //存起来
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
	onChange(val){
		const isChec = this.checkboxs.indexOf(val)
        isChec < 0 ? this.checkboxs.push(val) : this.checkboxs.splice(isChec,1)
		const checkVlaue = this.checkboxs.join(',')
		this.setState({value: checkVlaue})
		this.props.form.resetFields([this.name: checkVlaue])
		// if(this.props.data.required && this.checkboxs.length > 0){
		// 	this.setState({error_state:false})
		// }
		// if(this.props.data.required && this.checkboxs.length == 0){
		// 	this.parentError = true;
		// 	this.setState({error_state:true})
		// }
	}
	render(){
		const { form, data, name } = this.props;
		const { getFieldProps, getFieldError, isFieldValidating } = form
		const placeholder = '请输入' + data.label;
		//是否必填
		let required = null
		data.required ? required = {required: true} : required = null;

		let formOption = {initialValue:`${this.state.value}`,rules: [{message:`${data.label}`}],}
		if(data.required){
			formOption = {initialValue:`${this.state.value}`,rules: [{required: true,message:`${data.label}`}],validateTrigger: null}
		}
		return (
			<List>
				<div className={ this.state.error_state ? 'error' : 'eitem'} >
				<Item> {data.label} <span className="red" dangerouslySetInnerHTML={{__html: data.required ? `*` : ''}} /> </Item>
				</div>
				{
				    this.options.map( (val,i) => (
				        <RenderOptions key={i} data ={val} that = {this} />
				    ))
				}
				<div style={{display:'none'}}>
					<input {...getFieldProps(name,formOption)} />
				</div>
			</List>
		)
	}
}
