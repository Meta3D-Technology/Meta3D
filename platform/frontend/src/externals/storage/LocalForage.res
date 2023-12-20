type key = string

type value

@module("localforage")
external getItem: key => Js.Promise.t<Js.Nullable.t<value>> = "getItem"

@module("localforage")
external setItem: (key, value) => Js.Promise.t<value> = "setItem"

@module("localforage")
external removeItem: key => Js.Promise.t<unit> = "removeItem"
