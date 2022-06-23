@module("backend-cloudbase")
external init: unit => Js.Promise.t<unit> = ""

@module("backend-cloudbase")
external checkUserName: string => Meta3dBsMostProtocol.StreamType.stream<bool> = ""

@module("backend-cloudbase")
external registerUser: (string, string) => Meta3dBsMostProtocol.StreamType.stream<unit> = ""
