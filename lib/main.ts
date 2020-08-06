import * as path from 'path';
import { Config, JsonObject } from './interfaces';
import { getTranslationFromModel } from './file';
import { generate } from './generate';

export default function(config: Config) {
  const models =  Array.isArray(config.model) ? config.model: [config.model]
  const translationOrError = models.reduce((result,input) => {
    const nextInput = getTranslationFromModel(input)
    if (nextInput instanceof Error) {
      console.error(nextInput.message);
      process.exit(1);
    }
    return {
      ...result,
      ...nextInput
    }
  } ,{});
  const translation = translationOrError as JsonObject;
  generate(translation, config)
    .then(() =>
      console.info(`Emitted: ${path.join(config.outputDir, config.module.dFileName)}`),
    )
    .catch(error =>
      console.error(`Error occurred while emitting: ${error.message}`),
    );
}
