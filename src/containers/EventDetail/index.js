import React, {Component, PropTypes} from 'react'
import Header from '../../components/Header/'
import './detail.css'

class EventDetail extends Component {
    constructor(props){
        super(props)
    }

    componentWillMount() {
        const {dispatch, params} = this.props;
        const {type, name} = params;
        console.log(this.props.params.id)
    }

    render(){
        return(
            <div className="wx_event">
                <Header title="赛事" leftTo="fanhui" />
                详情页面<br/>
                详情页面<br/>
                详情页面<br/>
                详情页面<br/>
            </div>
        )
    }
}

export default EventDetail
