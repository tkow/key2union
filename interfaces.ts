export interface Config {
  model: string;
  outputDir: string;
  module: {
    name:string;
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
