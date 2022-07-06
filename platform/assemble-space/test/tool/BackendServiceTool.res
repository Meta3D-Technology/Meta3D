open FrontendUtils.AssembleSpaceType

open Sinon

let build = (
  ~sandbox,
  ~error=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~getAllPublishExtensionProtocols=createEmptyStub(refJsObjToSandbox(sandbox.contents))
  ->returns(Meta3dBsMost.Most.just([]), _)
  ->Obj.magic,
  (),
) => {
  error: error->Obj.magic,
  getAllPublishExtensionProtocols: getAllPublishExtensionProtocols->Obj.magic,
}
