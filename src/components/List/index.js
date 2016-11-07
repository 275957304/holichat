import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router';
import iScroll from '../../utils/iscroll/iscroll-probe'
import ReactIScroll from 'reactjs-iscroll';
import { httpRequest, getImageUrlPath, isExist } from '../../api/'
import { getCategory, getCurrentStatus } from '../../utils/'

class List extends Component {
	static propTypes = {
        url: PropTypes.string.isRequired,
        param: PropTypes.object.isRequired,
        type: PropTypes.string.isRequired
    }
	constructor(props) {
		super(props);
		this.handleRefresh = this.handleRefresh.bind(this);
		this.state = {
			scrollHeight : 1000,
			list: [],
			pullUp: true,
			pullDown: false,
			currentPage: 1,
			lastPage: false
		};
	}

	componentWillMount() {
		//设置滚动区域的高度
		this.setState({scrollHeight: window.screen.height - 126});
		//window.addEventListener('touchmove', function(e){e.preventDefault()})
		this.loadData();
	}
	componentWillUnmount(){
		//window.addEventListener('touchmove', function(e){e.preventDefault()})
	}
	//调用 IScroll refresh 后回调函数
	handleRefresh(downOrUp, callback) {
		//console.log('后回调函数')
		//真实的世界中是从后端取页面和判断是否是最后一页
		let {currentPage, lastPage} = this.state;
		// 加载更多
		if (downOrUp === 'up') {
			if (currentPage === 10) {
				lastPage = true;
			} else {
				currentPage++;
			}
		} else { // 刷新
			lastPage = false;
			currentPage = 1;
		}
		this.setState({
			currentPage,
			lastPage
		}, () => {
			this.loadData(downOrUp, callback);
		})
	}

	loadData(downOrUp, callback) {
		const {currentPage} = this.state
		const param = this.props.param
		console.log(param)
		param['page'] = currentPage;
		httpRequest(this.props.url,param).then(function(data){
			const {list} = this.state;
			this.setState({
				list: downOrUp === 'up' ?   this.state.list.concat(data.list)  : data.list
			})
			if (callback && typeof callback === 'function') {
				callback();
			}
		}.bind(this))
	}
	render(){
		const {list, pullUp, pullDown} = this.state;
		const { type } = this.props;
		//跟椐类型 获取id
		const getid = `${type}_id`;
		return(
			<div style={{height: this.state.scrollHeight}} className="iscroll_main">
				<ReactIScroll iScroll={iScroll} pullUp={pullUp} pullDown={pullDown} handleRefresh={this.handleRefresh}>
					<div className="weui-panel__bd panel_iscroll">
						{list.map((item,index) =>
							<Link key={index} to={{ pathname: `/home/details/${item[getid]}`, query:{type: `${type}` } }}  className="weui-media-box weui-media-box_appmsg">
								<div className="weui-media-box__hd">
									<img className="weui-media-box__thumb" src={getImageUrlPath(item.logo_image) +'@150h_150w_1e_1c_10-2ci'} />
								</div>
								<div className="weui-media-box__bd">
									<h4 className="weui-media-box__title">{item.title}</h4>
									<div className="weui-media-list__desc">
										<span className="orange">¥{item.cost}</span>
									</div>
									<div className="weui-media-list__desc">
										<span className="category">{getCategory(item.sports_category_id)}</span>
										<div className="list_state" dangerouslySetInnerHTML={{__html: `${getCurrentStatus(item.signline,item.deadline,item.begin_date,item.end_date)}`}} />
									</div>
								</div>
							</Link>
						)}
					</div>
				</ReactIScroll>
			</div>
		)
	}
}

export default List
