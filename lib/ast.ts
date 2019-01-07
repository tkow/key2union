import {makeTFuncDifinition} from './gtypes';
import { Translation, Config } from '../interfaces';

export const dts = (keys: Translation[],config?:Config): string => {
  const tKeys = keys.map(value=> value.key)
  return makeTFuncDifinition(tKeys,config);
};
