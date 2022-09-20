import { getOptions } from 'loader-utils';
import { Project, SourceFile } from 'ts-morph'
import type * as webpack from 'webpack'
let  count = 0
export default  function (this: webpack.LoaderContext<any>, source: string) {
  this.cacheable && this.cacheable()
  // console.log(getOptions(this))
  let project = new Project()
  // // if(count > 1) return source
  count++
  console.log(count)
  // console.log(source,'jojojojojo')
  // let sourceFile:SourceFile = project.createSourceFile("__tempfile__.ts", source);
  // sourceFile.addImportDeclaration({
  //   namedImports: ["withPaoTuiApp"],
  //   moduleSpecifier: './PaoTui/app.js'
  // })
  // let   mainClasses = sourceFile.getClass("App")!;
  // let mainConstructors = mainClasses?.getConstructors()
  // mainClasses.addDecorator({
  //   name: "withPaoTuiApp",
  // });
  // mainConstructors[0].addStatements('console.log(123);');
  return   `console.log(123); ${source}`
}
