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
				<div className="weui-flex">
					<div className="weui-flex__item">
						<Select onChange={handleChange} defaultValue="lucy" size="large" defaultValue="全类型">
							<Option value="0">全部</Option>
							<Option value="1">综合</Option>
							<Option value="2">摩托车</Option>
						</Select>
					</div>
					<div className="weui-flex__item">
						<Select size="large" defaultValue="全活动">
							<Option value="0">全活动</Option>
							<Option value="1">官方</Option>
						</Select>
					</div>
					<div className="weui-flex__item">
						<Select size="large" defaultValue="全价格">
							<Option value="0">全价格</Option>
							<Option value="2">免费</Option>
							<Option value="1">收费</Option>
						</Select>
					</div>
					<div className="weui-flex__item">
						<Select size="large" defaultValue="全状态">
							<Option value="">全状态</Option>
							<Option value="NR">预热中</Option>
							<Option value="R">报名中</Option>
							<Option value="N">即将开始</Option>
							<Option value="P">进行中</Option>
						</Select>
					</div>
				</div>
				<div className="type_bg"></div>














                <div className="type_tab">
                    <div className="type_tab_hd">
        				<div className="weui-flex">
        					<div className="weui-flex__item">
                                fdsfsd
                            </div>
                            <div className="weui-flex__item">
        						全赛事
        					</div>
                            <div className="weui-flex__item">
                                fdsfds
        					</div>
                            <div className="weui-flex__item">
        						全状态
        					</div>
        				</div>
    				</div>
    				<div className="weui-mask"></div>
    			</div>

















			</div>

		)
	}
}

export default TypeSelect
