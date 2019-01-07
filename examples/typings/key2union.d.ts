declare type TKeys = "parent.child" | "parent.fuga";
declare type TFunc = <T = any>(tKeys: TKeys, option?: T, ...args?: any) => string;