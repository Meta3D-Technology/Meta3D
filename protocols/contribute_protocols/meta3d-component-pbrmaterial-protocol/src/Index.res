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

type dataName = {diffuseColor: int, specular: int}

let dataName = {
  diffuseColor: 0,
  specular: 1,
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
