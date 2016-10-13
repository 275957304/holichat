import React, {Component, PropTypes} from 'react'
import iScroll from '../../utils/iscroll/build/iscroll-probe'
import ReactIScroll from 'reactjs-iscroll';

import api from '../../api/'

class Iscroll extends Component {
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
		console.log('后回调函数')
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
		});

	}

	loadData(downOrUp, callback) {
		//console.log(downOrUp)
		const {currentPage} = this.state;
		//const url = `./json/person/${currentPage}.json`;
		const parameter = `community_cid=0&category_id=0&location_id=0&status=&official=0&cost=0&page_size=10&page=${currentPage}&event_type=0`;
		api.get_competition_list(parameter).then(
			function(json){
				console.log(json)
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
		const {list,pullUp, pullDown} = this.state;
		console.log(this.state)
		return(
			<ReactIScroll iScroll={iScroll} pullUp={pullUp} pullDown={pullDown} handleRefresh={this.handleRefresh}>
				<ul className="listBox">
					{list.map((item,index) =>
						<li key={index}>
							<p>{item.title}</p>
							<p>{item.name}</p>
							<p>{item.address}</p>
							<hr/>
						</li>
					)}
				</ul>
			</ReactIScroll>
		)
	}
}


export default Iscroll
