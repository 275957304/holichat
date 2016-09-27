import React, {Component, PropTypes} from 'react'
import API from '../../utils/apis'
import { QueueAnim, Carousel  } from 'antd';
import 'antd/lib/carousel/style/index.css';

console.log(API.get_community_banner)


class Home extends Component {

    componentWillMount() {
        fetch(API.get_community_banner)
        .then((req) => req.json())
        .then((json) => {
              if (json.ret === "0") {
                  console.log(json);
                // 跳转
                //thiz.props.history.replaceState(null, '/dashboard')
            }
            console.log('网络错误')
        })

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

                <div key="a">活力圈</div>
            </QueueAnim>
        );
    }
}

export default Home
