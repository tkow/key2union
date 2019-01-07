const tFunc:TFunc = (a:string) => 'test'

const hoge = function t(s:TKeys) {
  return s[0]
}

tFunc('')
tFunc('parent.child')
hoge('')
hoge('parent.fuga')