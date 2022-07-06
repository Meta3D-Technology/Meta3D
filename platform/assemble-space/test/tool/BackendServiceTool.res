open FrontendUtils.AssembleSpaceType

open Sinon

let build = (
  ~sandbox,
  ~getAllPublishExtensionProtocols=createEmptyStub(refJsObjToSandbox(sandbox.contents))
  ->returns(Meta3dBsMost.Most.just([]), _)
  ->Obj.magic,
  (),
) => {
  getAllPublishExtensionProtocols: getAllPublishExtensionProtocols->Obj.magic,
}
