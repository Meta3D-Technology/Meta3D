type t

@val @module("react-test-renderer")
external create: React.element => t = ""

@send external toJSON: t => Js.Json.t = ""
