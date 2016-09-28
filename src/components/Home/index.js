import React, {Component, PropTypes} from 'react'
import { QueueAnim, Carousel, Row, Col } from 'antd';
import 'antd/lib/carousel/style/index.css';
import 'antd/lib/layout/style/index.css';

import activityIcon from '../../images/activity_icon.png'
import eventIcon from '../../images/event_icon.png'
import trainingIcon from '../../images/training_icon.png'

class Home extends Component {
    componentWillMount() {
        // fetch(API.get_community_banner)
        // .then((req) => req.json())
        // .then((json) => {
        //       if (json.ret === "0") {
        //           console.log(json);
        //         // 跳转
        //         //thiz.props.history.replaceState(null, '/dashboard')
        //     }
        //     console.log('网络错误')
        // })
    }
    render() {
        function onChange(a, b, c) {
          console.log(a, b, c);
        }
        return (
            <QueueAnim delay={300} style={{ textAlign: 'center', fontSize: 24, lineHeight: 2, marginTop: 0}}>
                <Carousel afterChange={onChange}>
                    <div><img className="img" src="http://holichat-res-inside.img-cn-hangzhou.aliyuncs.com/uploads/m/hr/61f9e5f3ac0038d9a5a2ec0548a5c7cf.jpg" /></div>
                    <div><img className="img" src="http://holichat-res-inside.img-cn-hangzhou.aliyuncs.com/uploads/m/hr/380aff9164de5d04b8e18c790c8b194d.jpg" /></div>
                </Carousel>
                <div className='menu'>
                    <ul className='box-flex'>
                        <li className="box-flex-item" key="m1"><img src={activityIcon} /><span>附近</span></li>
                        <li className="box-flex-item" key="m2"><img src={eventIcon} /><span>活动</span></li>
                        <li className="box-flex-item" key="m3"><img src={trainingIcon} /><span>赛事</span></li>
                        <li className="box-flex-item" key="m4"><img src={activityIcon} /><span>培训</span></li>
                        <li className="box-flex-item" key="m5"><img src={activityIcon} /><span>资讯</span></li>
                    </ul>
                </div>
                <div key="a">活力圈</div>
            </QueueAnim>
        );
    }
}

export default Home
