import { existsSync } from 'fs';
import * as path from 'path';
import { CONFIG_NAME, DEFINITION_FILE,PACKAGE_JSON, UNIONTYPE_NAME } from './constants';
import { Config, JsonObject } from './interfaces';
import { tsTransform } from './tsTrasform';

export const getConfigFromPackageJson = (dir: string): Config | Error => {
  const packageJsonPath = path.join(dir, PACKAGE_JSON);
  if (!existsSync(packageJsonPath)) {
    return Error('package.json does not exist on root directory');
  }
  const config = require(packageJsonPath)[CONFIG_NAME];
  if (!config) {
    return Error(`\"${CONFIG_NAME}\" property does not exist on package.json`);
  }
  const dFileName = config.module || DEFINITION_FILE
  const emitModelKey: boolean = !!config.emitModelKey
  const model =  Array.isArray(config.model) ? config.model.map(_model => path.resolve(dir, _model)) : [path.resolve(dir,config.model)]
  return {
    model,
    unionTypeName: config.unionType || UNIONTYPE_NAME,
    emitModelKey,
    watchDirs: config.watchDirs,
    module: {
      dFileName: `${dFileName}.d.ts`,
    },
    outputDir: path.resolve(dir,config.outputDir),
  };
};

export const isJson = (extname: string): boolean => {
  return extname.endsWith('.json');
};

export const isTypescript = (extname: string): boolean => {
  return extname.endsWith('.ts');
};

export const isJavascript = (extname: string): boolean => {
  return extname.endsWith('.js');
};

const modulePath = (filePath: string) => {

  const moduleResolveRule = `${filePath}/index`
  const extensions = ['.ts', '.js','.json']
  for(let i = 0, len = extensions.length; i < len; i++) {
    const ext = extensions[i]
    const _modulePath = `${moduleResolveRule}${ext}`
    if(existsSync(_modulePath)){
      return [_modulePath, ext]
    }
  }
  throw Error('module entry file extension type should be either .json or .ts|.js');
}

export const getTranslationFromModel = (
  filePath: string,
): JsonObject | Error => {
  let pathName = filePath
  let extname = path.extname(filePath);
  if(!extname) {
    try {
      [pathName, extname] = modulePath(pathName)
    } catch(e) {
      return e as Error
    }
  }
  console.log(pathName)
  if (isTypescript(extname)) { return tsTransform(pathName.replace(/\.ts/,'')) }
  if (isJson(extname) || isJavascript(extname)) {
    return require(pathName) as JsonObject;
  }
  return Error('module entry file extension type should be either .json or .ts|.js');
};
