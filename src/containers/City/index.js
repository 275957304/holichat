import React, {Component, PropTypes} from 'react'
import { NavBar, Menu} from 'antd-mobile';
import { cityData } from '../../utils/address/'
import { setItem } from '../../utils/'
const data = cityData();
class City extends Component {
    static contextTypes = {
         router: PropTypes.object.isRequired
    }
    constructor(props){
        super(props);
    }
    componentWillMount(){
        console.log(data)
    }
    onChange(value){
        let label = '';
        let id ='';
        data.forEach((el) => {
            if (el.value === value[0]) {
                if (el.isLeaf) {
                    label = el.label;
                } else {
                    el.children.forEach((el2) => {
                        if (el2.value === value[1]) {
                            label = el2.label;
                            id = el2.value
                        }
                    });
                }
            }
        });
        setItem("city_id", id)
        setItem("city_name", label)
        this.context.router.goBack();
    }
    render(){
        return(
            <div className="wx_city">
                <NavBar mode="light" onLeftClick={() => this.context.router.goBack()}>选择地区</NavBar>
				<Menu data={data} height={document.documentElement.clientHeight - 40 } onChange={this.onChange.bind(this)} />
            </div>
        )
    }
}
export default City
