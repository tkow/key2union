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
    const emitModelKey = !!config.emitModelKey;
    const model = Array.isArray(config.model) ? config.model.map(_model => path.resolve(dir, _model)) : [path.resolve(dir, config.model)];
    return {
        model,
        unionTypeName: config.unionType || constants_1.UNIONTYPE_NAME,
        emitModelKey,
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
const modulePath = (filePath) => {
    const moduleResolveRule = `${filePath}/index`;
    const extensions = ['.ts', '.js', '.json'];
    for (let i = 0, len = extensions.length; i < len; i++) {
        const ext = extensions[i];
        const _modulePath = `${moduleResolveRule}${ext}`;
        if (fs_1.existsSync(_modulePath)) {
            return [_modulePath, ext];
        }
    }
    throw Error('module entry file extension type should be either .json or .ts|.js');
};
exports.getTranslationFromModel = (filePath) => {
    let pathName = filePath;
    let extname = path.extname(filePath);
    if (!extname) {
        try {
            [pathName, extname] = modulePath(pathName);
        }
        catch (e) {
            return e;
        }
    }
    console.log(pathName);
    if (exports.isTypescript(extname)) {
        return tsTrasform_1.tsTransform(pathName.replace(/\.ts/, ''));
    }
    if (exports.isJson(extname) || exports.isJavascript(extname)) {
        return require(pathName);
    }
    return Error('module entry file extension type should be either .json or .ts|.js');
};
//# sourceMappingURL=file.js.map