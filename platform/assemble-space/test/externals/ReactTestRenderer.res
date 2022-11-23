type t

@val @module("react-test-renderer")
external create: React.element => t = "create"

@send external toJSON: t => Js.Json.t = "toJSON"

@module("react-test-renderer")
external act: (unit => unit) => unit = "act"
