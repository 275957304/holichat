import React, {Component, PropTypes} from 'react'
import './style.less'

import { Select } from 'antd';
import 'antd/lib/select/style/index.less';
const Option = Select.Option;

function handleChange(value) {
  console.log(value);  // { key: "lucy", label: "Lucy (101)" }
}

class TypeSelect extends Component {
	constructor (props) {
		super(props)
	}
	/*
	static propTypes = {
		message:PropTypes.string.isRequired,
		loading: PropTypes.bool
	}
	*/
	render(){
		return(
			<div className="type_tab">
                <div className="type_tab_hd">
    				<div className="weui-flex">
    					<div className="weui-flex__item">
    						<div className="ty">
                                <span>全类型</span>
                            </div>
                            {/*<ul>
                                <li>全部</li>
                                <li>登山</li>
                                <li>定向</li>
                            </ul>*/}
    					</div>
                        <div className="weui-flex__item">
    						全赛事
    					</div>
                        <div className="weui-flex__item">

                            <Select

                            size="large"
                            defaultValue="全价格">
                                <Option value="0">全价格</Option>
                                <Option value="2">免费</Option>
                                <Option value="1">收费</Option>
                            </Select>

    					</div>
                        <div className="weui-flex__item">
    						全状态
    					</div>
    				</div>
				</div>
				<div className="weui-mask"></div>
			</div>

		)
	}
}

export default TypeSelect
