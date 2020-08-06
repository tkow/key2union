declare type TKeys = "parent.child" | "parent.fuga" | "pages.first" | "pages.second";
declare type TKeysFunc = <T = any>(keys: TKeys, option?: T, ...args: any) => string;