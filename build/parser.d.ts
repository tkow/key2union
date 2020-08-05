import { JsonObject, Translation } from './interfaces';
export declare const extractInterpolations: (str: string) => string[];
export declare const flattenKeys: (json: JsonObject, prefix?: string | undefined, result?: Translation[]) => Translation[];
