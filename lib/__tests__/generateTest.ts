import { mkdirSync, rmdirSync, unlinkSync } from 'fs';
import * as path from 'path';
import { Config } from '../../interfaces';
import { generate } from '../generate';
import { config  as _config} from "./fixtures/tsexport/config";
import { readFile } from './utils';

describe('generate', () => {

  const dirPath = path.resolve(process.cwd(),_config.outputDir)
  const filePath =  path.resolve(dirPath,`${_config.module.dFileName}`);

  console.log(dirPath)
  console.log(filePath)

  const config :Config= {
    model: path.resolve(process.cwd(),_config.model),
    module: {
      ..._config.module,
    },
    outputDir:dirPath,
  }

  beforeAll(() => {
    mkdirSync(dirPath)
  });

  afterAll(() => rmdirSync(dirPath));

  afterEach(() => unlinkSync(filePath));

  it('writes d.ts file with no key', async () => {
    expect.assertions(1);
    return generate({}, config).then(() => {
      const actual = readFile(filePath);
      const expected = readFile('./src/lib/__tests__/expected/no-keys.d.ts');
      expect(actual).toEqual(expected);
    });
  });

  it('writes d.ts file with one key', async () => {
    expect.assertions(1);
    return generate(
      {
        'common.cancel': 'Cancel {{value}}',
      },
      config,
    ).then(() => {
      const actual = readFile(filePath);
      const expected = readFile('./src/lib/__tests__/expected/one-key.d.ts');
      expect(actual).toEqual(expected);
    });
  });

  it('writes d.ts file with multiple keys', async () => {
    expect.assertions(1);
    return generate(
      {
        'common.cancel': 'Cancel {{value}}',
        'common.ok': 'OK',
      },
      config,
    ).then(() => {
      const actual = readFile(filePath);
      const expected = readFile(
        './src/lib/__tests__/expected/multiple-keys.d.ts',
      );
      expect(actual).toEqual(expected);
    });
  });
});
