type pbrMaterial = Meta3dComponentPbrmaterialProtocol.Index.pbrMaterial

type texture = Meta3dTextureBasicsourceProtocol.StateType.texture

type state = {
  config: Meta3dComponentPbrmaterialProtocol.Index.config,
  mutable maxIndex: Meta3dCommonlibType.ComponentType.index,
  buffer: Js.Typed_array.ArrayBuffer.t,
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
  diffuseMap: Meta3dCommonlibType.MutableSparseMapType.t<pbrMaterial, texture>,
  // channelRoughnessMetallicMapMap: Meta3dCommonlibType.MutableSparseMapType.t<
  //   pbrMaterial,
  //   channelRoughnessMetallicMap,
  // >,
  roughnessMap: Meta3dCommonlibType.MutableSparseMapType.t<pbrMaterial, texture>,
  metalnessMap: Meta3dCommonlibType.MutableSparseMapType.t<pbrMaterial, texture>,
  // emissionMapMap: Meta3dCommonlibType.MutableSparseMapType.t<pbrMaterial, emissionMap>,
  normalMap: Meta3dCommonlibType.MutableSparseMapType.t<pbrMaterial, texture>,
  // transmissionMapMap: Meta3dCommonlibType.MutableSparseMapType.t<pbrMaterial, transmissionMap>,
  // specularMapMap: Meta3dCommonlibType.MutableSparseMapType.t<pbrMaterial, specularMap>,
  mutable needDisposedPBRMaterials: Meta3dComponentPbrmaterialProtocol.Index.needDisposedComponents,
  mutable disposedPBRMaterials: array<pbrMaterial>,
  names: Meta3dCommonlibType.ImmutableSparseMapType.t<
    pbrMaterial,
    Meta3dCommonlibType.ComponentType.name,
  >,
}
