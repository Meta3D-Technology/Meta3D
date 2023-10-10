let componentName = "PBRMaterial"

type config = {
  isDebug: bool,
  pbrMaterialCount: int,
}

type state = {
  buffer: Js.Typed_array.ArrayBuffer.t,
  config: config,
  mutable gameObjectsMap: Meta3dCommonlibType.ComponentType.gameObjectsMap,
}

type dataName = {
  diffuseColor: int,
  roughness: int,
  metalness: int,
  specular: int,
  specularColor: int,
  transmission: int,
  ior: int,
  diffuseMap: Meta3dTextureBasicsourceProtocol.StateType.texture,
  normalMap: Meta3dTextureBasicsourceProtocol.StateType.texture,
  roughnessMap: Meta3dTextureBasicsourceProtocol.StateType.texture,
  metalnessMap: Meta3dTextureBasicsourceProtocol.StateType.texture,
}

let dataName = {
  diffuseColor: 0,
  roughness: 1,
  metalness: 2,
  specular: 3,
  specularColor: 4,
  transmission:5,
  ior: 6,
  diffuseMap: 7,
  normalMap: 8,
  roughnessMap: 9,
  metalnessMap: 10,
}

type diffuseColor = (float, float, float)

type specular = float

type pbrMaterial = Meta3dComponentPbrmaterialProtocolCommon.Index.pbrMateiral

type needDisposedComponents = Meta3dCommonlibType.MutableSparseMapType.t<
  pbrMaterial,
  array<Meta3dGameobjectProtocol.Index.gameObject>,
>

type batchDisposeData = Meta3dCommonlibType.MutableSparseMapType.t<
  pbrMaterial,
  array<Meta3dGameobjectProtocol.Index.gameObject>,
>

type cloneConfig = {isShare: bool}
