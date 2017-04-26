import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as itemActions from '../../reducers/modules/item/action'
import { NavBar, Tabs, Toast ,ActivityIndicator, Button} from 'antd-mobile';
const TabPane = Tabs.TabPane;
import BtnState from './BtnState';
import './detail.less'
import { httpRequest } from '../../api/'
import Introduction from './Introduction'
import Details from './Details'
// import Result from './Result'
// import Theme from './Theme'

//import EventTabs from '../../components/Tabs/'

class HomeDetails extends Component {
    static contextTypes = {
         router: PropTypes.object.isRequired
    }
    constructor(props){
        super(props);
        this.title = '列表页';
        this.notes = "";
        this.TabPane = true;
        this.animated = true;
        this.state = {
            type : '',
            id : 0,
            notes_show : false
        }
        this.activeIndex = this.activeIndex.bind(this);
    }
    componentDidMount() {
        const { params, itemActions } = this.props;
        const types = this.props.location.query.type;
        //设置属性与id
        this.setState({type: types, id: params.id})
        //获取简介信息
        if(types == 'activity'){
            this.title = "活动"
            itemActions.get_introduction('get_activity_introduction',{'activity_id':params.id})
        }else if(types == 'event'){
            this.title = "赛事"
            itemActions.get_introduction('get_competition_introduction',{'event_id':params.id})
        }else if(types == 'training'){
            this.title = "培训"
            itemActions.get_introduction('get_training_introduction',{'training_id':params.id})
        }
    }
    activeIndex(index){
        //console.log(index)
        const type = this.state.type
        const id = this.state.id
        const { itemActions } = this.props;
        //获取成绩数据
		if(index === 3 && (type == 'activity')){
            itemActions.get_result('get_activity_result',{'activity_id':id})
        }else if(index === 3 && (type == 'event')){
            itemActions.get_result('get_competition_result',{'event_id':id})
        }else if(index === 3 && (type == 'training')){
            itemActions.get_result('get_training_result',{'training_id':id})
        }

        if(index === 3){
            console.log('请调精彩瞬间接口')
        }

    }
    componentWillReceiveProps(nextProps){
        // if (this.props.item.notes.is_notes !== nextProps.item.notes.is_notes) {
        //     nextProps.item.notes.data != " " ? this.setState({notes_show:true}) : this.notesNext()
        // }
    }
    componentWillUnmount(){
        //window.location.reload();
    }
    //报名需知
    isApplys(){
        //这里检查手机号码
        Toast.loading("加载中...", 0);
        let url = "";
        let param = ""
        if(this.state.type == 'activity'){
            url = 'get_activity_enroll_info'; param = {'activity_id':this.state.id}
        }else if(this.state.type == 'event'){
            url = 'get_competition_enroll_info'; param = {'event_id':this.state.id}
        }else if(this.state.type == 'training'){
            url = 'get_training_enroll_info'; param = {'training_id':this.state.id}
        }
        httpRequest(url, param).then((data) =>{
            Toast.hide()
            if(data.notes == ''){
                this.notesNext();
            }else{
                this.notes = data.notes;
                this.setState({notes_show:true})
            }
        })
    }
    notesBack(){
        this.setState({notes_show:false})
    }
    notesNext(){
        this.context.router.push({
            pathname: `/home/enroll/${this.state.id}`,
            query: {
                type: `${this.state.type}`
            }
        });
    }
    render(){
        const { item } = this.props;
        // data.data.notes  判断是否有 notes  报名段知    get_competition_enroll_info
        if(this.state.notes_show){
            return (<div className="notes">
                <NavBar mode="light" onLeftClick={this.notesBack.bind(this)}>报名须知</NavBar>
                <div className="notes_detail">
                    {this.notes}
                </div>
                <div className="footer_fixed-bottom">
                    <Button onClick={this.notesBack.bind(this)} inline style={{width:'50%'}}>不同意</Button>
                    <Button onClick={this.notesNext.bind(this)} inline style={{width:'50%'}} className="am-button btn_warn">同意</Button>
                </div>
            </div>)
        }
        if(!item.loading){
            return(
                <div className="event_detail">
                    <NavBar mode="light" onLeftClick={() => this.context.router.goBack()}>{this.title}</NavBar>
                    <Tabs destroyInactiveTabPane={this.TabPane} animated={false} onChange={this.activeIndex}>
                        <TabPane tab="简介" key="1">
                            <Introduction type={this.state.type}  data={item.brief} />
                        </TabPane>
                        <TabPane tab="详情" key="2">
                            <Details data={item.brief.content} />
                        </TabPane>
                    </Tabs>
                    <div className="footer_fixed-bottom">
    					<BtnState isApply={this.isApplys.bind(this)} begin_date={item.brief.begin_date} deadline={item.brief.deadline}  end_date={item.brief.end_date}  signline={item.brief.signline} />
    				</div>
                </div>
            )
        }
        return <div className="loading"><NavBar mode="light" onLeftClick={() => this.context.router.goBack()}>{this.title}</NavBar><ActivityIndicator text="加载中..."/></div>
    }
}

export default connect(
   state => ({
       item : state.item
   }),
   dispatch => ({
       itemActions: bindActionCreators(itemActions, dispatch)
   })
)(HomeDetails)
