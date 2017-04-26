import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router';
import './slider.css'
import { getImageUrlPath } from '../../api/'

import {Carousel, Flex} from 'antd-mobile';

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
			if(item.action ==''){
				return(<div key={index}><img src={getImageUrlPath(item.image)} /></div>)
			}else{
				const action = JSON.parse(item.action);
				if(action.type == 'url'){
					return(<Flex key={index} justify="center" className="flex-container-justify"><a href={action.data.url} ><img src={`${getImageUrlPath(item.image)}`} /></a></Flex>)
				}else{
					return(<Flex key={index}  justify="center" className="flex-container-justify"><Link to={{pathname:`/home/details/${action.data.id ? action.data.id :''}`, query:{type: `${action.type}` } }} ><img src={`${getImageUrlPath(item.image)}`} /></Link></Flex>)
				}
			}
		})
		function onChange(a, b, c) {
			console.log(a, b, c);
		}
		return(
			<Carousel autoplay={autoplay} afterChange={onChange}>
				{list}
            </Carousel>
		)
	}
}

export default Slider
