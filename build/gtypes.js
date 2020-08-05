"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeTFuncDifinition = void 0;
const ts = require("typescript");
const createParmaeters = (params) => params.map((param) => ts.createParameter(
/*decorators*/ undefined, 
/*modifiers*/ undefined, 
/*dotDotDotToken*/ param.variableArgs ? ts.createToken(ts.SyntaxKind.DotDotDotToken) : undefined, ts.createIdentifier(param.identifier), undefined, param.parameterType));
function createTfunc(funcTypeName, params) {
    const TParamer = 'T';
    const args = createParmaeters(params);
    const funcType = ts.createFunctionTypeNode(
    /*typeParameters*/ [ts.createTypeParameterDeclaration(TParamer, undefined, ts.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword))], args, 
    /*type*/
    ts.createKeywordTypeNode(ts.SyntaxKind.StringKeyword));
    return ts.createTypeAliasDeclaration(undefined, [ts.createModifier(ts.SyntaxKind.DeclareKeyword)], funcTypeName, undefined, funcType);
}
function generateUnions(unionTypeName, tKeys) {
    const paths = tKeys
        .map(ts.createStringLiteral)
        .map(ts.createLiteralTypeNode);
    const unionType = ts.createUnionTypeNode(paths);
    return ts.createTypeAliasDeclaration(undefined, [ts.createModifier(ts.SyntaxKind.DeclareKeyword)], unionTypeName, undefined, unionType);
}
const printer = ts.createPrinter({
    newLine: ts.NewLineKind.LineFeed
});
function makeTFuncDifinition(flattenKeys, config) {
    const resultFile = ts.createSourceFile("eval.ts", "", ts.ScriptTarget.Latest, 
    /*setParentNodes*/ false, ts.ScriptKind.TS);
    const TKeys = printer.printNode(ts.EmitHint.Unspecified, generateUnions(config.unionTypeName, flattenKeys), resultFile);
    const TFunc = printer.printNode(ts.EmitHint.Unspecified, createTfunc(`${config.unionTypeName}Func`, [
        {
            identifier: 'keys',
            parameterType: ts.createTypeReferenceNode(config.unionTypeName, undefined)
        },
        {
            identifier: 'option?',
            parameterType: ts.createTypeReferenceNode('T', undefined)
        },
        {
            identifier: 'args',
            parameterType: ts.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword),
            variableArgs: true
        },
    ]), resultFile);
    return [TKeys, TFunc].join('\n');
}
exports.makeTFuncDifinition = makeTFuncDifinition;
//# sourceMappingURL=gtypes.js.map