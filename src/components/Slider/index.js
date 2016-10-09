import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router';
import { Carousel} from 'antd';
import 'antd/lib/carousel/style/index.css';
import './slider.css'
import api from '../../api/'
class Slider extends Component {
	constructor (props) {
		super(props)
		//this.state ={data : null}
	}
	static propTypes = {
		items: PropTypes.array,
		currentKey: PropTypes.bool
	}
	// componentWillMount() {
	//
    // }
	render(){
		const { items , autoplay } = this.props;

		function onChange(a, b, c) {
			console.log(a, b, c);
		}
		const list = items.map( (item) => {
			const action = JSON.parse(item.action);
			return(<Link key={item.id}  to={{pathname:`/home/${action.type}`, query:{id: `${action.data.id}`} }} ><img className="img" src={api.imgURL + item.image} /></Link>)
		})
		return(
			<div className="slide_area">
				<Carousel autoplay={autoplay} afterChange={onChange}>
					{list}
                </Carousel>
			</div>
		)
	}
}

export default Slider
