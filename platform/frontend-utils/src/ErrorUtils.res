// let error = %raw(`
//     function(message, e, duration = 10) {
// 	console.error(e)

// 	message.error(e.message, duration)
// }
//     `)

// let error = (messageErrorFunc, errorFunc, e, durationOpt) => {
//   errorFunc(e)

//   messageErrorFunc(Js.Exn.message(e), durationOpt->Meta3dCommonlib.OptionSt.getWithDefault(10))
// }

let error = (errorMessage: string, durationOpt: option<int>) => {
  Js.Console.error(errorMessage)

  Antd__Message.message.error(.
    errorMessage,
    durationOpt->Meta3dCommonlib.OptionSt.getWithDefault(10),
  )
}

let showCatchedErrorMessage = (func, durationOpt) => {
  try {
    func()
  } catch {
  | Js.Exn.Error(obj) => error(Js.Exn.message(obj)->Meta3dCommonlib.OptionSt.getExn, durationOpt)
  }
}

// let handleFail = result => {
//   result->Meta3dCommonlib.Result.handleFail(Antd.Message.error)
// }
