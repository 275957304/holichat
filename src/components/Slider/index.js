import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router';
import { Carousel} from 'antd';
import 'antd/lib/carousel/style/index.less';
import './slider.less'
import { getImageUrlPath } from '../../api/'
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
				return(<div key={index}><img src={getImageUrlPath(item.image)} /></div>)
			}else{
				const action = JSON.parse(item.action);
				if(action.type == 'url'){
					return(<a key={index} href={action.data.url} ><img src={getImageUrlPath(item.image)} /></a>)
				}else{
					return(<Link key={index} to={{pathname:`/home/details/${action.data.id ? action.data.id :''}`, query:{type: `${action.type}` } }} ><img src={getImageUrlPath(item.image)} /></Link>)
				}
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
