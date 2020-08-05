"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dts = void 0;
const gtypes_1 = require("./gtypes");
exports.dts = (keys, config) => {
    const tKeys = keys.map(value => value.key);
    return gtypes_1.makeTFuncDifinition(tKeys, config);
};
//# sourceMappingURL=ast.js.map