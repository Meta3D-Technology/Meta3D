open Sinon

let _buildAPI = (sandbox): Meta3dType.Index.api => {
  {
    registerExtension: createEmptyStubWithJsObjSandbox(sandbox),
    getExtensionService: createEmptyStubWithJsObjSandbox(sandbox),
    setExtensionState: createEmptyStubWithJsObjSandbox(sandbox),
    getExtensionState: createEmptyStubWithJsObjSandbox(sandbox),
    registerContribute: createEmptyStubWithJsObjSandbox(sandbox),
    getContribute: createEmptyStubWithJsObjSandbox(sandbox),
    getAllContributesByType: createEmptyStubWithJsObjSandbox(sandbox),
  }
}

let buildFakeDataAndMeta3DState = sandbox => {
  let api = _buildAPI(sandbox)

  api.getExtensionService
  ->Obj.magic
  ->returns(Meta3dBsMost.Main.getExtensionService(Obj.magic(1), Obj.magic(1)), _)
  ->Obj.magic

  ((api, Obj.magic(1)), Obj.magic(2))
}
