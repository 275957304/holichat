import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router';
import './index.less'
class Header extends Component {
	render() {
		const { title , leftTo } = this.props;
		let left = null;
		if(leftTo === 'quanzi'){
			left = <Link to='/quanzi'><i className="icon icon_quanzhi"></i></Link>;
		}else if(leftTo === 'fanhui'){
			left = <a className="back_link" onClick={this.context.router.goBack}><i className="icon_back"></i></a>
		}
		return(
			<header className="header">
				<div className="header-left">
                    {left}
                </div>
				<h2 className="title">{title}</h2>
			</header>
		)
	}
}
Header.contextTypes = {
    router: PropTypes.object.isRequired,
	title : PropTypes.string
}
export default Header
