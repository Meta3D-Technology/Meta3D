open Meta3d.Main

// TODO remove magic?
let init = () => {
  let state = prepare()

  let state = state->registerExtension(
    "meta3d-engine-core",
    Meta3dEngineCore.Main.getService->Obj.magic,
    (
      {
        meta3dBsMostExtensionName: "meta3d-bs-most",
      }: Meta3dEngineCoreType.ServiceType.dependentExtensionNameMap
    )->Obj.magic,
    Meta3dEngineCore.Main.createState()->Obj.magic,
  )
}
