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
		items:PropTypes.array,
		autoplay: PropTypes.bool
	}
	// componentWillMount() {
	//
    // }
	render(){
		const { items , autoplay } = this.props;
		const list = items.map( (item,index) => {
			//console.log(index)
			if(item.action ==''){
				return(<div key={index}><img src={api.getImg(item.image)} /></div>)
			}else{
				const action = JSON.parse(item.action);
				return(<Link key={index} to={{pathname:`/home/${action.type}`,query:{id:`${action.data.id}`}}} ><img src={api.getImg(item.image)} /></Link>)
			}
		})
		function onChange(a, b, c) {
			console.log(a, b, c);
		}
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
