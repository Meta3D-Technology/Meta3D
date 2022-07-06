type callbackResult = React.element

type current

type result = {current: current}

type value

type hookResult = {
  result: result,
rerender: unit => unit,
  waitFor: (unit => bool) => Js.Promise.t<unit>,
  waitForValueToChange: (unit => value) => Js.Promise.t<unit>,
  waitForNextUpdate: unit => Js.Promise.t<unit>,
}

// @module("@testing-library/react-hooks/server")
@module("@testing-library/react-hooks")
external renderHook: (unit => callbackResult) => hookResult = ""

@module("@testing-library/react-hooks")
external act: (unit => unit) => unit = ""

// @module("@testing-library/react-hooks/server")
// external waitForValueToChange: (unit => unit) => unit = ""

let getCurrentData = (result, dataName) => {
  JsObjTool.getObjValue(result.current, dataName)
}
