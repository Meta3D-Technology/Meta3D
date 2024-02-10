open StateType

type glb = Js.Typed_array.ArrayBuffer.t

type gltf

type service = {
  loadGlb: (Meta3dType.Index.state, glb) => Js.Promise.t<gltf>,
  exportAsset: (
    (
      Js.Typed_array.Uint8Array.t,
      Js.Typed_array.Uint8Array.t,
      Js.Typed_array.Uint8Array.t,
      array<Js.Typed_array.Uint8Array.t>,
    )
  ) => assetData,
  parseAsset: assetData => (
    Js.Typed_array.Uint8Array.t,
    Js.Typed_array.Uint8Array.t,
    Js.Typed_array.Uint8Array.t,
    array<Js.Typed_array.Uint8Array.t>,
  ),
}
