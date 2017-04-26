import React, { Component, PropTypes } from 'react'
import './style.less'
import { List, ImagePicker, Toast, Flex } from 'antd-mobile';
const Item = List.Item;
import md5 from 'md5'
import { httpRequest } from '../../api/'
import { getItem } from '../../utils/'

export default class EditText extends Component{
	static propTypes: {
		form: PropTypes.object,
		name: PropTypes.string.isRequired, //唯一的id
		data: PropTypes.object.isRequired, //数据
	}
	constructor(props) {
		super(props);
		this.AccessKeyId ='';
		this.AccessKeySecret ='';
		this.Bucket ='';
		this.Expiration ='';
		this.SecurityToken ='';
		this.client = null;
		this.id = '';
		this.name = this.props.name;
		this.type = 'e' // a t
		this.state = {
			files : [],
			initialValue  : ''
		}
	}
	componentWillMount(){
		//这里要修改
		const p = window.location.href.split('?')[1];
		const strs = p.split('&')
		for(let i = 0; i < strs.length; i++) {
			if(strs[i].split('=')[0] == 'type'){
				let types = strs[i].split('=')[1];
				switch (types) {
					case 'activity': this.type = 'a'; break;
					case 'training': this.type = 't'; break;
					case 'event': this.type = 'e'; break;
				}
			}
		}
	}
	componentDidMount(){
		this.id = this.props.id;
		//这里还要判断类型 this.type
		httpRequest('get_sts_auth', {'session':getItem("session"),'uid':getItem("uid"),'type':'app_image'} ).then(
			(data) => {
				this.AccessKeyId = data.AccessKeyId;
				this.AccessKeySecret = data.AccessKeySecret;
				this.Bucket = data.Bucket;
				this.Expiration = data.Expiration;
				this.SecurityToken = data.SecurityToken;
				this.client = new OSS.Wrapper({region: 'oss-cn-hangzhou',accessKeyId: this.AccessKeyId,accessKeySecret: this.AccessKeySecret,bucket: this.Bucket,stsToken: this.SecurityToken,timeout: "600000",});
			}
		)
	}
	onChange(files, type, index){
		if(type == 'add'){
			Toast.loading('上传中!!!',0);
			let storeAs = 'uploads/' + this.type + '/' + this.id + '/e/' + getItem("uid") + '/';
			const file = files[0].file;
			const picType = file.name.substr(file.name.lastIndexOf("."))
			const picName = md5(file.name + file.lastModified);
			storeAs = storeAs + picName + picType;
			//console.log(storeAs)
			this.client.multipartUpload(storeAs, file).then( result => {
				let imglist = [];
				let img = {id : '0',url : result.url};
				imglist.push(img)
				this.props.form.resetFields([ this.name: result.url ])
				this.setState({files: imglist,initialValue: result.url});
				console.log(this.state)
				Toast.hide()
			}).catch(function (err) {
				Toast.hide();
				Toast.info('图片上传失败',2);
                console.log(err);
            });
		}
		if(type == 'remove'){
			this.props.form.resetFields([ this.name: ''])
			this.setState({files: [],initialValue: ''})
		}
	}
	render(){
		const { form, data, name } = this.props;
		const { getFieldProps, getFieldError, isFieldValidating } = form
		const placeholder = '请输入' + data.label;
		// console.log(this.state.initialValue)
		//是否必填
		let formOption = {initialValue:`${this.state.initialValue}`, rules: [{message:`${data.label}`}]}
		if(data.required){
			formOption = {initialValue:`${this.state.initialValue}`, rules: [{required: true,message:`${data.label}`}],validateTrigger: null}
		}
		return (
			<div className={ getFieldError(name) ? 'error' : 'eitem'} >
				<List>
					<Flex>
						<div className="form_label"> {data.label} <span className="red" dangerouslySetInnerHTML={{__html: data.required ? `*` : ''}} /> </div>
						<Flex.Item>
							<ImagePicker
								files={this.state.files}
								onChange={this.onChange.bind(this)}
								onImageClick={ (index, fs) => console.log(index, fs) }
								selectable={this.state.files.length < 1}
							/>
						</Flex.Item>
					</Flex>
				</List>
				<div style={{display:'none'}}>
					<input {...getFieldProps( name , formOption)} />
				</div>
			</div>
		)
	}
}
