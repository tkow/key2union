"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate = void 0;
const fs_1 = require("fs");
const mkdirp = require("mkdirp");
const path = require("path");
const ast_1 = require("./ast");
const parser_1 = require("./parser");
exports.generate = (translations, config) => {
    if (!fs_1.existsSync(config.outputDir)) {
        mkdirp.sync(config.outputDir);
    }
    const keys = parser_1.flattenKeys(translations);
    const data = ast_1.dts(keys, config);
    const outputPath = path.resolve(config.outputDir, config.module.dFileName);
    return execWriteFile(outputPath, data);
};
const execWriteFile = (pathFile, data) => new Promise((resolve, reject) => {
    fs_1.writeFile(pathFile, data, error => {
        if (error) {
            reject(error);
        }
        else {
            resolve();
        }
    });
});
//# sourceMappingURL=generate.js.map