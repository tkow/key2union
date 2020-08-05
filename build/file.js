"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTranslationFromModel = exports.isJavascript = exports.isTypescript = exports.isJson = exports.getConfigFromPackageJson = void 0;
const fs_1 = require("fs");
const path = require("path");
const constants_1 = require("./constants");
const tsTrasform_1 = require("./tsTrasform");
exports.getConfigFromPackageJson = (dir) => {
    const packageJsonPath = path.join(dir, constants_1.PACKAGE_JSON);
    if (!fs_1.existsSync(packageJsonPath)) {
        return Error('package.json does not exist on root directory');
    }
    const config = require(packageJsonPath)[constants_1.CONFIG_NAME];
    if (!config) {
        return Error(`\"${constants_1.CONFIG_NAME}\" property does not exist on package.json`);
    }
    const dFileName = config.module || constants_1.DEFINITION_FILE;
    return {
        model: path.resolve(dir, config.model),
        unionTypeName: config.unionType || constants_1.UNIONTYPE_NAME,
        module: {
            dFileName: `${dFileName}.d.ts`,
        },
        outputDir: path.resolve(dir, config.outputDir),
    };
};
exports.isJson = (extname) => {
    return extname.endsWith('.json');
};
exports.isTypescript = (extname) => {
    return extname.endsWith('.ts');
};
exports.isJavascript = (extname) => {
    return extname.endsWith('.js');
};
exports.getTranslationFromModel = (filePath) => {
    if (!fs_1.existsSync(filePath)) {
        return Error('model file does not exist');
    }
    const extname = path.extname(filePath);
    if (exports.isTypescript(extname)) {
        return tsTrasform_1.tsTransform(filePath.replace(/\.ts/, ''));
    }
    if (exports.isJson(extname) || exports.isJavascript(extname)) {
        return require(filePath);
    }
    return Error('file extension type should be either .json or .ts|.js');
};
//# sourceMappingURL=file.js.map