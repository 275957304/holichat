import React, {Component, PropTypes} from 'react'

class Content extends Component {
    //。您使用ES6类，这意味着getInitialState不被支持。你需要改变这样的：
    // getInitialState(){
    //     return {
    //         inputText:'',
    //     };
    // }
    constructor(props) {
        super(props);
        this.state = {inputText: '' };
    }
    handleChange(event){
        this.setState({inputText:event.target.value});
    }
    handleClick(){
        console.log("props name is " + this.props.selectName + " \n and inputText is "  + this.state.inputText);
    }
    render(){
        return (
            <div>
              <textarea onChange = {this.handleChange} placeholder = "please input something!"></textarea>
              <button onClick = {this.handleClick}>sumbit</button>
            </div>
        )
    }

}


class Home extends Component {

      constructor(props) {
          super(props);
          this.state = {names:["Tom","Axiba","daomul"], selectName: '' };
      }


      handleSelect(){
        this.setState(
            {selectName : event.target.value}
          );
      }
    render() {
        var options = [];
        //往options中添加子option
        for (var option in this.state.names) {
          options.push(<option key={option} value={this.state.names[option]}> {this.state.names[option]}  </option>)
        };
        return (
            <div>
              <Content selectName = {this.state.selectName}>
              </Content>
              <select onChange = {this.handleSelect}>
                {options}
              </select>
            </div>
        );
    }
}










/*
import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component{
    constructor(){
        super();
        this.state = {increasing:false}
        this.do_update = this.update.bind(this);
    }
    update(){
        ReactDOM.render(
            <App val={this.props.val+1} />,
            document.getElementById('app')
        );
    }
    componentWillReceiveProps(nextProps){
        this.setState({increasing: (nextProps.val > this.props.val) })
    }
    render(){
        return <button onClick={this.update}>{this.props.val}</button>
    }
}
*/


App.defaultProps = {val:0}
ReactDOM.render(<App />,document.getElementById('app'))













export default Home
