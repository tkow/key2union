#!/usr/bin/env node

import * as program from 'commander';
import { Config } from '../interfaces';
import { getConfigFromPackageJson } from '../file';
import { watch } from '../watch';
import main from '../main';

program.option('-w, --watch', 'watch file change').parse(process.argv);

const configOrError = getConfigFromPackageJson(process.cwd());
if (configOrError instanceof Error) {
  console.error(configOrError.message);
  process.exit(1);
}
const config = configOrError as Config;
if (program.watch) {
  watch(config);
} else {
  main(config)
}
