import React, {Component, PropTypes} from 'react'
import './style.less'
import RecItem from './item'

class Recommend extends Component {
	static propTypes = {
        data: PropTypes.array.isRequired
    }
	render(){
		let list = this.props.data.map(function(item,index){
				const action = JSON.parse(item.action)
				return <RecItem key={index} title={item.title} image={item.image} type={action.type} id={parseInt(action.data.id,10)} />
        });
		return(
			<div className="recommend">
				{list}
			</div>
		)
	}
}
export default Recommend
