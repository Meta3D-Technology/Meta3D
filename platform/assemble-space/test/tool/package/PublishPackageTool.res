open Sinon

let buildUI = (~sandbox, ~account=None, ~service=ServiceTool.build(~sandbox, ()), ()) => {
  <PublishPackage service account />
}

let publish = (
  ~sandbox,
  ~service,
  ~setVisible=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~setIsUploadBegin=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~setUploadProgress=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~account=None,
  ~selectedExtensions=list{},
  ~selectedContributes=list{},
  ~values={
    "packageName": "n1",
  },
  (),
) => {
  PublishPackage.Method.onFinish(
    service,
    (setUploadProgress, setIsUploadBegin, setVisible),
    (account, selectedExtensions, selectedContributes),
    values,
  )
}
