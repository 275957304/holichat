import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router';
import './style.less'
import { NavBar, ListView, ActivityIndicator, Toast} from 'antd-mobile';
import { httpRequest, getImageUrlPath, isExist } from '../../api/'
const NUM_ROWS = 10;  //加载几条
const dataSource = new ListView.DataSource({
  rowHasChanged: (row1, row2) => row1 !== row2,
});
// /user/payed
class UserToPay extends Component {
	static contextTypes = {
		router: PropTypes.object.isRequired
	}
	constructor(props){
		super(props)
		this.index = 0;
        this.pageIndex = 1;
		this.genData = (pIndex = 1) => {
			const dataBlob = {};
			for (let i = 0; i < NUM_ROWS; i++) {
				const ii = (pIndex * NUM_ROWS) + i;
				dataBlob[`${ii}`] = `row - ${ii}`;
			}
			return dataBlob;
		};
	    this.rData = this.genData();
		this.state =  {
            isComplete : false,
            isEmpty : false,
			dataSource: dataSource.cloneWithRows(this.rData),
			isLoading: false,
            list : []
	    };
	}

	componentDidMount(){
        this.getListData();
    }
	//加载数据
    getListData(){
        if(this.state.isComplete) return
        let params = {page_size:10};
        //console.log('第几页' + this.pageIndex)
        params['page'] = this.pageIndex;
        this.setState({ isLoading: true });
        //isMounted
        httpRequest( 'get_user_act_list' , params).then(function(data){
			console.log(data.list)
            if(data.list.length > 0 ){
                const listData = this.state.list;
                this.rData = { ...this.rData, ...this.genData( this.pageIndex ) };
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(this.rData),
                    isLoading: false,
                    list : this.state.list.concat(data.list)
                })
            }else{
                //Toast.info("没有更多内容")
                console.log('没有更多内容了')
                this.setState({isComplete: true,isEmpty:true,isLoading:false})
            }

        }.bind(this))
    }
	onEndReached(event) {
        this.pageIndex++
        this.getListData();
	}

    stateAudit(){
        Toast.info('审核中!!!',1);
    }

    stateNot(){
        Toast.info('审核未通过!!!',1);
    }

	render(){
		const row = (rowData, sectionID, rowID) => {
            const val = this.state.list[this.index++];
            console.log(val)
            if(val){
                const pay_status = val.pay_status;
                const enroll_status = val.enroll_status;
                const is_confirm = val.is_confirm;
                let types = '';
                switch (val.enroll_type.toUpperCase()) {
                    case 'A': types = 'activity';  break;
                    case 'E': types = 'event';  break;
                    case 'T': types = 'training';  break;
                }
                if(enroll_status == "NF" || enroll_status == "NL"){
                    return (
                        <div onClick={this.stateAudit} className="list_link">
    						<div className="box_hd">
    							<div className="img_hd"><img src={`${getImageUrlPath(val.logo_image)}@150h_150w_1e_1c_10-2ci`} alt={val.title}/></div>
    							<div className="flex_hd">
    								<div className="line2">{val.title}</div>
    								<div className="dose">
    									<span className="t_green">￥{val.enroll_amount}</span>
                                        <div className="pull-right t_red">审核中</div>
    								</div>
    							</div>
    						</div>
    					</div>
                    )
                }else if(enroll_status == "F"){
                    return (
                        <div onClick={this.stateNot} className="list_link">
    						<div className="box_hd">
    							<div className="img_hd"><img src={`${getImageUrlPath(val.logo_image)}@150h_150w_1e_1c_10-2ci`} alt={val.title}/></div>
    							<div className="flex_hd">
    								<div className="line2">{val.title}</div>
    								<div className="dose">
    									<span className="t_green">￥{val.enroll_amount}</span>
                                        <div className="pull-right t_gray">审核未通过</div>
    								</div>
    							</div>
    						</div>
    					</div>
                    )
                }else if(enroll_status == "S" || enroll_status == "E"){
                    if ( is_confirm == "S" && ( pay_status == "S" || pay_status == "E" ) ){
                        return (
                          <Link to={{ pathname: `/home/info/${val.org_act_id}`, query:{type: `${types}`, enroll: `${val.enroll_id}` } }} className="list_link">
      						<div className="box_hd">
      							<div className="img_hd"><img src={`${getImageUrlPath(val.logo_image)}@150h_150w_1e_1c_10-2ci`} alt={val.title}/></div>
      							<div className="flex_hd">
      								<div className="line2">{val.title}</div>
      								<div className="dose">
      									<span className="t_green">￥{val.enroll_amount}</span>
                                        <div className="pull-right t_green">已支付</div>
      								</div>
      							</div>
      						</div>
      					</Link>
                        )
                    }
                }
            }else{
                return <span></span>
            }
		}

		if(this.state.list.length == '0' && this.state.isEmpty){
            return <Result imgUrl="https://os.alipayobjects.com/rmsportal/MKXqtwNOLFmYmrY.png" title="内容为空"/>
        }

        if(this.state.list.length == '0'){
            return <div className="loading"><ActivityIndicator text="加载中..."/></div>
        }

		return(
    		<div className="user_payed">
    			<NavBar mode="light" onLeftClick={() => this.context.router.goBack()}>已报名</NavBar>
    			<ListView
    				dataSource={this.state.dataSource}
    				renderFooter={() => <div style={{ textAlign: 'center' }}>{ this.state.isLoading ? <ActivityIndicator text="加载中..."/> : '没有更多'} </div> }
    				renderRow={row}
    				className="am-list"
    				pageSize={4}
    				scrollRenderAheadDistance={500}
    				scrollEventThrottle={20}
    				onScroll={() => { console.log('onScroll'); }}
    				useBodyScroll
    				onEndReached={this.onEndReached.bind(this)}
    				onEndReachedThreshold={10}
    			/>
    		</div>
		)
	}
}
export default UserToPay
