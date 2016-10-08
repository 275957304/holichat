import React, {Component, PropTypes} from 'react'

class Header extends Component {
	constructor(props) {
        super(props)
		this.state = {
			show: true
		}
    }
	componentWillMount () {
		console.log(this.props.site)
	}
	componentWillReceiveProps (nextProps){
		
	}
    render() {
        return (
            <header className="header">
                <h1>活力圈</h1>
            </header>
        );
    }
}

Header.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default Header
