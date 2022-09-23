import { getOptions } from 'loader-utils';
import { Project, SourceFile } from 'ts-morph';
export default function (source: string) {
  this.cacheable && this.cacheable();
  const options = getOptions(this) || {};
  let project = new Project();
  let sourceFile: SourceFile = project.createSourceFile(
    '__tempfile__.ts',
    source,
  );
  let mainClasses = sourceFile.getClass('App')!;
  if (mainClasses) {
    for (let appPackage of options.appPackages) {
      const prefix = 'with';
      const appName = appPackage.replace('/a', 'A');
      const path = `./${appPackage}.js`;
      const name = `${prefix}${appName}`;
      sourceFile.addImportDeclaration({
        namedImports: [name],
        moduleSpecifier: path,
      });
      mainClasses.addDecorator({
        name: name,
      });
    }
  }
  this.callback(null, sourceFile.getFullText());
  return;
}
