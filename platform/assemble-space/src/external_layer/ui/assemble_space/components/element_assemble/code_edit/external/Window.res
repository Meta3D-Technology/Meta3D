type fetchResult = {text: (. unit) => string}

@val @scope("window")
external fetchDTs: string => Js.Promise.t<fetchResult> = "fetch"
