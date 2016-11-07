import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as homeActions from '../../reducers/modules/home/action'
import Header from '../../components/Header/'
import Menu from '../../components/Menu/'
import Slider from '../../components/Slider/'
import './home.less'

import Recommend from '../../components/RecommendList/'

import activityIcon from '../../images/activity_icon.png'
import eventIcon from '../../images/event_icon.png'
import trainingIcon from '../../images/training_icon.png'

class Home extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount(){
        const { homeActions, dispatch } = this.props
        //活力圈首页广告
        homeActions.get_holichat_banner();

        //主页推荐 先加载10条
        homeActions.get_holichat_recommended_ad({page:1,page_size:10});
	}
    render(){
        const { home } = this.props;
        //console.log(this.props)
        return(
            <div className="wx_home">
                <Header title="活力圈" leftTo="fanhui" />
                {home.banner.is_banner ? <Slider autoplay={false} items={home.banner.list} /> : ""}
                <div className="weui-flex nav white_bj">

                    <div className="weui-flex__item" key="activity">
                        <Link className="nav_link" to={{ pathname: "/home/list", query:{type: "activity" } }}>
                            <img className="nav_img" src={eventIcon} /> <div className="nav_name">活动</div>
                        </Link>
                    </div>

                    <div className="weui-flex__item" key="event">
                        <Link className="nav_link" to={{ pathname: "/home/list", query:{type: "event" } }}>
                            <img className="nav_img" src={trainingIcon} /> <div className="nav_name">赛事</div>
                        </Link>
                    </div>

                    <div className="weui-flex__item" key="training">
                        <Link className="nav_link" to={{ pathname: "/home/list", query:{type: "training" } }} >
                            <img className="nav_img" src={activityIcon} /> <div className="nav_name">培训</div>
                        </Link>
                    </div>

                    <div className="weui-flex__item" key="news">
                        <Link className="nav_link" to="/home/news/">
                            <img className="nav_img" src={activityIcon} /> <div className="nav_name">资讯</div>
                        </Link>
                    </div>

                    <div className="weui-flex__item" key="lottery">
                        <Link className="nav_link" to="/home/lottery/">
                            <img className="nav_img" src={activityIcon} /> <div className="nav_name">积分抽奖</div>
                        </Link>
                    </div>

				</div>
                <div className="hot_topics white_bj">
                    <div className="weui-cells__title">推荐</div>
                    { home.recommend.loading ?  <Recommend data={ home.recommend.list} /><a>更多</a> : '加载中...' }
				</div>

                <Menu tab="home" />
            </div>
        )
    }
}

export default connect(
   state => ({
       home : state.home
   }),
   dispatch => ({
       homeActions: bindActionCreators(homeActions, dispatch)
   })
)(Home)
