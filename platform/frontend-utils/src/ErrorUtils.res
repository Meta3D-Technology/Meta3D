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


let error = (e, durationOpt) => {
  Js.Console.error(e)

  Antd__Message.message.error(Js.Exn.message(e) -> Meta3dCommonlib.OptionSt.getExn, durationOpt->Meta3dCommonlib.OptionSt.getWithDefault(10))
}

// let handleFail = result => {
//   result->Meta3dCommonlib.Result.handleFail(Antd.Message.error)
// }
