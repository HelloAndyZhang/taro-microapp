import { Component } from "react";
import "./app.scss";
class App extends Component {
  componentDidMount() {
    console.log('PaoTui App did mount');
  }

  componentDidShow() {
    console.log('PaoTui App did show');
  }

  componentDidHide() {}

  componentDidCatchError() {}

  // this.props.children 是将要会渲染的页面
  render() {
    return this.props.children;
  }
}

export default App;
