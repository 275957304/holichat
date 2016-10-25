import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router';

import imgSrc from '../../images/icon_tabbar.png'
class Menu extends Component {
    constructor(props){
        super(props)
    }
    render() {
        const { tab } = this.props;
		const setCur ={index:"",home:"",messages:"",user:""};
        setCur[tab]= 'weui-bar__item_on';
        return (
            <nav className="weui-tabbar">
                <Link to="/" className={`weui-tabbar__item ${setCur.index}`}>
                    <img src={imgSrc} className="weui-tabbar__icon" />
                    <p className="weui-tabbar__label">圈子</p>
                </Link>
                <Link to="/home" className={`weui-tabbar__item ${setCur.home}`}>
                    <img src={imgSrc} className="weui-tabbar__icon" />
                    <p className="weui-tabbar__label">活力圈</p>
                </Link>
                <Link to="/messages" className={`weui-tabbar__item ${setCur.messages}`}>
                    <img src={imgSrc} className="weui-tabbar__icon" />
                    <p className="weui-tabbar__label">消息</p>
                </Link>
                <Link to="/user" className={`weui-tabbar__item ${setCur.user}`}>
                    <img src={imgSrc} className="weui-tabbar__icon" />
                    <p className="weui-tabbar__label">我的</p>
                </Link>
            </nav>
        );
    }
}
export default Menu
