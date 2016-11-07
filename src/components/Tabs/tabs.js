import React, {Component, PropTypes} from 'react'
import './style.less'

import $ from 'n-zepto'
import '../../utils/tabs/';
class EventTabs extends Component {
	constructor (props) {
		super(props)
	}
	componentDidMount(){
		let tab = new tabs.Scroll('.tab', {role: 'tab'});
    }
	render(){
		//父组件 props设置 search来获取值
		return(
			<div className="tab tab_fixed">

				<ul className="tab-nav">
					{React.Children.map(this.props.children, (element, index) => {
						return (
							index == 0 ? <li className="current">{element.props.name}</li> : <li href="javascript:;">{element.props.name}</li>
						)
					})}
				</ul>

				<ul className="tab-content">
					{React.Children.map(this.props.children, element => {
						return (
							<li className="tab-item">
								{element}
							</li>
						)
					})}
				</ul>

			</div>
		)
	}
}

export default EventTabs
