import { watch as watchDir } from 'fs';
import * as path from 'path';
import { Config, JsonObject } from '../interfaces';
import { getTranslationFromModel } from './file';
import { generate } from './generate';

export const watch = (filePath: string, config:Config) => {
  const dir = path.dirname(filePath)
  const {outputDir:outputPath,module:{dFileName}} = config
  console.info(`Start watching: ${dir}`);

  watchDir(dir,{persistent:true,recursive:true}, (eventType,fileName) => {

    console.info(`Detect ${fileName} ${eventType}`);

    const translationOrError = getTranslationFromModel(filePath);
    if (translationOrError instanceof Error) {
      console.error(translationOrError.message);
    }
    const translation = translationOrError as JsonObject;
    generate(translation, config)
      .then(() =>
        console.info(`Emitted: ${path.join(outputPath, dFileName)}`),
      )
      .catch(error =>
        console.error(`Error occurred while emitting: ${error.message}`),
      );
  });
};
