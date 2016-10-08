import React, {Component, PropTypes} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class Toast extends Component {
	constructor(props, context) {
		super(props, context)
		//this.state = { show: true }
	}
	componentWillMount () {
		const { dispatch } = this.props
		setTimeout(()=> {
            //this.setState({show: false});
			dispatch({
				type: 'PAGE_DIALOG_CLOSE',
				payload: {
					msg: false,
					msgTxt : ''
				}
			})
			console.log(this.props)
        }, 2000);
		
	}
    render() {
        const {txt} = this.props;
        return (
			<div className="weui-toast">
				<p className="weui-toast__content">{txt}</p>
			</div>
        );
    }
}

const mapStateToProps = (state) => ({
	status : state.status
});
export default connect(mapStateToProps)(Toast)