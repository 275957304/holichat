import React, {Component, PropTypes} from 'react'
import Header from '../../components/Header/'
import Menu from '../../components/Menu/'

class Messages extends Component {
    render(){
        return(
            <div className="wx_messages">
                <Header title="消息" />
				消息中心
                <Menu tab="messages" />
            </div>
        )
    }
}
export default Messages
