export interface Config {
  model: string[];
  emitModelKey?: boolean;
  outputDir: string;
  unionTypeName: string;
  watchDirs?: string[];
  module: {
    dFileName:string;
  }
}

export interface Translation {
  key: string;
  value: string;
  interpolations: string[];
}

export interface JsonObject {
  [key: string]: any;
}
