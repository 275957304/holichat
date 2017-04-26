import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router';
import { Result } from 'antd-mobile';
class Page404 extends Component {
    static contextTypes = {
         router: PropTypes.object.isRequired
    }
    backHome(){
        this.context.router.replace("/")
    }
    render(){
        return(
            <div>
                <Result
                imgUrl="https://zos.alipayobjects.com/rmsportal/NRzOqylcxEstLGf.png"
                title="404"
                message="页面丢失！"
                buttonText="返回首页"
                buttonType="ghost"
                buttonClick={() => this.backHome() }
                />
            </div>
        )
    }
}
export default Page404
