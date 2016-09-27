import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router';

import imgSrc from '../../images/icon_tabbar.png'
class Footer extends Component {

    render() {
        return (
            <nav className="weui-tabbar">
                <Link to="/" className="weui-tabbar__item weui-bar__item_on">
                    <img src={imgSrc} className="weui-tabbar__icon" />
                    <p className="weui-tabbar__label">圈子</p>
                </Link>
                <Link to="/home" className="weui-tabbar__item">
                    <img src={imgSrc} className="weui-tabbar__icon" />
                    <p className="weui-tabbar__label">活力圈</p>
                </Link>
                <Link to="/messages" className="weui-tabbar__item">
                    <img src={imgSrc} className="weui-tabbar__icon" />
                    <p className="weui-tabbar__label">消息</p>
                </Link>
                <Link to="/user" className="weui-tabbar__item">
                    <img src={imgSrc} className="weui-tabbar__icon" />
                    <p className="weui-tabbar__label">我的</p>
                </Link>
            </nav>
        );
    }
}

export default Footer
