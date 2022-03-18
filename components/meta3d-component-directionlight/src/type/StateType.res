type directionLight = Meta3dComponentDirectionlightProtocol.Index.directionLight

type state = {
  config: Meta3dComponentDirectionlightProtocol.Index.config,
  mutable maxIndex: Meta3dCommonlibType.ComponentType.index,
  buffer: Meta3dCommonlibType.SharedArrayBufferType.sharedArrayBuffer,
  mutable colors: Js.Typed_array.Float32Array.t,
  mutable intensities: Js.Typed_array.Float32Array.t,
  gameObjectMap: Meta3dCommonlibType.ComponentType.gameObjectMap,
  gameObjectDirectionLightMap: Meta3dCommonlibType.MutableSparseMapType.t<
    Meta3dGameobjectProtocol.Index.gameObject,
    directionLight,
  >,
}
