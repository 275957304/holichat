import React, {Component, PropTypes} from 'react'
import './style.less'

class Tabs extends Component {
	constructor (props) {
		super(props)
		this.state = {
			currentIndex : 0
		}
	}
	componentDidMount(){

    }
	titles(index){
		return index===this.state.currentIndex ? "current" : "";
	}
	content(index){
		return index===this.state.currentIndex ? "tab_item show" : "tab_item";
	}
	render(){
		//父组件 props设置 search来获取值
		return(
			<div className="tab">
				<ul className="tab_nav">
					{React.Children.map(this.props.children, (element, index) => {
						return (
							<li onClick={()=>{ this.setState({currentIndex:index})} } className={ this.titles(index) }>{ element.props.name }</li>
						)
					})}
				</ul>
				<div className="tab_content">
					{React.Children.map(this.props.children, (element,index) => {
						return (
							<div className={ this.content(index) }>
								{element}
							</div>
						)
					})}
				</div>
			</div>
		)
	}
}
export default Tabs

/*

<Tabs>
	<div name='简介' key="1">
		a
	</div>
	<div name='详情' key="2">
		b
	</div>
</Tabs>

*/
