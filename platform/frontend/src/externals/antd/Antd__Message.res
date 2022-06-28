type message

@module("antd") @val
external message: message = "message"

// @send
// external error: (message, string) => unit = "error"

let error = info => {
  (message->Obj.magic)["error"](. info, 5)
}