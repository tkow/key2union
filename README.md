# About

Your js or ts or json object's keys to one uniton type. It is usefull for literal type auto generate.

# Install


```sh
$ npm i --save-dev (or yarn add -D key2union)
```

# Usage

visit https://github.com/tkow/key2union/tree/master/examples
Write your package.json.

```
{
  ...,
  "key2union": {
    "model": "./model",
    "outputDir": "./typings/",
    "unionType": "TKeys"
  }
}
```

and run

```
  npx k2u
```

This is under experimental, so care  if you want to use this.

## model

Specify json path, or ts or js object path.
These export must be default export.
This parameter can be array.
This parameter resolve path by one of node module rule that can read object from pathes index.js or index.ts or index.json module path under the specified module directory path.

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
  "model": "./model",
  "outputDir": "./typings/",
  "unionType": "TKeys",
  "module": "hoge",
}
```
output is ./typeings/hoge.d.ts.

## emitModelKey (optional)

emit module name type name base unionType key and dir/file name

This features for [react-i18next namespaces](https://react.i18next.com/legacy-v9/withnamespaces#withnamespaces-options)


## License

MIT
