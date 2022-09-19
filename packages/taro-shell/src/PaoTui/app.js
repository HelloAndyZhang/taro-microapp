import { Component } from "react";
import {printLog} from '@/utils'
import "./app.scss";

export function withPaoTuiApp(Component) {
  return class App extends Component {
    constructor() {
      super(...arguments);
      printLog('App constructor');
      this.state = {
        name: 'PaoTui App'
      }
    }
    componentWillMount() {
      super.componentWillMount && super.componentWillMount();
      printLog('App will mount');
    }
    componentDidMount() {
      super.componentDidMount && super.componentDidMount();
      printLog('App did mount');

    }

    componentDidShow() {
      super.componentDidShow && super.componentDidShow();
      printLog('App did show');

    }

    componentDidCatchError() {
      super.componentDidCatchError && super.componentDidCatchError();
      printLog('App catch error');
    }
    onPageNotFound(res) {
      super.onPageNotFound && super.onPageNotFound(res);
    }
    // this.props.children 是将要会渲染的页面
    render() {
      return this.props.children;
    }
  };
}

export default withPaoTuiApp(Component);
