type pbrMaterial = Meta3dComponentPbrmaterialProtocol.Index.pbrMaterial

type diffuseMap

type normalMap

type channelRoughnessMetallicMap

type emissionMap

type transmissionMap

type specularMap

type state = {
  config: Meta3dComponentPbrmaterialProtocol.Index.config,
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
  mutable gameObjectsMap: Meta3dCommonlibType.ComponentType.gameObjectsMap,
  mutable gameObjectPBRMaterialMap: Meta3dCommonlibType.MutableSparseMapType.t<
    Meta3dGameobjectProtocol.Index.gameObject,
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
  mutable needDisposedPBRMaterials: Meta3dComponentPbrmaterialProtocol.Index.needDisposedComponents,
  mutable disposedPBRMaterials: array<pbrMaterial>,
}
