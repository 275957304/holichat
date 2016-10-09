import React, {Component, PropTypes} from 'react'
import Header from '../../components/Header/'

class Messages extends Component {
    render(){
        return(
            <div className="wx_messages">
                <Header title="消息" />
				消息中心
            </div>
        )
    }
}
export default Messages
