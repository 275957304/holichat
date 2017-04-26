import React, {Component, PropTypes} from 'react'
import './style.less'
import { Accordion, List, Toast, Flex, Picker } from 'antd-mobile';
const Item = List.Item;
import EditText from './EditText'
import EditDropdown from './EditDropdown'
import EditCertificate from './EditCertificate'
import EditRadio from './EditRadio'
import EditCheckbox from './EditCheckbox'
import EditImageFile from './EditImageFile'
class FormGroup extends Component {
	static propTypes: {
		form: PropTypes.object.isRequired,
		error: PropTypes.array.isRequired,
		data: PropTypes.object.isRequired,
		index: PropTypes.number.isRequired,
	}
	constructor (props) {
		super(props);
		this.index = 0;
		this.act_id = '';
		this.id = this.props.data.id;
		this.peoples = []; //参加者人数
		this.single_person = 1; //表示是否多选    0代表是多选择
		this.price = this.props.data.member_fee;
		this.ElementRegistry = {
			'text'           : 'RenderEditText',
			'number'         : 'RenderEditText',
			'name'           : 'RenderEditText',
			'phone'          : 'RenderEditText',
			'tel'            : 'RenderEditText',
			'dropdown'       : 'RenderItemSelector',
			'radio'          : 'RenderRadioBox',
			'checkbox'       : 'RenderCheckBox',
			'image_file'     : 'RenderImagePicker',
			'certificate'    : 'RenderCertificate',
			'line'           : 'RenderLine',
			'label'          : 'RenderLabel',
		};
		this.state = {
			person_min : 1,
			price : 0
		}
	}
	componentWillMount(){
		const {index, error, form, data, total} = this.props;
		this.act_id = data.event_id ||  data.activity_id || data.training_id;
		this.index = index;
		this.single_person = data.single_person;
		//是否可选多人报名
		if(data.single_person == 0){
			const member_fee = data.person_min * this.price;
			total({'index':this.index,'price':member_fee})
			this.setState({person_min:data.person_min,price: member_fee})
			let peoples = [];
			for(let i = data.person_min; i<=data.person_max; i++){
				let person = {};
				person.value = i;
				person.label = i;
				peoples.push(person)
			}
			this.peoples = peoples;
		}else{
			total({'index':this.index,'price':this.price})
			this.setState({price: this.price})
		}
	}
	renderElementList(data,index){
		const types = data.type;
					//  项目            组别             第几个参加者      input的名字
		const name = `${ this.index }&${ this.id }&${ data.index }&${ data.name}`;
		//console.log(name)
		const methodName = this.ElementRegistry[types];
		if(typeof methodName !== 'string'){
			console.log(`ElementRegistry: unkowned element type '`+ types +`'`)
			return null
		}
		const method = this[methodName]
		if(typeof method !== 'function'){
			console.log(`ElementRegistry: can not found  '`+ types +`' render method`)
			return null
		}
		return method.bind(this)(data,index,name)
	}
	//类别
	RenderLine(data,index){
		return <div className="line" key={index}>{data.label}</div>
	}
	RenderLabel(data,index){
		return <List key={index}><Item style={{flex: 'inherit'}} wrap>{data.label}</Item></List>
	}
	RenderEditText(data,index,name){
		return <EditText key={name +'_'+ index} data={data} name={name} error={this.props.error} form={this.props.form} />
	}
	RenderItemSelector(data,index,name){
		return <EditDropdown key={name +'_'+ index} data={data} name={name} error={this.props.error} form={this.props.form} />
	}
	RenderCertificate(data,index,name){
		return <EditCertificate key={name +'_'+ index} data={data} name={name} error={this.props.error} form={this.props.form} />
	}
	RenderRadioBox(data,index,name){
		return <EditRadio key={name +'_'+ index} data={data} name={name} error={this.props.error} form={this.props.form} />
	}
	RenderCheckBox(data,index,name){
		return <EditCheckbox key={name +'_'+ index} data={data} name={name} error={this.props.error} form={this.props.form} />
	}
	RenderImagePicker(data,index,name){
		return <EditImageFile key={name +'_'+ index} data={data} name={name}  id={ this.act_id } error={this.props.error} form={this.props.form} />
	}
	renderGroupArray(data,num){
		let dataList = []
		for(let i=0; i < num; i++){
			dataList.push({name:  'line'+ i , index : i, label: '参加者'+( i + 1), type: 'line', name : 'line'});
			data.map( (personal) => {
				let ret = this.deepCopy(personal);
					ret.index = i;
				dataList.push(ret)
			})
		}
		return dataList
	}
	//对象深浅拷贝
	deepCopy(o){
		if (o instanceof Array) {
	        var n = [];
	        for (var i = 0; i < o.length; ++i) {
	            n[i] = this.deepCopy(o[i]);
	        }
	        return n;
	    } else if (o instanceof Object) {
	        var n = {}
	        for (var i in o) {
	            n[i] = this.deepCopy(o[i]);
	        }
	        return n;
	    } else {
	        return o;
	    }
	}
	//队伍信息
	renderCommon(data){
		return (
			<div className="common_item">
				<div className="line">队伍信息</div>
				{
					data.map(
						function(data,i){
							const index = 'common';
							data.index = 'c'
							return this.renderElementList(data,index)
						}.bind(this)
					)
				}
				<Picker extra={this.state.person_min} title="选择队伍人数"  data={this.peoples} cols={1} onChange={this.personMin.bind(this)} >
					<List.Item className="person_number" arrow="horizontal">队伍人数</List.Item>
				</Picker>
			</div>
		)
	}
	personMin(value){
		const amount = value.join('');
		const total = amount*this.price;
		this.props.total({'index':this.index,'price': total })
		this.setState({ person_min: amount,price: total})
	}
	render(){
		const { index, error, form, data} = this.props;
		const template = JSON.parse(data.enroll_template);
		const common = template.common;
		const personal = template.personal;
		const personals = this.renderGroupArray(personal, this.state.person_min);
 		return(<div style={{position:'relative',marginTop:20}}>
				<div className="member_fee">￥{ this.state.price }</div>
				<Accordion defaultActiveKey={index== 0?"0":""} className="my-accordion">
					<Accordion.Panel header={data.title}>
						{ this.single_person == '0' ? this.renderCommon(common) : null }
						<div className="my_list">
							{
								personals.map((val,index)=>{
									return this.renderElementList(val,index)
								})
							}
						</div>
					</Accordion.Panel>
				</Accordion>
			</div>
		)
	}
}
export default FormGroup
