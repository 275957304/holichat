import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router';
import { ActivityIndicator} from 'antd-mobile';
import './style.css'
import { getImageUrlPath, httpRequest } from '../../api/'
import { getCategory,getCurrentStatus } from '../../utils/'

class RecItem extends Component {
	static propTypes = {
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
    }
	constructor(props) {
        super(props);
		this.isShow = true;
		this.state = {
			loading : true,
			cost : 0.00,
			state : '',
			category_id: 0
		}
    }
	componentWillUnmount(){
		this.isShow = false;
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
			const currenState = getCurrentStatus(data.signline,data.deadline,data.begin_date,data.end_date)
			if(this.isShow){
				this.setState({
					loading : false,
					cost : data.cost,
					state : currenState,
					category: category_txt
				})
			}
		}.bind(this));
	}
	render(){
		if(this.state.loading){
			return <div className="loading"><ActivityIndicator text="加载中..."/></div>
		}
		return(
			<Link to={{pathname:`/home/details/${this.props.id}`, query:{type: `${this.props.type}`} }} >
				<div className="rec_img">
					<div className="rec_state" dangerouslySetInnerHTML={{__html: `${this.state.state}`}} />
					<img src={`${getImageUrlPath(this.props.image)}`} />
				</div>
				<div className="rec_txt">
					<div className="title line2">{this.props.title}</div>
					<p><span className="tip">{this.state.category}</span> <span className="price">¥{this.state.cost}起</span></p>
				</div>
			</Link>
		)
	}
}
export default RecItem
