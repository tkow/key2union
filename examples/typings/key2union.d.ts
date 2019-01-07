declare type TKeys = "parent.child" | "parent.fuga";
declare type TKeysFunc = <T = any>(keys: TKeys, option?: T, ...args?: any) => string;