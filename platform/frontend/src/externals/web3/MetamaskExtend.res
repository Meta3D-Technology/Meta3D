type requestParam = {method: [#eth_requestAccounts]}

type account = string

type ethereum = {request: requestParam => Js.Promise.t<array<account>>}

@val @scope("window")
external ethereum: Js.Nullable.t<ethereum> = ""
