import { existsSync, PathLike, writeFile } from 'fs';
import mkdirp = require('mkdirp');
import * as path from 'path';
import { Config, JsonObject } from '../interfaces';
import { dts } from './ast';
import { flattenKeys } from './parser';

export const generate = (
  translations: JsonObject,
  config: Config,
): Promise<void> => {
  if (!existsSync(config.outputDir)) {
    mkdirp.sync(config.outputDir);
  }
  const keys = flattenKeys(translations);
  const data = dts(keys,config);
  const outputPath = path.resolve(config.outputDir, config.module.dFileName);
  return execWriteFile(outputPath, data);
};

const execWriteFile = (pathFile: PathLike, data: string): Promise<void> =>
  new Promise<void>((resolve, reject) => {
    writeFile(pathFile, data, error => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
