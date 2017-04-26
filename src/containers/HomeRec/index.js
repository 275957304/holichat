import React, {Component, PropTypes} from 'react'
import { NavBar, ListView, Toast, ActivityIndicator } from 'antd-mobile';
import { httpRequest } from '../../api/'
import { getItem } from '../../utils/'
import RecItem from '../../components/RecommendList/item'
const NUM_ROWS = 10;  //加载几条
const dataSource = new ListView.DataSource({
  rowHasChanged: (row1, row2) => row1 !== row2,
});
class Event extends Component {
    static contextTypes = {
         router: PropTypes.object.isRequired
    }
    constructor(props) {
        super(props);
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
			dataSource: dataSource.cloneWithRows(this.rData),
			isLoading: false,
            list : []
	    };
	}

    componentDidMount(){
        this.getListData();
    }
    getListData(){
        if(this.state.isLoading) return
        const city_id = getItem('city_id')
		const param = {page_size:NUM_ROWS,location_id:city_id}
        param['page'] = this.pageIndex;

        this.setState({ isLoading: true });
        httpRequest('get_holichat_recommended_ad',param).then(function(data){
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
                this.setState({isLoading: true})
            }

        }.bind(this))
    }
    onEndReached(event) {
        this.pageIndex++
        this.getListData();
	}
    renderFooter(){
        if(this.state.isLoading){
            return <ActivityIndicator text="加载中..." />
        }else{
            return <div style={{ padding:15, textAlign:'center' }}>加载完毕 </div>
        }
    }
    render(){
        const row = (rowData, sectionID, rowID) => {
            const item = this.state.list[this.index ++ ];
            if(item) {
                return <RecItem key={rowID} title={item.title} image={item.image} type={JSON.parse(item.action).type} id={parseInt(JSON.parse(item.action).data.id,10)} />
            }else{
                return <span></span>
            }
		}
        if(this.state.list.length == '0'){
            return <div className="loading"><ActivityIndicator text="加载中..."/></div>
        }
        return(
            <div className="recommend">
                <NavBar mode="light" onLeftClick={() => this.context.router.goBack()}>推荐</NavBar>
                <ListView
    	          dataSource={this.state.dataSource}
    	          renderFooter={ () => this.renderFooter.bind(this) }
    	          renderRow={row}
    	          pageSize={4}
    	          scrollRenderAheadDistance={500}
    	          scrollEventThrottle={20}
    	          useBodyScroll
    	          onEndReached={this.onEndReached.bind(this)}
    	          onEndReachedThreshold={10}
    	        />
            </div>
        )
    }
}
export default Event
