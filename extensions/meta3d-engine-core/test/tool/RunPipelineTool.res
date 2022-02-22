open Sinon

let _buildAPI = (sandbox): Meta3dType.Index.api => {
  {
    getServiceExn: createEmptyStubWithJsObjSandbox(sandbox),
    setExtensionState: createEmptyStubWithJsObjSandbox(sandbox),
    getExtensionStateExn: createEmptyStubWithJsObjSandbox(sandbox),
  }
}

let buildFakeDataAndMeta3dState = sandbox => {
  let api = _buildAPI(sandbox)

  api.getServiceExn
  ->Obj.magic
  ->returns(Meta3dBsMost.Main.getExtensionService(Obj.magic(1), Obj.magic(1)), _)
  ->Obj.magic

  ((api, Obj.magic(1)), Obj.magic(2))
}
