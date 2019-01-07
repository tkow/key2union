import {makeTFuncDifinition} from './gtypes';
import { Translation } from '../interfaces';

export const dts = (keys: Translation[]): string => {
  const tKeys = keys.map(value=> value.key)
  return makeTFuncDifinition(tKeys);
};
