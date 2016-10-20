import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router';
import iScroll from '../../utils/iscroll/iscroll-probe'
import ReactIScroll from 'reactjs-iscroll';
import api from '../../api/'
import './list.css'
import { getCategory, getCurrentStatus } from '../../utils/'

class List extends Component {
	static propTypes = {
        url: PropTypes.string.isRequired,
        parameter: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired
    }

	constructor(props) {
		super(props);
		this.handleRefresh = this.handleRefresh.bind(this);
		this.state = {
			list: [],
			pullUp: true,
			pullDown: false,
			currentPage: 1,
			lastPage: false
		};
	}

	componentWillMount() {
		console.log(this.props.apis)
		this.loadData();
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
		const {currentPage} = this.state;
		const url = api[this.props.url];
		//获取参数
		const parameter = `${this.props.parameter} + ${currentPage}`;
		url(parameter).then(
			function(json){
				setTimeout(() => {
					const {list} = this.state;
					this.setState({
						list: downOrUp === 'up' ?   this.state.list.concat(json.data.list)  : json.data.list
					})
					if (callback && typeof callback === 'function') {
						callback();
					}
				},500);
			}.bind(this)
		);
	}

	//console.log(iScroll)   https://github.com/reactjs-ui/reactjs-iscroll/blob/master/examples/paging.js  异步加载
	// reactjs-iscroll https://github.com/reactjs-ui/reactjs-iscroll/blob/master/src/scripts/index.js
	render(){
		//https://www.npmjs.com/package/reactjs-iscroll    加载 https://github.com/reactjs-ui/reactjs-iscroll/blob/master/examples/pullOption.js
		//<div list={list} className="scrillBox">{this.props.children}</div>

		// <Link params={{id: 1}} to={`/article/${index}`} query={{type: 'Original'}} state={{title: item.title}}>
		//   {item.title}
		// </Link>
		const {list, pullUp, pullDown} = this.state;
		const { type } = this.props;
		//跟椐类型 获取id
		const getid = `${type}_id`;
		console.log(list)
		return(
			<ReactIScroll iScroll={iScroll} pullUp={pullUp} pullDown={pullDown} handleRefresh={this.handleRefresh}>
				<div className="weui-panel__bd panel_iscroll">
					{list.map((item,index) =>
						<Link key={index} to={`/home/${type}/`} query={{id: item[getid]}} className="weui-media-box weui-media-box_appmsg">
							<div className="weui-media-box__hd">
								<img className="weui-media-box__thumb" width="60" src={api.getImg(item.logo_image) +'@150h_150w_1e_1c_10-2ci'} />
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
		)
	}
}

export default List
