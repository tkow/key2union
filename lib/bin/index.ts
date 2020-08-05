#!/usr/bin/env node

import * as program from 'commander';
import * as path from 'path';
import { Config, JsonObject } from '../interfaces';
import { getConfigFromPackageJson, getTranslationFromModel } from '../file';
import { generate } from '../generate';
import { watch } from '../watch';

program.option('-w, --watch', 'watch file change').parse(process.argv);

const configOrError = getConfigFromPackageJson(process.cwd());
if (configOrError instanceof Error) {
  console.error(configOrError.message);
  process.exit(1);
}
const config = configOrError as Config;
if (program.watch) {
  watch(config.model, config);
} else {
  const translationOrError = getTranslationFromModel(config.model);
  if (translationOrError instanceof Error) {
    console.error(translationOrError.message);
    process.exit(1);
  }
  const translation = translationOrError as JsonObject;
  generate(translation, config)
    .then(() =>
      console.info(`Emitted: ${path.join(config.outputDir, config.module.dFileName)}`),
    )
    .catch(error =>
      console.error(`Error occurred while emitting: ${error.message}`),
    );
}
