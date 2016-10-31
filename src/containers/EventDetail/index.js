import React, {Component, PropTypes} from 'react'
import Header from '../../components/Header/'
import './detail.less'

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
            <div className="event_detail">
                <Header title="赛事" leftTo="fanhui" />


                <div className="weui-media-box weui-media-box_appmsg white_bj">
                    <div className="weui-media-box__hd">
                        <img className="weui-media-box__thumb" src="#" alt=""/>
                    </div>
                    <div className="weui-media-box__bd">
                        <h4 className="weui-media-box__title">图片吧</h4>
                        <p className="weui-media-box__desc">的运行轨道。</p>
                        <p className="weui-media-box__desc">按钮</p>
                    </div>
                </div>






                <div className="weui-footer_fixed-bottom">
                    <a href="javascript:;" className="weui-btn weui-btn_warn">我要报名</a>
                </div>
            </div>
        )
    }
}

export default EventDetail
