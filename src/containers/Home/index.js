import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as homeActions from '../../reducers/modules/home/action'
import { NavBar , Flex , ActivityIndicator, Popover, Icon, NoticeBar} from 'antd-mobile';
const Item = Popover.Item;
import { getItem } from '../../utils/'
import Menu from '../../components/Menu/'
import Slider from '../../components/Slider/'
import './home.css'
import Recommend from '../../components/RecommendList/'
import activityIcon from '../../images/btn_activity.png'
import eventIcon from '../../images/btn_competition.png'
import trainingIcon from '../../images/btn_training.png'
import logoImg from '../../images/logo_100.jpg'
class Home extends Component {
    static contextTypes = {
         router: PropTypes.object.isRequired
    }
    constructor(props) {
        super(props)
        this.city_name = '';
        this.state = {
            visible: false,
            selected: '',
        }
    }
    componentDidMount(){
        this.city_name = getItem('city_name')
        const { homeActions, dispatch } = this.props
        //活力圈首页广告
        homeActions.get_holichat_banner();
        //主页推荐 先加载10条
        homeActions.get_holichat_recommended_ad({page:1,page_size:10});
	}
    selectCity(){
        this.context.router.push("/city")
    }

    onSelect(opt) {
        // console.log(opt.props.value);
        this.setState({
        visible: false,
        selected: opt.props.value,
        });
    }

    handleVisibleChange(visible) {
    this.setState({
      visible,
    });
  }
    dowmApp(){
      window.location.href = "holichat://";
      setTimeout(function () {
          window.location.href = "http://www.holichat.com/down/";
      }, 1000);
    }
    render(){
        const { home } = this.props;
        return(
            <div className="wx_home">
                <NoticeBar style={{background:'#fff',borderTop:'1px solid #ddd',position:'fixed',bottom:0,width:'100%',zIndex:999,color:'#333'}} mode="closable">
                    <img onClick={this.dowmApp.bind(this)} style={{borderRadius:4,float:'left',margin:'6px 10px 0 0'}} src={logoImg} className="tab-icon" />
                    <p onClick={this.dowmApp.bind(this)}>更多精彩请点击下载</p>
                </NoticeBar>

                <NavBar iconName="environment-o" leftContent={this.city_name} mode="light" onLeftClick={this.selectCity.bind(this)} rightContent={
                <Popover
                    visible={this.state.visible}
                    overlay={[(<Item key="4" iconName="check-circle" data-seed="logId"><Link key="payed" to={{ pathname: "/user/payed"}} data-seed="logId">已报名</Link></Item>),
                    (<Item key="topay" iconName="pay-circle-o"><Link key="topay" to={{ pathname: "/user/topay"}}>未支付</Link></Item>)]}
                    popupAlign={{overflow: { adjustY: 0, adjustX: 0 }, offset: [-2, 15]}}
                    onVisibleChange={this.handleVisibleChange.bind(this)}
                    onSelect={this.onSelect.bind(this)}
                >
                    <div style={{height: '100%',padding: '0 0.3rem',marginRight: '-0.3rem',display: 'flex',alignItems: 'center',}}><Icon type="user" /></div>
                </Popover>
                }>活力圈</NavBar>

                {home.banner.is_banner ? <Slider autoplay={false} items={ home.banner.list } /> : ""}
                <div className="nav">
                    <Flex>
                        <Flex.Item>
                            <Link className="nav-link" to={{ pathname: "/home/list", query:{type: "activity" } }}>
                                <img className="nav-img" src={eventIcon} /> <div className="nav-txt">活动</div>
                            </Link>
                        </Flex.Item>
                        <Flex.Item>
                            <Link className="nav-link" to={{ pathname: "/home/list", query:{type: "event" } }}>
                                <img className="nav-img" src={trainingIcon} /> <div className="nav-txt">赛事</div>
                            </Link>
                        </Flex.Item>
                        <Flex.Item>
                            <Link className="nav-link" to={{ pathname: "/home/list", query:{type: "training" } }} >
                                <img className="nav-img" src={activityIcon} /> <div className="nav-txt">培训</div>
                            </Link>
                        </Flex.Item>
                        {/*<Flex.Item>
                            <Link className="nav-link" to="/home/news/">
                                <img className="nav-img" src={activityIcon} /> <div className="nav-txt">资讯</div>
                            </Link>
                        </Flex.Item>
                        <Flex.Item>
                            <Link className="nav-link" to="/home/lottery/">
                                <img className="nav-img" src={activityIcon} /> <div className="nav-txt">积分抽奖</div>
                            </Link>
                        </Flex.Item>*/}
                    </Flex>
                </div>

                <div className="hot-topics">
                    <div className="hot-topics-titlt"><Link className="rec_more" to={{pathname:`/home/recommend`}} >更多>></Link>推荐</div>
                    { home.recommend.loading ?  <div className="recommend"> <Recommend data={ home.recommend.list} /><Link className="rec_more_bottom" to={{pathname:`/home/recommend`}} >查看更多</Link></div> : <div className="loading"><ActivityIndicator text="加载中..."/></div> }
				</div>


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
