open Sinon

let _buildAPI = (sandbox): Meta3dType.Index.api => {
  {
    registerExtension: createEmptyStubWithJsObjSandbox(sandbox),
    getExtensionService: createEmptyStubWithJsObjSandbox(sandbox),
    // setExtensionState: createEmptyStubWithJsObjSandbox(sandbox),
    // getExtensionState: createEmptyStubWithJsObjSandbox(sandbox),
    setExtensionState: ((. meta3dState,_,state) =>{
      StateContainer.setState(state)

      meta3dState
    })-> Obj.magic,
    getExtensionState: ((. _, _) => StateContainer.unsafeGetState())-> Obj.magic,
    registerContribute: createEmptyStubWithJsObjSandbox(sandbox),
    getContribute: createEmptyStubWithJsObjSandbox(sandbox),
    getAllContributesByType: createEmptyStubWithJsObjSandbox(sandbox),
  }
}

let buildFakeDataAndMeta3DState = sandbox => {
  let api = _buildAPI(sandbox)
  // let api = Meta3d.ExtensionManager.buildAPI()

  // api.getExtensionService
  // ->Obj.magic
  // ->returns(Meta3dBsMost.Main.getExtensionService(Obj.magic(1), Obj.magic(1)), _)
  // ->Obj.magic

  // let meta3dState = Meta3d.ManagerUtils._prepare()

  ((api, Obj.magic(1)), Obj.magic(2))
  // ((api, Obj.magic(1)), meta3dState)
}

// let getAPIFromData = ((api, _)) => api
