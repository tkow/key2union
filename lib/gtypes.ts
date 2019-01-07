import ts = require("typescript");

const createParmaeters = (params:ArgumentType[]) => params.map((param) => ts.createParameter(
  /*decorators*/ undefined,
  /*modifiers*/ undefined,
  /*dotDotDotToken*/ undefined,
  ts.createIdentifier(param.identifier),
  undefined,
  param.parameterType
));

type ArgumentType = {
  identifier: string
  parameterType: ts.TypeNode
}

function createTfunc(params:ArgumentType[]) {
  const TParamer = 'T'
  const args = createParmaeters(params)
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

const printer = ts.createPrinter({
  newLine: ts.NewLineKind.LineFeed
});

export function makeTFuncDifinition (flattenKeys:string[]) {
  const resultFile = ts.createSourceFile(
    "eval.ts",
    "",
    ts.ScriptTarget.Latest,
    /*setParentNodes*/ false,
    ts.ScriptKind.TS
  );

  const TKeys = printer.printNode(
    ts.EmitHint.Unspecified,
    generateUnions(flattenKeys),
    resultFile
  );

  const TFunc = printer.printNode(
    ts.EmitHint.Unspecified,
    createTfunc([
      {
        identifier:'Tkeys',
        parameterType:ts.createTypeReferenceNode('Tkeys',undefined)
      },
      {
        identifier:'option',
        parameterType: ts.createTypeReferenceNode('T',undefined)
      },
    ]),
    resultFile
  );
  return [TKeys,TFunc].join('\n')
}
