"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tsTransform = void 0;
const m = require("module");
const ts_node_1 = require("ts-node");
const vm_1 = require("vm");
const compilerOptions = {
    allowJs: true,
    module: 'commonjs'
};
const service = ts_node_1.register(Object.assign(Object.assign({}, ts_node_1.DEFAULTS), { compilerOptions }));
const cwd = process.cwd();
const EVAL_FILENAME = `[eval].ts`;
const EVAL_PATH = `${cwd}/${EVAL_FILENAME}`;
function tsTransform(filePath) {
    const code = `export {default} from '${filePath}'`;
    const output = service.compile(code, EVAL_PATH, 0);
    return exec(output, EVAL_FILENAME);
}
exports.tsTransform = tsTransform;
function exec(code, filename) {
    const script = new vm_1.Script(m.wrap(code), { filename });
    const results = {};
    script.runInThisContext()(results, module.require, module);
    return results.default;
}
//# sourceMappingURL=tsTrasform.js.map