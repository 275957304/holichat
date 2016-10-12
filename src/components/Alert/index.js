import React, {Component, PropTypes} from 'react'
import './alert.css'
class Alert extends Component {
	constructor (props) {
		super(props)
		this.state = {
			show: true,
			loadingTimer: null,
		}
	}
	static propTypes = {
		message:PropTypes.string.isRequired,
		loading: PropTypes.bool
	}
	// componentWillMount() {
	//
    // }
	componentDidMount () {
		this.state.loadingTimer = setTimeout(()=> {
			this.setState({show: false});
		}, 5000);
	}
	componentWillUnmount() {
        this.state.loadingTimer && clearTimeout(this.state.loadingTimer);
    }
	render(){
		//console.log(this.state.show)
		return(
			<div style={{display: this.state.show ? 'block' : 'none'}}>
				<div className="weui-mask_transparent"></div>
				<div className="weui-toast">
					{ this.props.loading  ? <i className="weui-loading weui-icon_toast"></i> :"" }
					<div className="weui-toast__content">{this.props.message}</div>
				</div>
			</div>
		)
	}
}
// Alert.propTypes = {
//     message: PropTypes.string.isRequired,
// };

//  <Alert loading={true}  message={'longs'} />  说明  loading 是否开启加载小图标

export default Alert
