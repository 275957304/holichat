import React, {Component, PropTypes} from 'react'
import './style.less'

import $ from 'n-zepto'
// http://www.swiper.com.cn/api/Controller/2015/0308/216.html  双相控制
class EventTabs extends Component {
	constructor (props) {
		super(props)
	}
	componentDidMount(){
		
    }
	render(){
		//父组件 props设置 search来获取值
		return(
			<div id="tabBox" className="event_type">
				<div className="tabs">
					{React.Children.map(this.props.children, (element, index) => {
						return (
							index == 0 ? <li className="active">{element.props.name}</li> : <li href="javascript:;">{element.props.name}</li>
						)
					})}
				</div>
				<div className="tabs_conent">
					{React.Children.map(this.props.children, element => {
						return (
							<div className="tabs_item">
								{element}
							</div>
						)
					})}
				</div>
			</div>
		)
	}
}

export default EventTabs
