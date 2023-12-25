type value

type eventEmitter = {
  addListener: (. string, value => unit) => unit,
  emit: (. string, value) => unit,
  remove: (. unit) => unit,
}

@module("fbemitter") @new
external eventEmitter: unit => eventEmitter = "EventEmitter"
