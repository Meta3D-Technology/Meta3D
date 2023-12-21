// type warn = (. string, int) => unit

// type error = (. string, int) => unit

// type message = {
//   warn: warn,
//   error: error,
// }

// @module("antd") @val
// external message: message = "message"

// // @send
// // external error: (message, string) => unit = "error"

// let error = (. info, duration) => {
//   (message->Obj.magic)["error"](. info, duration)
// }

// let warn = (. info, duration) => {
//   (message->Obj.magic)["warn"](. info, duration)
// }

type openDataType = [#success | #error | #warning]

type openData = {
  @as("type") _type: openDataType,
  content: string,
  duration: int
}

type messageApi = {@as("open") _open: (. openData) => unit}

type contextHolder = React.element

let getMessageAPI: unit => messageApi = %raw(`
function (){
return globalThis.messageAPI
}
`)

let setMessageAPI = %raw(`
function (messageAPI){
globalThis.messageAPI = messageAPI
}
`)

@module("antd") @scope("message")
external useMessage: unit => (messageApi, contextHolder) = "useMessage"
