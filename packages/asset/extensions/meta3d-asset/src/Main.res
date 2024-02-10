open Js.Typed_array

let getExtensionService: Meta3dType.Index.getExtensionService<
  Meta3dAssetProtocol.ServiceType.service,
> = api => {
  loadGlb: %raw(`
  function (meta3dState, glb){
      return api.getExtensionService(
        meta3dState,
        "meta3d-load-glb-protocol",
      ).loadGlb(meta3dState, glb)
  }
  `),
  exportAsset: ((assetTypes, ids, names, allData)) => {
    Meta3d.BinaryFileOperator.generate([
      assetTypes,
      ids,
      names,
      allData->Meta3d.BinaryFileOperator.generate->Uint8Array.fromBuffer,
    ])
  },
  parseAsset: assetData => {
    let decoder = Meta3d.TextDecoder.newTextDecoder("utf-8")

    let [assetTypes, ids, names, allDataUint8] = Meta3d.BinaryFileOperator.load(assetData)

    (assetTypes, ids, names, allDataUint8->Uint8Array.buffer->Meta3d.BinaryFileOperator.load)
  },
}

let createExtensionState: Meta3dType.Index.createExtensionState<
  Meta3dAssetProtocol.StateType.state,
> = (. _, _) => Js.Nullable.null->Obj.magic

let getExtensionLife: Meta3dType.Index.getExtensionLife<Meta3dAssetProtocol.ServiceType.service> = (
  api,
  extensionProtocolName,
) => {
  {
    onRegister: Js.Nullable.null,
    onRestore: Js.Nullable.null,
    onDeepCopy: Js.Nullable.null,
    onStart: Js.Nullable.null,
    onInit: Js.Nullable.null,
    onUpdate: Js.Nullable.null,
  }
}
