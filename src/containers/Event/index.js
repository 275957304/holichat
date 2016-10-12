import React, {Component, PropTypes} from 'react'
import Header from '../../components/Header/'
import Alert from '../../components/Alert/'
import SearchBar from '../../components/SearchBar/'

class Event extends Component {
    constructor(props){
        super(props)
        this.handleSearch = this.handleSearch.bind(this)
    }
    handleSearch(val){
        console.log('获取搜索内容' + val)
    }
    render(){
        //console.log(this.props)
        return(
            <div className="wx_event">
                <Header title="赛事" leftTo="fanhui" />
                <div className="fixed">
                    <SearchBar search={this.handleSearch} />
                </div>
                fdsfsdfdsfdsfds
            </div>
        )
    }
}
export default Event
