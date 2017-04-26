import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router';
import './style.css'

import imgSrc from '../../images/icon_tabbar.png'
class Menu extends Component {
    constructor(props){
        super(props)
    }
    render() {
        const { tab } = this.props;
		const setCur ={index:"",home:"",messages:"",user:""};
        setCur[tab]= 'tab-bar-item-on';
        return (
            <nav className="tab-bar">
                <Link to="/" className={`tab-bar-item ${setCur.index}`}>
                    <img src={imgSrc} className="tab-icon" />
                    <p className="tab-text">圈子</p>
                </Link>
                <Link to="/home" className={`tab-bar-item ${setCur.home}`}>
                    <img src={imgSrc} className="tab-icon" />
                    <p className="tab-text">活力圈</p>
                </Link>
                <Link to="/messages" className={`tab-bar-item ${setCur.messages}`}>
                    <img src={imgSrc} className="tab-icon" />
                    <p className="tab-text">消息</p>
                </Link>
                <Link to="/user" className={`tab-bar-item ${setCur.user}`}>
                    <img src={imgSrc} className="tab-icon" />
                    <p className="tab-text">我的</p>
                </Link>
            </nav>
        );
    }
}
export default Menu
