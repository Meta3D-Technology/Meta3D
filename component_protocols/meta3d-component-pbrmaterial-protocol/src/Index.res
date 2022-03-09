let componentName = "PBRMaterial"

type config = {
  isDebug: bool,
  pbrMaterialCount: int,
}

type dataName = {diffuseColor: int, specular: int}

let dataName = {
  diffuseColor: 0,
  specular: 1,
}

type dataNameType = int

type diffuseColor = (float, float, float)

type specular = float

type pbrMaterial = int

type diffuseMap

type normalMap

type channelRoughnessMetallicMap

type emissionMap

type transmissionMap

type specularMap

type state = {
  config: config,
  mutable maxIndex: Meta3dCommonlibType.ComponentType.index,
  buffer: Meta3dCommonlibType.SharedArrayBufferType.sharedArrayBuffer,
  mutable diffuseColors: Js.Typed_array.Float32Array.t,
  mutable speculars: Js.Typed_array.Float32Array.t,
  mutable specularColors: Js.Typed_array.Float32Array.t,
  mutable roughnesses: Js.Typed_array.Float32Array.t,
  mutable metalnesses: Js.Typed_array.Float32Array.t,
  mutable transmissions: Js.Typed_array.Float32Array.t,
  mutable iors: Js.Typed_array.Float32Array.t,
  defaultDiffuseColor: Meta3dCommonlibType.VectorType.vec3,
  defaultSpecular: float,
  defaultSpecularColor: Meta3dCommonlibType.VectorType.vec3,
  defaultRoughness: float,
  defaultMetalness: float,
  defaultTransmission: float,
  defaultIOR: float,
  gameObjectsMap: Meta3dCommonlibType.ComponentType.gameObjectsMap,
  gameObjectPBRMaterialMap: Meta3dCommonlibType.MutableSparseMapType.t<
    Meta3dEngineCoreProtocol.GameObjectContributeType.gameObject,
    pbrMaterial,
  >,
  diffuseMapMap: Meta3dCommonlibType.MutableSparseMapType.t<pbrMaterial, diffuseMap>,
  channelRoughnessMetallicMapMap: Meta3dCommonlibType.MutableSparseMapType.t<
    pbrMaterial,
    channelRoughnessMetallicMap,
  >,
  emissionMapMap: Meta3dCommonlibType.MutableSparseMapType.t<pbrMaterial, emissionMap>,
  normalMapMap: Meta3dCommonlibType.MutableSparseMapType.t<pbrMaterial, normalMap>,
  transmissionMapMap: Meta3dCommonlibType.MutableSparseMapType.t<pbrMaterial, transmissionMap>,
  specularMapMap: Meta3dCommonlibType.MutableSparseMapType.t<pbrMaterial, specularMap>,
}
