import { Component } from 'react';
import { printLog } from '@/utils';
import { Provider } from 'react-redux'
import store from '@/store'
import './app.scss';
export default class App extends Component {
  constructor() {
    printLog('App constructor', 'Root');
    super(...arguments);
  }
  componentWillMount(options) {
    printLog('App will mount', 'Root');
    super.componentWillMount && super.componentWillMount(options);
  }
  componentDidMount(options) {
    printLog('App did mount', 'Root');
    super.componentDidMount && super.componentDidMount(options);
  }

  componentDidShow(options) {
    printLog('App did Show', 'Root');
    super.componentDidShow && super.componentDidShow(options);
  }

  componentDidCatchError(options) {
    super.componentDidCatchError && super.componentDidCatchError(options);
  }
  onPageNotFound(res) {
    super.onPageNotFound && super.onPageNotFound(res);
  }
  // this.props.children 是将要会渲染的页面
  render() {
    return <Provider store={store}>{this.props.children}</Provider>
  }
}
