import React, {Component, PropTypes} from 'react'
import Header from '../../components/Header/'
import Alert from '../../components/Alert/'
import SearchBar from '../../components/SearchBar/'
import List from '../../components/List/'
import './event.css'


class Event extends Component {
    constructor(props){
        super(props)
        this.handleSearch = this.handleSearch.bind(this)
    }
    handleSearch(val){
        console.log('获取搜索内容' + val)
    }

    componentDidMount() {
		window.addEventListener('scroll', this.handleScroll.bind(this));
	}
	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll.bind(this));
	}

	handleScroll(e) {
		console.log(e);
		console.log('浏览器滚动事件');
	}

    render(){
        //console.log(this.props)
        return(
            <div className="wx_event">
                <Header title="赛事" leftTo="fanhui" />
                <div className="fixed">
                    <SearchBar search={this.handleSearch} />
                </div>
                <div className="iscroll_main">
                    <List url='get_competition_list' />
                </div>

                滚动加载
                https://github.com/fisshy/react-scroll
            </div>
        )
    }
}
export default Event
