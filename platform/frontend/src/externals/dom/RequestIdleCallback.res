type options = {timeout: int}

type deadline = {
  timeRemaining: (. unit) => int,
  didTimeout: bool,
}

type handle = deadline => unit

@val @scope("window")
external requestIdleCallback: (handle, Js.Nullable.t<options>) => int = "requestIdleCallback"

@val @scope("window")
external cancelIdleCallback: int => unit = "cancelIdleCallback"
