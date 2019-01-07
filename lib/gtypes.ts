import ts = require("typescript");

const createParmaeters = (params:ArgumentType[]) => params.map((param) => ts.createParameter(
  /*decorators*/ undefined,
  /*modifiers*/ undefined,
  /*dotDotDotToken*/ param.variableArgs ? ts.createToken(ts.SyntaxKind.DotDotDotToken): undefined,
  ts.createIdentifier(param.identifier),
  undefined,
  param.parameterType
));

type ArgumentType = {
  identifier: string
  variableArgs?: boolean
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
        identifier:'tKeys',
        parameterType:ts.createTypeReferenceNode('TKeys',undefined)
      },
      {
        identifier:'option?',
        parameterType: ts.createTypeReferenceNode('T',undefined)
      },
      {
        identifier:'args?',
        variableArgs:true,
        parameterType: ts.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword)
      },
    ]),
    resultFile
  );
  return [TKeys,TFunc].join('\n')
}
