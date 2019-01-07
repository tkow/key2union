import ts = require("typescript");

function makeFactorialFunction() {
  const functionName = ts.createIdentifier("factorial");
  const paramName = ts.createIdentifier("n");
  const parameter = ts.createParameter(
    /*decorators*/ undefined,
    /*modifiers*/ undefined,
    /*dotDotDotToken*/ undefined,
    paramName
  );

  const condition = ts.createBinary(
    paramName,
    ts.SyntaxKind.LessThanEqualsToken,
    ts.createLiteral(1)
  );

  const ifBody = ts.createBlock(
    [ts.createReturn(ts.createLiteral(1))],
    /*multiline*/ true
  );
  const decrementedArg = ts.createBinary(
    paramName,
    ts.SyntaxKind.MinusToken,
    ts.createLiteral(1)
  );
  const recurse = ts.createBinary(
    paramName,
    ts.SyntaxKind.AsteriskToken,
    ts.createCall(functionName, /*typeArgs*/ undefined, [decrementedArg])
  );
  const statements = [ts.createIf(condition, ifBody), ts.createReturn(recurse)];

  return ts.createFunctionDeclaration(
    /*decorators*/ undefined,
    /*modifiers*/ [ts.createToken(ts.SyntaxKind.ExportKeyword)],
    /*asteriskToken*/ undefined,
    functionName,
    /*typeParameters*/ undefined,
    [parameter],
    /*returnType*/ ts.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword),
    ts.createBlock(statements, /*multiline*/ true)
  );
}

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
    /*typeParameters*/ [ts.createTypeParameterDeclaration(TParamer)],
    args,
    /*type*/
    ts.createKeywordTypeNode(ts.SyntaxKind.StringKeyword)
  );
  return ts.createTypeAliasDeclaration(undefined, undefined, "TFunc", undefined, funcType);
}

const a = ['test','test.hoge']

function generateUnions(tKeys: string[]) {
  const paths = tKeys
      .map(ts.createStringLiteral)
      .map(ts.createLiteralTypeNode);
  const unionType = ts.createUnionTypeNode(paths);
  return ts.createTypeAliasDeclaration(undefined, undefined, "TKeys", undefined, unionType);
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
