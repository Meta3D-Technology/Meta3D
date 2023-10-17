open Js.Typed_array

let _checkSizeEqual = (glbIds, glbs) => {
  glbIds->Meta3dCommonlib.ArraySt.length == glbs->Meta3dCommonlib.ArraySt.length
    ? ()
    : Meta3dCommonlib.Exception.throwErr(
        Meta3dCommonlib.Exception.buildErr(
          Meta3dCommonlib.Log.buildErrorMessage(
            ~title={j`size not equal`},
            ~description={
              j``
            },
            ~reason="",
            ~solution=j``,
            ~params=j``,
          ),
        ),
      )
}

let getExtensionService: Meta3dType.Index.getExtensionService<
  Meta3dAssetProtocol.ServiceType.service,
> = api => {
  addGLBAsset: (meta3dState, gltf, glbId) => {
    let state: Meta3dAssetProtocol.StateType.state = api.getExtensionState(.
      meta3dState,
      "meta3d-asset-protocol",
    )

    api.setExtensionState(.
      meta3dState,
      "meta3d-asset-protocol",
      {
        ...state,
        allGLBAssets: state.allGLBAssets->Meta3dCommonlib.ListSt.push((glbId, gltf)),
      },
    )
  },
  removeGLBAsset: (meta3dState, glbId) => {
    let state: Meta3dAssetProtocol.StateType.state = api.getExtensionState(.
      meta3dState,
      "meta3d-asset-protocol",
    )

    api.setExtensionState(.
      meta3dState,
      "meta3d-asset-protocol",
      {
        ...state,
        allGLBAssets: state.allGLBAssets->Meta3dCommonlib.ListSt.filter(((glbId_, _)) =>
          glbId_ != glbId
        ),
      },
    )
  },
  getAllGLBAssets: meta3dState => {
    let state: Meta3dAssetProtocol.StateType.state = api.getExtensionState(.
      meta3dState,
      "meta3d-asset-protocol",
    )

    state.allGLBAssets->Meta3dCommonlib.ListSt.toArray
  },
  exportAsset: meta3dState => {
    let {allGLBAssets}: Meta3dAssetProtocol.StateType.state = api.getExtensionState(.
      meta3dState,
      "meta3d-asset-protocol",
    )

    let encoder = Meta3d.TextEncoder.newTextEncoder()

    let (glbIds, glbs) = allGLBAssets->Meta3dCommonlib.ListSt.reduce(([], []), (
      (glbIds, glbs),
      (glbId, glb),
    ) => {
      (glbIds->Meta3dCommonlib.ArraySt.push(glbId), glbs->Meta3dCommonlib.ArraySt.push(glb))
    })

    Meta3d.BinaryFileOperator.generate([
      Meta3d.TextEncoder.encodeUint8Array(glbIds->Obj.magic->Js.Json.stringify, encoder),
      glbs
      ->Meta3dCommonlib.ArraySt.map(data => data->Obj.magic->Uint8Array.fromBuffer)
      ->Meta3d.BinaryFileOperator.generate
      ->Uint8Array.fromBuffer,
    ])
  },
  importAsset: (meta3dState, assetFile) => {
    let state: Meta3dAssetProtocol.StateType.state = api.getExtensionState(.
      meta3dState,
      "meta3d-asset-protocol",
    )

    let decoder = Meta3d.TextDecoder.newTextDecoder("utf-8")

    let [glbIdsUint8, glbsUint8] = Meta3d.BinaryFileOperator.load(assetFile)

    let glbIds =
      Meta3d.TextDecoder.decodeUint8Array(glbIdsUint8, decoder)->Js.Json.parseExn->Obj.magic

    let glbs =
      glbsUint8
      ->Uint8Array.buffer
      ->Meta3d.BinaryFileOperator.load
      ->Meta3dCommonlib.ArraySt.map(data => data->Uint8Array.buffer)

    _checkSizeEqual(glbIds, glbs)

    api.setExtensionState(.
      meta3dState,
      "meta3d-asset-protocol",
      {
        ...state,
        allGLBAssets: glbIds->Meta3dCommonlib.ArraySt.reduceOneParami(
          (. allGLBAssets, glbId, index) => {
            allGLBAssets->Meta3dCommonlib.ListSt.push((
              glbId,
              glbs->Meta3dCommonlib.ArraySt.getExn(index),
            ))
          },
          list{},
        ),
      },
    )
  },
}

let createExtensionState: Meta3dType.Index.createExtensionState<
  Meta3dAssetProtocol.StateType.state,
> = () => {
  allGLBAssets: list{},
}

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
