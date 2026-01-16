open Meta3dType.Index

type init = (. env) => Meta3dBsMostDefault.Most.stream<unit>

type publishFinalApp = (
  . onUploadProgressFunc,
  Js.Typed_array.ArrayBuffer.t,
  appName,
  account,
  description,
  Js.Nullable.t<previewBase64>,
  isRecommend,
) => Meta3dBsMostDefault.Most.stream<unit>

type publishMod = (
  . string,
  string,
  string,
  array<(string, Js.Typed_array.Uint8Array.t)>,
  Js.Nullable.t<string>,
) => Meta3dBsMostDefault.Most.stream<unit>

@module("backend-cloudbase")
external init: init = "init"

@module("backend-cloudbase")
external publishFinalApp: publishFinalApp = "publishFinalApp"

@module("backend-cloudbase")
external publishMod: publishMod = "publishMod"
