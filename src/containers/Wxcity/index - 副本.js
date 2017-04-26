import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router';
import { NavBar, SearchBar, Tabs} from 'antd-mobile';
const TabPane = Tabs.TabPane;
import List from '../../components/List/'
import './style.less'

class Wxcity extends Component {
    static contextTypes = {
        router: PropTypes.object.isRequired
    }
    constructor(props){
        super(props);
        this.state = {
            searchValue : '',
            is_search : false,
            list:{
                community_cid:0,
                category_id:0,
                location_id:0,
                status :'',
                official : 0,
                cost : 0,
                page_size :10
            }
        }
    }
    searchVal(val){
        if(val == ''){
            Toast.info('搜索内容不能为空',1);
            return false;
        }
        console.log(val)
    }
    onChange(value) {
        this.setState({searchValue: value});
    }
    callback(val){

        console.log(val)

    }
    render(){
        console.log(this.props)
        return(
            <div className="wx_city">
				<NavBar mode="light">这里做城市服务</NavBar>
                <div className="list_search">
                    <SearchBar value={this.state.searchValue} placeholder="搜索" cancelText="搜索" showCancelButton={false}  onCancel={ (val) => this.searchVal(val.trim()) } onChange={this.onChange.bind(this)}/>
                </div>

                <Tabs defaultActiveKey="event" onChange={this.callback.bind(this)}>
                    <TabPane tab="赛事" key="event">
                        赛事列表
                    </TabPane>
                    <TabPane tab="活动" key="activity">
                        活动列表
                    </TabPane>
                    <TabPane tab="培训" key="training">
                        培训列表
                    </TabPane>
                </Tabs>

            </div>
        )
    }
}
export default Wxcity
