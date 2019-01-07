import { DEFAULT_MODULE_NAME } from '../../../../constants';
import { Config } from '../../../../interfaces';

export const config:Config = {
  model: "./en.json",
  module:{
    dFileName:`${DEFAULT_MODULE_NAME}.d.ts`,
    name: DEFAULT_MODULE_NAME,
  },
  outputDir: './src/lib/__tests__/generated/',
}