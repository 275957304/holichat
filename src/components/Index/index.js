import React, { Component, PropTypes } from 'react'
import Slider from '../Common/Slider/'
import './theme/index.css'
import Main from './main'
import TabsList from './tabs'
import Header from '../Common/Header/'

class Index extends Component {
  render() {
    // const {a, b, addNumber } = this.props;
	// console.log(this.props)
    return (
		<div className="wx_index">
			<Header title="活力圈" leftTo="quanzi" />
			<Slider source='get_community_banner' />
			<Main />
			<TabsList />
		</div>
    )
  }
}


export default Index
