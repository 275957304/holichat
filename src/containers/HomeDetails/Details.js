import React, {Component, PropTypes} from 'react'

class Details extends Component {
	static propTypes = {
        data: PropTypes.string.isRequired
    }
	constructor(props){
		super(props);
		this.height = document.body.clientHeight - 120;
		this.html = '';
	}
	componentDidMount(){
		const detailsTxt = document.getElementById('detailsTxt');
		const imgs = detailsTxt.getElementsByTagName('img');
		// const addEleme = detailsTxt.getElementsByTagName('*')
		// for (let i = 0; i < addEleme.length; i++) {
		// 	addEleme[i].style.fontSize = 'auto'
		// 	if(!addEleme[i].style.fontSize == ""){
		// 		addEleme[i].setAttribute('style','')
		// 	}
		// }

		for(let i=0; i<imgs.length; i++){
			if(imgs[i].getAttribute('style')){
				imgs[i].setAttribute('style','')
			}
		}

	}
	render(){
		return(
			<div style={{minHeight:this.height}} className="brief_content">
				<div id="detailsTxt" dangerouslySetInnerHTML={{__html: `${this.props.data.replace(/(font(?:-size)?:)[0-9]{1,2}(px;)/g,"")}`}} />
			</div>
		)
	}
}
export default Details
