import React, {Component, PropTypes} from 'react'
import { NavBar, SearchBar, Toast} from 'antd-mobile';
import List from '../../components/List/'
import { getItem } from '../../utils/'
import './event.less'

class Tab extends Component{
    render(){
        return <div>{this.props.children}</div>
    }
}
class Event extends Component {
    static contextTypes = {
         router: PropTypes.object.isRequired
    }
    constructor(props){
        super(props)
        this.listHeight = document.body.clientHeight - 80;
        this.listUrl = '';
        this.searchUrl = '';
        this.title = '列表页';
        this.type = '';
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

    componentWillMount(){
        const cityid = getItem("city_id") || '000000';
        this.type = this.props.location.query.type
        if(this.type == 'activity'){
            this.setState({list :  Object.assign({}, this.state.list, {activity_type:'0',location_id:cityid} ) })
            this.title = '活动'
            this.type = 'activity'
            this.listUrl = 'get_activity_list'
        }else if(this.type == 'event'){
            this.setState({list :  Object.assign({}, this.state.list, {event_type:'0',location_id:cityid} ) })
            this.type = 'event'
            this.title = '赛事'
            this.listUrl = 'get_competition_list'
        }else if(this.type == 'training'){
            this.setState({list :  Object.assign({}, this.state.list, {training_type:'0',location_id:cityid} ) })
            this.title = '培训'
            this.type = 'training'
            this.listUrl = 'get_training_list'
        }
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
	//}

    onChange(value) {
        this.setState({searchValue: value});
    }

    clear() {
        this.setState({ searchValue: ''});
    }

    searchVal(val){
        if(val == ''){
            Toast.info('搜索内容不能为空',1);
            return false;
        }
        if(this.type == 'activity'){
            this.searchUrl = 'search_activity_list'
        }else if(this.type == 'event'){
            this.searchUrl = 'search_competition_list'
        }else if(this.type == 'training'){
            this.searchUrl = 'search_training_list'
        }
        this.setState({
            list :  Object.assign({}, this.state.list, {content:val} ),
            is_search : true,
            searchValue : ''
        })
    }
    backList(){
        this.setState({is_search : false})
    }
    render(){
        console.log(this.searchUrl)
        //搜索输出
        if(this.state.is_search){
            return(
                <div className="wx_event search_list">
                    <NavBar mode="light" onLeftClick={this.backList.bind(this)}>{this.title}</NavBar>
                    <List url={this.searchUrl} type={this.type} param={this.state.list} />
                </div>
            )
        }
        return(
            <div className="wx_event">
                <NavBar mode="light" onLeftClick={() => this.context.router.goBack()}>{this.title}</NavBar>
                <SearchBar value={this.state.searchValue} placeholder="搜索" cancelText="搜索" showCancelButton={false}  onCancel={ (val) => this.searchVal(val.trim()) } onChange={this.onChange.bind(this)}/>
                <List height={this.listHeight} url={this.listUrl} type={this.type} param={this.state.list} />
            </div>
        )
    }
}
// Event.contextTypes = {
//     router: PropTypes.object.isRequired,
// }
export default Event
