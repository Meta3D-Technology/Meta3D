@val @scope("console") external consoleTrace: unit => unit = "trace"
@val @scope("console") external consoleDebug: string => unit = "debug"
@val @scope("console") external consoleError: string => unit = "error"

let printForDebug = value => {
  value->Obj.magic->Js.Json.stringify->Js.log
  value
}

let printStringForDebug = value => {
  Js.log(value)
  value
}

let printListForDebug = list => {
  Js.log(list->Belt.List.toArray)
  list
}

let error = message => {
  consoleError(message)
}

let logForDebug = value => {
  Js.log(value)

  consoleTrace()
}

let log = value => {
  value->Obj.magic->Js.Json.stringify->Js.log
}

let debugWithFunc = (func, isTest: bool) => isTest ? func() : ()

let _debug = msg => {
  consoleDebug(msg)
}

let debug = (buildMessageFunc, isTest: bool) =>
  isTest
    ? {
        _debug(buildMessageFunc())
        consoleTrace()
      }
    : ()

let getJsonStr = json => Js.Json.stringify(json->Obj.magic)

let buildDebugMessage = (~description, ~params, ()) =>
  j`
  Debug:

  description
  $description

  params
  $params

  `

let buildDebugJsonMessage = (~description, ~var, ()) => {
  let varStr = Js.Json.stringify(var->Obj.magic)
  j`
  DebugJson:

  description
  $description

  variable value
  $varStr
  `
}

let buildFatalMessage = (~title, ~description, ~reason, ~solution, ~params) =>
  j`
  Fatal:

  title
  $title

  description
  $description

  reason
  $reason

  solution
  $solution

  params
  $params

   `

let buildErrorMessage = (~title, ~description, ~reason, ~solution, ~params) =>
  j`
  Error:

  title
  $title

  description
  $description

  reason
  $reason

  solution
  $solution

  params
  $params

   `

let buildAssertMessage = (~expect, ~actual) => j`expect $expect, but actual $actual`
