declare type TKeys = "parent.child" | "parent.fuga" | "pages.first" | "pages.second" | "jsontest.child" | "jsontest.brother" | "jstest.child" | "jstest.fuga";
declare type TKeysFunc = <T = any>(keys: TKeys, option?: T, ...args: any) => string;
declare type TKeysModels = "model" | "pages" | "jsontest" | "jstest";