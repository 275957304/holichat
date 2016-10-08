import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router';
import { Carousel} from 'antd';
import 'antd/lib/carousel/style/index.css';
import './theme/index.css'

class Slider extends Component {
	componentWillMount() {
        console.log('Slider')
 
    }
	componentDidMount(){
		const { source } = this.props;
		console.log(source)
	}
	render(){
		function onChange(a, b, c) {
			console.log(a, b, c);
		}
		return(
			<div className="longs">
				<Carousel afterChange={onChange}>
					<Link to="/" className="a">
						<img className="img" src="http://holichat-res-inside.img-cn-hangzhou.aliyuncs.com/uploads/m/hr/61f9e5f3ac0038d9a5a2ec0548a5c7cf.jpg" />
					</Link>
					<Link to="/" className="a">
						<img className="img" src="http://holichat-res-inside.img-cn-hangzhou.aliyuncs.com/uploads/m/hr/380aff9164de5d04b8e18c790c8b194d.jpg" />
					</Link>
                </Carousel>
			</div>
		)
	}
}
export default Slider
