open Sinon

let buildUI = (~sandbox, ~username=None, ~service=ServiceTool.build(~sandbox, ()), ()) => {
  <Publish service username />
}

let publish = (
  ~sandbox,
  ~service,
  ~setVisible=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~username=None,
  ~selectedExtensions=list{},
  ~selectedContributes=list{},
  ~values={
    "appName": "n1",
  },
  (),
) => {
  Publish.Method.onFinish(
    service,
    setVisible,
    (username, selectedExtensions, selectedContributes),
    values,
  )
}
