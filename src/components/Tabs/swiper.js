import React, {Component, PropTypes} from 'react'
import './style.less'

import $ from 'n-zepto'
import '../../utils/swiper/swiper.min.js';
import '../../utils/swiper/swiper.min.css';
// http://www.swiper.com.cn/api/Controller/2015/0308/216.html  双相控制
class EventTabs extends Component {
	constructor (props) {
		super(props)
	}
	componentDidMount(){
	    const tabsHeight = $("#tabsSwiper").height();
	    const headHeight = $(".header").height();
	    const setHeight = document.body.clientHeight - (tabsHeight + headHeight);
	    let tabsSwiper = new Swiper('#swiperContainer',{
	            speed:500,
				//nested:true,
				//preventClicks : true,
				//autoHeight: true,
				touchRatio:1,
				observer:true,//修改swiper自己或子元素时，自动初始化swiper
				observeParents:true,//修改swiper的父元素时，自动初始化swiper
	            onSlideChangeStart: function(){
	                $("#tabsSwiper .active").removeClass('active')
	                $("#tabsSwiper a").eq(tabsSwiper.activeIndex).addClass('active')
	            },
				onImagesReady : function(swiper){
					$('.brief_content').find('img').removeAttr("style");
				}
	        });
	        $("#swiperContainer").height(setHeight)
	        $("#tabsSwiper a").on('touchstart mousedown',function(e){
	            e.preventDefault()
	            $("#tabsSwiper .active").removeClass('active')
	            $(this).addClass('active')
	            tabsSwiper.slideTo( $(this).index() )
	        });
	        $("#tabsSwiper a").click(function(e){
	            e.preventDefault()
	        });
    }
	render(){
		//父组件 props设置 search来获取值
		return(
			<div className="event_type">
				<div id="tabsSwiper" className="tabs">
					{React.Children.map(this.props.children, (element, index) => {
						return (
							index == 0 ? <a className="active" href="javascript:;">{element.props.name}</a> : <a href="javascript:;">{element.props.name}</a>
						)
					})}
				</div>


				<div id="swiperContainer" className="swiper-container">
					<div className="swiper-wrapper">
						{React.Children.map(this.props.children, element => {
							return (
								<div className="swiper-slide">
									{element}
								</div>
							)
						})}
					</div>
				</div>
			</div>
		)
	}
}

export default EventTabs
