import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router';
// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
// import * as itemActions from '../../reducers/modules/item/action'
import { NavBar, SearchBar, Tabs, Toast} from 'antd-mobile';
const TabPane = Tabs.TabPane;
import List from '../../components/List/'
import SearchList from '../../components/List/search.js'
//import { getItem } from '../../utils/'
import './style.less'

class Wxcity extends Component {
    static contextTypes = {
        router: PropTypes.object.isRequired
    }
    constructor(props){
        super(props);
        this.listHeight = document.body.clientHeight - 130;
        //this.cityId = getItem("city_id") || '0';
        this.state = {
            searchValue : '',
            is_search : false,
            event:{community_cid:100039,category_id:0,location_id:0,status:'',official :0,cost : 0,page_size :10,event_type : 1, location_id:0 },
            activity:{community_cid:100039,category_id:0,location_id:0,status:'',official :0,cost : 0,page_size :10,activity_type : 1, location_id: 0 },
            training:{community_cid:100039,category_id:0,location_id:0,status:'',official :0,cost : 0,page_size :10,training_type : 1, location_id: 0 },
            search:{community_cid:100039,key:'',page_size :10}
        }
    }
    componentWillMount(){
        //设置城市服务
        //this.props.itemActions.setCity()
        window.sessionStorage.setItem("source", 'wxcity');
    }
    searchVal(val){
        if(val == ''){
            Toast.info('搜索内容不能为空',1);
            return false;
        }
        this.setState({is_search: true,search:Object.assign({},this.state.search,{key:this.state.searchValue})});
        console.log(val)
    }
    onChange(value) {
        this.setState({searchValue: value});
    }
    backList(){
        this.setState({is_search : false})
    }
    render(){
        if(this.state.is_search){
            return(
                <div className="search_list">
                    <NavBar mode="light" onLeftClick={this.backList.bind(this)}>搜索列表</NavBar>
                    <SearchList url="get_global_search_result" param={this.state.search} />
                </div>
            )
        }
        return(
            <div className="wx_city">
                <NavBar mode="light" onLeftClick={() => this.context.router.goBack()}>城市服务</NavBar>
                <div className="list_search">
                    <SearchBar value={this.state.searchValue} placeholder="搜索" cancelText="搜索" showCancelButton={false}  onCancel={ (val) => this.searchVal(val.trim()) } onChange={this.onChange.bind(this)}/>
                </div>
                <Tabs animated={false} defaultActiveKey="event">
                    <TabPane tab="赛事" key="event">
                        <List height={this.listHeight} url="get_competition_list" type="event" param={this.state.event} />
                    </TabPane>
                    <TabPane tab="活动" key="activity">
                        <List height={this.listHeight} url="get_activity_list" type="activity" param={this.state.activity} />
                    </TabPane>
                    <TabPane tab="培训" key="training">
                        <List height={this.listHeight} url="get_training_list" type="training" param={this.state.training} />
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}
// const mapStateToProps = (state) => {
// 	return {
// 		item : state.item
// 	}
// }
// const mapDispatchToProps = (dispatch) => {
// 	return {
//         itemActions: bindActionCreators(itemActions, dispatch)
// 	}
// }
// export default connect(mapStateToProps,mapDispatchToProps)(Wxcity)

export default Wxcity
