import { Config, Translation } from '../interfaces';
import {makeTFuncDifinition} from './gtypes';

export const dts = (keys: Translation[],config:Config): string => {
  const tKeys = keys.map(value=> value.key)
  return makeTFuncDifinition(tKeys,config);
};
