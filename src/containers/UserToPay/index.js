import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import './style.less'
import { NavBar, ListView, ActivityIndicator, Toast} from 'antd-mobile'
import { httpRequest, getImageUrlPath } from '../../api/'
import PayItem from './payItem'
const NUM_ROWS = 10;  //加载几条
const dataSource = new ListView.DataSource({
  rowHasChanged: (row1, row2) => row1 !== row2,
});
///user/topay
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
        params['page'] = this.pageIndex;
        this.setState({ isLoading: true });
        httpRequest( 'get_user_no_pay_act_list' , params).then(function(data){
            if(data.list.length > 0 ){
                const listData = this.state.list;
                this.rData = { ...this.rData, ...this.genData( this.pageIndex ) };
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(this.rData),
                    isLoading: false,
                    list : this.state.list.concat(data.list)
                })
            }else{
                console.log('没有更多内容了')
                this.setState({isComplete: true,isEmpty:true,isLoading:false})
            }
        }.bind(this))
    }
	onEndReached(event) {
        this.pageIndex++
        this.getListData();
	}

	stateFailure(){
        Toast.info('订单失效了!',1);
    }

	render(){
		const time = new Date().getTime();
		const row = (rowData, sectionID, rowID) => {
            const val = this.state.list[this.index++];
            if(val){
				//console.log(val)
				let deadlineDate = val.deadline.substring(0,10).split('-');
				deadlineDate = Date.parse(deadlineDate[1] + '/' + deadlineDate[2] + '/' + deadlineDate[0] + ' ' + val.deadline.substring(10));
				if(time > deadlineDate){
					return (
						<div onClick={this.stateFailure} className="list_link">
						    <div className="box_hd">
						        <div className="img_hd"><img src={`${getImageUrlPath(val.logo_image)}@150h_150w_1e_1c_10-2ci`} alt=""/></div>
						        <div className="flex_hd">
						            <div className="line2">{val.title}</div>
						            <div className="dose">
						                <span className="t_gray">￥{val.enroll_amount}</span>
						                <div className="pull-right t_gray">订单失效</div>
						            </div>
						        </div>
						    </div>
						</div>
	                )
				}else if(val.is_confirm == 'S' || val.enroll_status == 'S'){
					//console.log('审核通过待支付')
					return <PayItem paystate="审核通过待支付" {...val} />
				}else{
					//console.log('待支付')
					return <PayItem paystate="待支付" {...val} />
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
    		<div className="user_topay">
    			<NavBar mode="light" onLeftClick={() => this.context.router.goBack()}>待支付</NavBar>
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
