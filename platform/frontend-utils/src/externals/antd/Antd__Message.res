type warn = (. string, int) => unit

type error = (. string, int) => unit

type message = {
  warn: warn,
  error: error,
}

@module("antd") @val
external message: message = "message"

// @send
// external error: (message, string) => unit = "error"

let error = (. info, duration) => {
  (message->Obj.magic)["error"](. info, duration)
}

let warn = (. info, duration) => {
  (message->Obj.magic)["warn"](. info, duration)
}
