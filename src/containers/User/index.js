import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router';
import './user.less'
import Menu from '../../components/Menu/'
import {NavBar, Icon} from 'antd-mobile';
import followedIcon from '../../images/user/icon_followed.png'
import payedIcon from '../../images/user/icon_payed.png'
import topayIcon from '../../images/user/icon_topay.png'

import inviteCodeIcon from '../../images/user/icon_invite_code.png'
import settingsIcon from '../../images/user/icon_settings.png'
import holichatIcon from '../../images/user/icon_holichat.png'

import userBackgroud1 from '../../images/user/user_backgroud_1.jpg'
import userBackgroud2 from '../../images/user/user_backgroud_2.jpg'
import userBackgroud3 from '../../images/user/user_backgroud_3.jpg'
import userBackgroud4 from '../../images/user/user_backgroud_4.jpg'
import userBackgroud5 from '../../images/user/user_backgroud_5.jpg'
import userBackgroud6 from '../../images/user/user_backgroud_6.jpg'

class User extends Component {
  constructor(props){
    super(props)
    this.changeUserBackgroud = this.changeUserBackgroud.bind(this);
  }
  changeUserBackgroud(){
    console.log('changeUserBackgroud')
  }
  render(){
      return(
          <div className="wx_user">

            <div key="userInfo" className="nav user_head">
              <Link className="nav_link" to="/user/userInfo">
                <img className="user_head_img" src={topayIcon}/>
              </Link>
              <p>UserName</p>
              <p>UserId</p>
            </div>

			<NavBar mode="light" onLeftClick={() => this.context.router.goBack()}>消息</NavBar>

            <div className="white_bj">
              <img className="backgroud_img" src={userBackgroud6} onClick={this.changeUserBackgroud}/>
            </div>

            <div className="weui-flex nav">
              <div className="weui-flex__item" key="topay">
                <Link className="nav_link" to="/user/topay/">
                  <img className="icon_img" src={topayIcon}/>
                </Link>
                <div>待支付</div>
              </div>

              <div className="weui-flex__item" key="payed">
                <Link className="nav_link" to="/user/payed/">
                  <img className="icon_img" src={payedIcon}/>
                </Link>
                <div>已报名</div>
              </div>

              <div className="weui-flex__item" key="followed">
                <Link className="nav_link" to="/user/followed/">
                  <img className="icon_img" src={followedIcon}/>
                </Link>
                <div>已关注</div>
              </div>
            </div>

            <div className="weui-panel__bd">
              <div key="inviteCode">
                <Link to="/user/inviteCode" className="weui-cell weui-cell_access weui-cell_link">
                  <div className="weui-cell__hd">
                    <img className="icon_img" src={inviteCodeIcon}/>
                  </div>
                  <div className="weui-cell__bd">邀请码</div>
                  <div className="weui-cell__ft f12"></div>
                </Link>
              </div>

              <div key="settings">
                <Link to="/user/settings" className="weui-cell weui-cell_access weui-cell_link">
                  <div className="weui-cell__hd">
                    <img className="icon_img" src={settingsIcon}/>
                  </div>
                  <div className="weui-cell__bd">设置</div>
                  <div className="weui-cell__ft f12"></div>
                </Link>
              </div>

              <div key="about">
                <Link to="/user/about" className="weui-cell weui-cell_access weui-cell_link">
                  <div className="weui-cell__hd">
                    <img className="icon_img" src={holichatIcon}/>
                  </div>
                  <div className="weui-cell__bd">关于活力圈</div>
                  <div className="weui-cell__ft f12"></div>
                </Link>
              </div>
            </div>

            <Menu tab="user" />
          </div>
      )
  }
}
export default User
