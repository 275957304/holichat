import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router';

import { TabBar } from 'antd-mobile';

import imgSrc from '../../images/icon_tabbar.png'
class Menu extends Component {
    constructor(props){
        super(props)
        this.state = {
            selectedTab: 'index',
            hidden: false,
        }
        this.renderContent = this.renderContent.bind(this)
    }
    componentWillMount(){
        this.setState({
            selectedTab : this.props.tab
        })
    }
    //renderContent(pageText) {
        //this.context.router.push(pageText)
        // return (
        //     <div>{pageText}</div>
        // );
    //}
    render() {
        return (
            <TabBar unselectedTintColor="#949494" tintColor="#33A3F4" barTintColor="white"  hidden={this.state.hidden} >

                <TabBar.Item  title="生活" key="生活" icon={require('../../images/icon_tabbar.png')} selectedIcon={require('../../images/icon_tabbar2.png')} selected={this.state.selectedTab === 'index'}  onPress={() => {this.setState({selectedTab: 'index'}) }} data-seed="logId">
                    gdsfdsfds
                </TabBar.Item>

                <TabBar.Item  title="活力圈" key="活力圈" icon={require('../../images/icon_tabbar.png')} selectedIcon={require('../../images/icon_tabbar2.png')}  selected={this.state.selectedTab === 'home'}  onPress={() => {this.setState({selectedTab: 'home'}) }} data-seed="logId1">
                    fafds
                </TabBar.Item>

                <TabBar.Item  title="消息" key="消息" icon={require('../../images/icon_tabbar.png')} selectedIcon={require('../../images/icon_tabbar2.png')}  selected={this.state.selectedTab === 'messages'}  onPress={() => {this.setState({selectedTab: 'messages'}) }}>
                    gdsfds
                </TabBar.Item>

                <TabBar.Item  title="我的" key="我的" icon={require('../../images/icon_tabbar.png')} selectedIcon={require('../../images/icon_tabbar2.png')}  selected={this.state.selectedTab === 'user'}  onPress={() => {this.setState({selectedTab: 'user'}) }}>
                    fdsfds
                </TabBar.Item>

            </TabBar>
        );
    }
}
export default Menu
