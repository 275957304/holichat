import React, {Component, PropTypes} from 'react'

class Result extends Component {
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
			<div className="result">
				请去看props成绩
			</div>
		)
	}
}
export default Result
