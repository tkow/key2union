import ts = require("typescript");

const createParmaeters = (paramNames,optionType?:string) => paramNames.map((str,index) => ts.createParameter(
  /*decorators*/ undefined,
  /*modifiers*/ undefined,
  /*dotDotDotToken*/ undefined,
  ts.createIdentifier(`${str}${index==1? '?':""}`),
  undefined,
  index===0 ? ts.createTypeReferenceNode('Tkeys',undefined):  ts.createTypeReferenceNode(optionType,undefined)
));

function createTfunc(argsNames) {
  const TParamer = 'T'
  const args = createParmaeters(argsNames,TParamer)
  const funcType = ts.createFunctionTypeNode(
    /*typeParameters*/ [ts.createTypeParameterDeclaration(TParamer,undefined,ts.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword))],
    args,
    /*type*/
    ts.createKeywordTypeNode(ts.SyntaxKind.StringKeyword)
  );
  return ts.createTypeAliasDeclaration(undefined, [ts.createModifier(ts.SyntaxKind.DeclareKeyword)], "TFunc", undefined, funcType);
}

function generateUnions(tKeys: string[]) {
  const paths = tKeys
      .map(ts.createStringLiteral)
      .map(ts.createLiteralTypeNode);
  const unionType = ts.createUnionTypeNode(paths);
  return ts.createTypeAliasDeclaration(undefined, [ts.createModifier(ts.SyntaxKind.DeclareKeyword)], "TKeys", undefined, unionType);
}

const resultFile = ts.createSourceFile(
  "someFileName.ts",
  "",
  ts.ScriptTarget.Latest,
  /*setParentNodes*/ false,
  ts.ScriptKind.TS
);

const printer = ts.createPrinter({
  newLine: ts.NewLineKind.LineFeed
});

const a = ['test','test.hoge']

const TKeys = printer.printNode(
  ts.EmitHint.Unspecified,
  generateUnions(a),
  resultFile
);

const TFunc = printer.printNode(
  ts.EmitHint.Unspecified,
  createTfunc(['a','b']),
  resultFile
);

console.log(TKeys);
console.log(TFunc);
