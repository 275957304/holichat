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
        console.log(React.Children)
		return(
			<div className="type_tab">
                <div className="type_tab_hd">
                    <nav className="weui-flex">
                        {React.Children.map(this.props.children, (element, index) => {
                            return (<div className="weui-flex__item">{element.props.name}</div>)
                        })}
                    </nav>
                    <div className="tab-content-items">
                        {React.Children.map(this.props.children, element => {
                            return console.log(element)
                        })}
                    </div>
                </div>
			</div>

		)
	}
}

export default TypeSelect
