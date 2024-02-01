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
  name:int,
  diffuseColor: int,
  roughness: int,
  metalness: int,
  specular: int,
  specularColor: int,
  transmission: int,
  ior: int,
  // diffuseMap: Meta3dTextureBasicsourceProtocol.StateType.texture,
  // normalMap: Meta3dTextureBasicsourceProtocol.StateType.texture,
  // roughnessMap: Meta3dTextureBasicsourceProtocol.StateType.texture,
  // metalnessMap: Meta3dTextureBasicsourceProtocol.StateType.texture,
  diffuseMap: int,
  normalMap: int,
  roughnessMap: int,
  metalnessMap: int,
}

let dataName = {
  name:0,
  diffuseColor: 1,
  roughness: 2,
  metalness: 3,
  specular: 4,
  specularColor: 5,
  transmission:6,
  ior: 7,
  diffuseMap: 8,
  normalMap: 9,
  roughnessMap: 10,
  metalnessMap: 11,
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
