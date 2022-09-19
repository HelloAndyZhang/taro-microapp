import { Component } from "react";
import {printLog} from '@/utils'
import "./app.scss";

export function withJiaZhengApp(Component) {
  return class App extends Component {
    constructor(){
      super(...arguments);
      printLog( 'App constructor','JiaZheng');
      this.state = {
        name: 'JiaZheng App'
      }
    }
    componentWillMount() {
      super.componentWillMount && super.componentWillMount();
      printLog(' App will mount','JiaZheng');
    }

    componentDidMount() {
      super.componentDidMount && super.componentDidMount();
      printLog(' App did mount','JiaZheng');

    }

    componentDidShow() {
      super.componentDidShow && super.componentDidShow();
      printLog(' App did show','JiaZheng');
    }



    componentDidCatchError() {
      super.componentDidCatchError && super.componentDidCatchError();
      printLog('App catch error','JiaZheng');
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

export default withJiaZhengApp(Component);
