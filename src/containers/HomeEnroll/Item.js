import React, {Component, PropTypes} from 'react'
import { List, Checkbox, Badge, Flex } from 'antd-mobile';
import { contains } from '../../utils/'
const CheckboxItem = Checkbox.CheckboxItem;
class EnrollItem extends Component {
	static propTypes = {
        type: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        check: PropTypes.array,
        data: PropTypes.array.isRequired
    }
	constructor(props) {
        super(props);
    }
	onChange(val) {
		this.props.handleCheck(val)
	}
	render(){
		const {type, title, data, check} = this.props;

		return(
			<div className="enroll_list">
				<List renderHeader={() => `项目:${title}`}>
					{this.props.data.map( item => {
						const ischeck = contains(check,item.id)
						if(ischeck){

							this.onChange(item.id)
							return <CheckboxItem key={item.id} data-seed="logId" checked={false} disabled defaultChecked >
									{ item.prepare_enroll > 0 ? <span className="prepare" dangerouslySetInnerHTML={{__html: "预"}}/> : '' }
									{item.title}
									{ item.single_person === '0' ? <Badge text={`${item.person_min} - ${item.person_max}人`} /> : ""}
									<List.Item.Brief>
										<Flex style={{color:'#ccc'}}>
											<Flex.Item>
												会员: { parseFloat(item.member_fee,10) =='0' ? <span dangerouslySetInnerHTML={{__html: "免费"}}/> : <span dangerouslySetInnerHTML={{__html: `<i>￥${item.member_fee}</i>/人`}}/> }
											</Flex.Item>
											<Flex.Item>
												非会员: { parseFloat(item.nomember_fee,10) =='0' ? '免费' : <span dangerouslySetInnerHTML={{__html: `￥${item.nomember_fee}/人`}}/> }
											</Flex.Item>
										</Flex>
									</List.Item.Brief>
								</CheckboxItem>

						}else{


						return <CheckboxItem key={item.id} data-seed="logId" onChange={() => this.onChange(item.id)} >
								{ item.prepare_enroll > 0 ? <span className="prepare" dangerouslySetInnerHTML={{__html: "预"}}/> : '' }
								{item.title}
								{ item.single_person === '0' ? <Badge text={`${item.person_min} - ${item.person_max}人`} /> : ""}
								<List.Item.Brief>
									<Flex>
										<Flex.Item>
											会员: { parseFloat(item.member_fee,10) =='0' ? <span className="red" dangerouslySetInnerHTML={{__html: "免费"}}/> : <span dangerouslySetInnerHTML={{__html: `<i>￥${item.member_fee}</i>/人`}}/> }
										</Flex.Item>
										<Flex.Item>
											非会员: { parseFloat(item.nomember_fee,10) =='0' ? '免费' : <span dangerouslySetInnerHTML={{__html: `￥${item.nomember_fee}/人`}}/> }
										</Flex.Item>
									</Flex>
								</List.Item.Brief>
							</CheckboxItem>

						}
					})}
				</List>
			</div>
		)
	}
}
export default EnrollItem
