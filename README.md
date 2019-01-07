# About

Your js or ts or json object's keys to one uniton type.

# Example

visit https://github.com/tkow/key2union/tree/master/examples

```sh
$ git clone git@github.com:tkow/key2union.git
$ npm i
$ cd key2union/examples
$ npm start
```

# Usage

Write your package.json.

```
{
  "scripts":{
    "k2u": "ts-node --project ${path}/key2union/tsconfig.json ${path}/key2union/bin/index.ts"
  },...,
  "key2union": {
    "model": "./model/index.ts",
    "outputDir": "./typings/",
    "unionType": "TKeys"
  }
}
```

and run

```
  npm run k2u
```

This is under experimental, so you can't use npm package yet.So locate this project if you want to use this.

## model

Specify json path, or ts or js object path.
These export must be default export.

## outputDir

Specify outputDir path.

## unionType(optional)

Specify unionTypeKey and the functions typeName.
ex)
```
"key2union": {
  //...,
  "unionType": "TKeys",
}
```
output is
```
declare type Tkeys = ...
declare type TkeysFunc = ...
```

## module(optional)

Specify prefix output .d.ts.
ex)
```
"key2union": {
  "model": "./model/index.ts",
  "outputDir": "./typings/",
  "unionType": "TKeys",
  "module": "hoge",
}
```
output is ./typeings/hoge.d.ts.

## License

MIT
