import { Component } from "react";
import AppJS from './PaoTui/app.js';
import "./app.scss";
class App extends AppJS{
  componentDidMount() {
    super.componentDidMount&&super.componentDidMount();
  }

  componentDidShow() {
    super.componentDidShow&&super.componentDidShow();
  }

  componentDidHide() {
    super.componentDidHide&&super.componentDidHide();
  }

  componentDidCatchError() {
    super.componentDidCatchError&&super.componentDidCatchError();
  }

  // this.props.children 是将要会渲染的页面
  render() {
    return this.props.children;
  }
}

export default App;
