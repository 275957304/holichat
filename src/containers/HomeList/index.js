import React, {Component, PropTypes} from 'react'
import Header from '../../components/Header/'
import Alert from '../../components/Alert/'
import TypeSelect from '../../components/TypeSelect/'
import SearchBar from '../../components/SearchBar/'
import List from '../../components/List/'
import './event.less'
let setUrl = '' //设置列表URL
let setType = '' //设置类型
let title = '列表页';
class Tab extends Component{
    render(){
        return <div>{this.props.children}</div>
    }
}



class Event extends Component {
    constructor(props){
        super(props)
        // cost:0为全价格,1为收费,2为免费
        // event_type:0为活力圈所有赛事列表,1为社团赛事和最新赛事列表,2社团推荐赛事列表,3为活力圈推荐赛事列表
        // category_id:赛事类型
        // official:0为全部,1为官方
        // status:N为项目预告,R为报名中,E为报名结束,P为进行中,C为己结束,NR为项目预告+报名中
        this.state = {
            community_cid:0,
            category_id:0,
            location_id:0,
            status :'',
            official : 0,
            cost : 0,
            page_size :10
        };
        this.handleSearch = this.handleSearch.bind(this);
    }

    componentWillMount(){
        const types = this.props.location.query.type
        if(types == 'activity'){
            this.setState(Object.assign({}, this.state , {activity_type:'0'}))
            title = '活动'
            setType = 'activity'
            setUrl = 'get_activity_list'
        }else if(types == 'event'){
            this.setState(Object.assign({}, this.state , {event_type:'0'}))
            setType = 'event'
            title = '赛事'
            setUrl = 'get_competition_list'
        }else if(types == 'training'){
            this.setState(Object.assign({}, this.state , {training_type:'0'}))
            title = '培训'
            setType = 'training'
            setUrl = 'get_training_list'
        }
    }

    handleSearch(val){
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
        return(
            <div className="wx_event">
                <Header title={title} leftTo="fanhui" />
                <SearchBar search={this.handleSearch} />
                <TypeSelect>
                    <Tab name="全类型">
                        <div className="red"/>
                    </Tab>
                    <Tab name="全赛事">
                        <div className="blue"/>
                    </Tab>
                    <Tab name="全价格">
                        <div className="yellow"/>
                    </Tab>
                    <Tab name="全状态">
                        <div className="yellow"/>
                    </Tab>
                </TypeSelect>
                <List url={setUrl} type={setType} param={this.state} />
            </div>
        )
    }
}
export default Event
