import m = require('module')
import {DEFAULTS,register} from 'ts-node'
import {Script} from 'vm'

const compilerOptions = {
  allowJs: true,
  module:'commonjs'
}

const service = register({...DEFAULTS,compilerOptions})

const cwd = process.cwd()
const EVAL_FILENAME = `[eval].ts`
const EVAL_PATH = `${cwd}/${EVAL_FILENAME}`

export function tsTransform(filePath:string) {
  const code =  `export {default} from '${filePath}'`
  const output = service.compile(code,EVAL_PATH,0)
  return exec(output,EVAL_FILENAME)
}

function exec (code:string , filename:string ) {
  const script = new Script(m.wrap(code), { filename })
  const results:{[key:string]:any} = {}
  script.runInThisContext()(results,module.require,module)
  return results.default
}