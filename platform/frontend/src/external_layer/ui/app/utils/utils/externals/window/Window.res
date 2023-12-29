open WindowType

@val @scope("window")
external \"open": (string, string) => Js.Nullable.t<openResult> = "open"

@val @scope("window")
external fetchDTs: string => Js.Promise.t<fetchResult> = "fetch"

@val @scope("window")
external fetch: string => Js.Promise.t<fetchResult> = "fetch"

@val @scope("window")
external setTimeout: (unit => unit, int) => unit = "setTimeout"

@val @scope("window")
external confirm: string => bool = "confirm"
