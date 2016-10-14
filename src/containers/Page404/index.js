import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router';
class Page404 extends Component {
    render(){
        return(
            <div>
				你所访问的页面丢失<br/>
                请返回<Link to="/">首页</Link>
            </div>
        )
    }
}
export default Page404
