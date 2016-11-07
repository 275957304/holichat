import React, {Component, PropTypes} from 'react'

class Details extends Component {
	static propTypes = {
        data: PropTypes.string.isRequired
    }
	componentDidMount(){
		const detailsTxt = document.getElementById('detailsTxt');
		const imgs = detailsTxt.getElementsByTagName('img')
		for(let i=0; i<imgs.length; i++){
			if(!imgs[i].getAttribute('style')){
				imgs[i].setAttribute('style','')
			}
		}
	}
	render(){
		return(
			<div className="brief_content">
				<div id="detailsTxt" dangerouslySetInnerHTML={{__html: `${this.props.data}`}} />
			</div>
		)
	}
}
export default Details
