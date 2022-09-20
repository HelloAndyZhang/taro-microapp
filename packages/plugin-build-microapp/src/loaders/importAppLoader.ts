import { getOptions } from 'loader-utils'
import type * as webpack from 'webpack'

export default function (this: webpack.LoaderContext<any>, source: string) {
  this.cacheable && this.cacheable()
  // const options = getOptions(this)
  // console.log(options)
  // console.log('-----')
  // console.log(source)
  return source
  // if (options.type === 'app') {
  //   appLoader.call(this, source)
  // } else {
  //   pageLoader.call(this, source)
  // }
}
