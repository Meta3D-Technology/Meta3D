open Js.Typed_array

let _checkSizeEqual = (glbIds, glbNames, glbs) => {
  glbIds->Meta3dCommonlib.ArraySt.length == glbs->Meta3dCommonlib.ArraySt.length &&
    glbIds->Meta3dCommonlib.ArraySt.length == glbNames->Meta3dCommonlib.ArraySt.length
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
  loadGlb: %raw(`
  function (meta3dState, glb){
      return api.getExtensionService(
        meta3dState,
        "meta3d-load-glb-protocol",
      ).loadGlb(meta3dState, glb)
  }
  `),
  addGLBAsset: (meta3dState, glb, glbId, glbName) => {
    let state: Meta3dAssetProtocol.StateType.state = api.getExtensionState(.
      meta3dState,
      "meta3d-asset-protocol",
    )

    api.setExtensionState(.
      meta3dState,
      "meta3d-asset-protocol",
      {
        ...state,
        allGLBAssets: state.allGLBAssets->Meta3dCommonlib.ListSt.push((glbId, glbName, glb)),
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
        allGLBAssets: state.allGLBAssets->Meta3dCommonlib.ListSt.filter(((glbId_, _, _)) =>
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

    let (glbIds, glbNames, glbs) = allGLBAssets->Meta3dCommonlib.ListSt.reduce(([], [], []), (
      (glbIds, glbNames, glbs),
      (glbId, glbName, glb),
    ) => {
      (
        glbIds->Meta3dCommonlib.ArraySt.push(glbId),
        glbNames->Meta3dCommonlib.ArraySt.push(glbName),
        glbs->Meta3dCommonlib.ArraySt.push(glb),
      )
    })

    Meta3d.BinaryFileOperator.generate([
      Meta3d.TextEncoder.encodeUint8Array(glbIds->Obj.magic->Js.Json.stringify, encoder),
      Meta3d.TextEncoder.encodeUint8Array(glbNames->Obj.magic->Js.Json.stringify, encoder),
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

    let [glbIdsUint8, glbNamesUint8, glbsUint8] = Meta3d.BinaryFileOperator.load(assetFile)

    let glbIds =
      Meta3d.TextDecoder.decodeUint8Array(glbIdsUint8, decoder)->Js.Json.parseExn->Obj.magic

    let glbNames =
      Meta3d.TextDecoder.decodeUint8Array(glbNamesUint8, decoder)->Js.Json.parseExn->Obj.magic

    let glbs =
      glbsUint8
      ->Uint8Array.buffer
      ->Meta3d.BinaryFileOperator.load
      ->Meta3dCommonlib.ArraySt.map(data => data->Uint8Array.buffer)

    _checkSizeEqual(glbIds, glbNames, glbs)

    api.setExtensionState(.
      meta3dState,
      "meta3d-asset-protocol",
      {
        ...state,
        allGLBAssets: glbIds->Meta3dCommonlib.ArraySt.reduceOneParami(
          (. allGLBAssets, glbId, index) => {
            allGLBAssets->Meta3dCommonlib.ListSt.push((
              glbId,
              glbNames->Meta3dCommonlib.ArraySt.getExn(index),
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
> = (. _, _) => {
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
