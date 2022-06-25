type toEqual<'a> = 'a => unit

type toMatchSnapshot<'a> = 'a => unit

type toThrow<'a> = 'a => unit

type expectReturnData<'a> = {
  toEqual: toEqual<'a>,
  toMatchSnapshot: toMatchSnapshot<'a>,
  toThrow: toThrow<'a>,
}

let _invokeNotMethod = %raw(`
function(jsObj, methodName, paramsArr) {
    return jsObj.not[methodName].apply(null, paramsArr)
}
`)

let _invokeMethod = %raw(`
function(jsObj, methodName, paramsArr) {
    return jsObj[methodName].apply(null, paramsArr)
}
`)

let toEqualFunc = ({toEqual}, target) => {
  toEqual(target)
}

let toMatchSnapshotFunc = (expectReturnData) => {
  _invokeMethod(expectReturnData, "toMatchSnapshot", [])
}

let toThrowMessage = ({toThrow}, message: string) => {
  toThrow(message)
}

let toThrow = expectReturnData => {
  _invokeMethod(expectReturnData, "toThrow", [])
}

let toNotThrow = expectReturnData => {
  _invokeNotMethod(expectReturnData, "toThrow", [])
}

let toNotEqual = (expectReturnData, val) => {
  _invokeNotMethod(expectReturnData, "toEqual", [val])
}

@val
external expect: 'a => expectReturnData<'b> = "expect"
