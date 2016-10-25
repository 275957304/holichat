import React, {Component, PropTypes} from 'react'
import Header from '../../components/Header/'
import Alert from '../../components/Alert/'
import TypeSelect from '../../components/TypeSelect/'
import SearchBar from '../../components/SearchBar/'
import List from '../../components/List/'
import './event.less'

class Event extends Component {
    constructor(props){
        super(props)
        // cost:0为全价格,1为收费,2为免费
        // event_type:0为活力圈所有赛事列表,1为社团赛事和最新赛事列表,2社团推荐赛事列表,3为活力圈推荐赛事列表
        // category_id:赛事类型
        // official:0为全部,1为官方
        // status:N为项目预告,R为报名中,E为报名结束,P为进行中,C为己结束,NR为项目预告+报名中
        this.state = {
            url:'get_competition_list',
            param : {
                community_cid:0,
                event_type : 0,
                category_id:0,
                location_id:0,
                status :'',
                official : 0,
                cost : 0,
                page_size :10
            }
        };
        this.handleSearch = this.handleSearch.bind(this);
    }

    componentDidMount(){

    }

    handleSearch(val){
        //this.setState({url:})
        console.log('获取搜索内容' + val)
    }

    // componentDidMount() {
	// 	window.addEventListener('scroll', this.handleScroll.bind(this));
	// }
	// componentWillUnmount() {
	// 	window.removeEventListener('scroll', this.handleScroll.bind(this));
	// }
    //
	// handleScroll(e) {
	// 	console.log(e);
	// 	console.log('浏览器滚动事件');
	// }

    render(){
        console.log(this.state)
        return(
            <div className="wx_event">
                <Header title="赛事" leftTo="fanhui" />
                <SearchBar search={this.handleSearch} />
                <TypeSelect />
                <List url={this.state.url}  type='event'  param={this.state.param} />
            </div>
        )
    }
}
export default Event
