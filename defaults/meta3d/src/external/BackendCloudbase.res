open Meta3dType.Index

type init = (. env) => Meta3dBsMostDefault.Most.stream<unit>

type publishFinalApp = (
  . onUploadProgressFunc,
  Js.Typed_array.ArrayBuffer.t,
  Js.Typed_array.ArrayBuffer.t,
  appName,
  account,
  description,
  Js.Nullable.t<previewBase64>,
  isRecommend,
) => Meta3dBsMostDefault.Most.stream<unit>

@module("backend-cloudbase")
external init: init = "init"

@module("backend-cloudbase")
external publishFinalApp: publishFinalApp = "publishFinalApp"
