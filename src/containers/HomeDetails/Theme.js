import React, {Component, PropTypes} from 'react'

class Theme extends Component {
	static propTypes = {
        //type: PropTypes.string.isRequired,
        //data: PropTypes.object.isRequired
    }
	constructor(props) {
        super(props);
		//this.activeIndex = this.activeIndex.bind(this);
    }
	render(){
		return(
			<div className="theme">
				精彩瞬间
			</div>
		)
	}
}
export default Theme
