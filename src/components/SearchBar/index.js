import React, {Component, PropTypes} from 'react'
import './search.css'
class SearchBar extends Component {
	constructor (props) {
		super(props)
		this.state = {Search : false}
		this.handleSearch = this.handleSearch.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
		this.searchInput = this.searchInput.bind(this);
	}

	handleSearch(){
		this.setState({ Search: true })
	}
	handleCancel(){
		this.setState({ Search: false })
	}
	searchInput(){
		let txt = this.refs.searchTxt.value.trim();
		this.refs.searchTxt.value ="";
		this.setState({ Search: false });
		this.props.search(txt);
	}
	render(){
		//父组件 props设置 search来获取值
		return(
			<div className={`weui-search-bar ${ this.state.Search ? 'weui-search-bar_focusing' : ''}`}>
				<form className="weui-search-bar__form">
					<div className="weui-search-bar__box">
						<i className="weui-icon-search"></i>
						<input type="search" className="weui-search-bar__input" onBlur={this.searchInput} ref="searchTxt" placeholder="搜索" required/>
						<a href="javascript:" className="weui-icon-clear" id="searchClear"></a>
					</div>
					<label onClick={this.handleSearch} className="weui-search-bar__label" id="searchText">
						<i className="weui-icon-search"></i>
						<span>搜索</span>
					</label>
				</form>
				<a href="javascript:" onClick={this.handleCancel} className="weui-search-bar__cancel-btn">取消</a>
			</div>
		)
	}
}

export default SearchBar
