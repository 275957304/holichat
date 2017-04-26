import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router';
import { httpRequest, getImageUrlPath, isExist } from '../../api/'
import { getCategory, getCurrentStatus } from '../../utils/'
import { ListView, Toast, ActivityIndicator, Result, Tag  } from 'antd-mobile';
import { getAddress } from '../../utils/address/'
import './list.less'
const NUM_ROWS = 10;  //加载几条
const dataSource = new ListView.DataSource({
  rowHasChanged: (row1, row2) => row1 !== row2,
});
class List extends Component {
	static propTypes = {
        url: PropTypes.string.isRequired,
        param: PropTypes.object.isRequired,
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
        const { url, param } = this.props;
        let params = param;
        //console.log('第几页' + this.pageIndex)
        params['page'] = this.pageIndex;
        this.setState({ isLoading: true });
        //isMounted
        httpRequest( url , params).then(function(data){
            if(data.length > 0 ){
                this.rData = { ...this.rData, ...this.genData( this.pageIndex ) };
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(this.rData),
                    isLoading: false,
                    list : this.state.list.concat(data)
                })
            }else{
                Toast.info("没有更多内容",1)
                console.log('没有更多内容了')
                this.setState({isComplete: true,isEmpty:true,})
            }

        }.bind(this))
    }
	onEndReached(event) {
        //console.log(event)
        this.pageIndex++
        this.getListData();
	}
	render(){
		const row = (rowData, sectionID, rowID) => {
            const val = this.state.list[this.index++];
            if(val){
                let type
                switch (val.b_type) {
                    case 'E': type = 'event'; break;
                    case 'A': type = 'activity'; break;
                    case 'T': type = 'training'; break;
                }
    			return (
                    <Link key={rowID} to={{ pathname: `/home/details/${val.b_id}`, query:{type: `${type}`} }}   className="list_link">
                        <div className="box_hd">
                            <div className="img_hd"><img src={`${getImageUrlPath(val.logo_image)}@170h_170w`} alt=""/></div>
                            <div className="flex_hd">
                                <div className="line2">{val.title}</div>
                                <div className="dose"><span className="red price"><i>¥</i>{val.cost}</span> <span style={{borderColor:'#ff7a7a',color:'#ff7a7a'}} className="tag">{getCategory(val.sports_category_id)}</span></div>
                                <div className="dose"><span>{val.begin_date.substr(5,5)}开始</span> </div>
                            </div>
                            <div className="flex_right" dangerouslySetInnerHTML={{__html: `${getCurrentStatus(val.signline,val.deadline,val.begin_date,val.end_date)}`}} />
                        </div>
                    </Link>
    			)
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
            <div className="list">
                <ListView
                    dataSource={this.state.dataSource}
                    //renderFooter={() => <div style={{ padding:20, textAlign: 'center' }}>{ this.state.isLoading ? <ActivityIndicator text="加载中..."/> : '没有更多'} </div> }
                    renderRow={row}
                    className="am-list"
                    pageSize={4}
                    scrollRenderAheadDistance={500}
                    scrollEventThrottle={20}
                    onScroll={() => { console.log('onScroll'); }}
                    style={{ height: document.body.clientHeight - 44}}
                    onEndReached={this.onEndReached.bind(this)}
                    onEndReachedThreshold={10}
                />
            </div>
		)
	}
}

export default List
