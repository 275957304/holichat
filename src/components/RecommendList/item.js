import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router';
import './style.less'
import { getImageUrlPath, httpRequest } from '../../api/'
import { getCategory } from '../../utils/'

import { Spin } from 'antd';
import 'antd/lib/spin/style/index.less';

class RecItem extends Component {
	static propTypes = {
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
    }
	constructor(props) {
        super(props);
		this.state = {
			loading : true,
			cost : 0.00,
			category_id: 0
		}
    }
	componentDidMount(){
		const { type,id} =this.props
		let url =''
		let param = {}
		switch (type) {
			case 'activity': url = 'get_activity_introduction'; param = {activity_id:id}; break;
			case 'event': url = 'get_competition_introduction'; param = {event_id:id}; break;
			case 'training': url = 'get_training_introduction'; param = {training_id:id}; break;
		};
		httpRequest(url,param).then(function(data){
			const category_txt = getCategory(data.sports_category_id)
			this.setState({
				loading : false,
				cost : data.cost,
				category: category_txt
			})
		}.bind(this));
	}
	render(){
		if(this.state.loading){
			return <div className="rec_loading"><Spin spinning={this.state.loading}></Spin></div>
		}
		//{getCategory(this.satae.category_id)}
		return(
			<Link to={{pathname:`/home/details/${this.props.id}`, query:{type: `${this.props.type}`} }} >
				<div className="rec_img"><img src={getImageUrlPath(this.props.image)} /></div>
				<div className="rec_txt">
					<div className="title line2">{this.props.title}</div>
					<p><span className="tip">{this.state.category}</span> <span className="price">¥{this.state.cost}起</span></p>
				</div>
			</Link>
		)
	}
}
export default RecItem
