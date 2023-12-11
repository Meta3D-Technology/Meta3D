open WindowType

@val @scope("window")
external \"open": (string, string) => openResult = "open"

@val @scope("window")
external fetchDTs: string => Js.Promise.t<fetchResult> = "fetch"

@val @scope("window")
external setTimeout: (unit => unit, int) => unit = "setTimeout"
