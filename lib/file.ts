import { existsSync } from 'fs';
import * as path from 'path';
import { CONFIG_NAME, DEFINITION_FILE,PACKAGE_JSON, UNIONTYPE_NAME } from '../constants';
import { Config, JsonObject } from '../interfaces';
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
  return {
    model:  path.resolve(dir,config.model),
    unionTypeName: config.unionType || UNIONTYPE_NAME,
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

export const getTranslationFromModel = (
  filePath: string,
): JsonObject | Error => {
  if (!existsSync(filePath)) {
    return Error('model file does not exist');
  }
  const extname = path.extname(filePath);
  if (isTypescript(extname)) { return tsTransform(filePath.replace(/\.ts/,'')) }
  if (isJson(extname) || isJavascript(extname)) {
    return require(filePath) as JsonObject;
  }
  return Error('file extension type should be either .json or .ts|.js');
};
