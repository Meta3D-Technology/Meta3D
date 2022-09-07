type error = (. string, int) => unit

type message = {error: error}

@module("antd") @val
external message: message = "message"

// @send
// external error: (message, string) => unit = "error"

let error = (. info, duration) => {
  (message->Obj.magic)["error"](. info, duration)
}
