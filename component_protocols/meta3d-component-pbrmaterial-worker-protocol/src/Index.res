let componentName = "PBRMaterialWorker"

type config = {
  isDebug: bool,
  pbrMaterialCount: int,
  buffer: Meta3dCommonlibType.SharedArrayBufferType.sharedArrayBuffer,
}

type dataName = {diffuseColor: int, specular: int}

let dataName = {
  diffuseColor: 0,
  specular: 1,
}


type diffuseColor = (float, float, float)

type specular = float

type pbrMaterial = int

type needDisposedComponents = Meta3dCommonlibType.MutableSparseMapType.t<
  pbrMaterial,
  array<Meta3dGameobjectProtocol.Index.gameObject>,
>

type batchDisposeData = Meta3dCommonlibType.MutableSparseMapType.t<
  pbrMaterial,
  array<Meta3dGameobjectProtocol.Index.gameObject>,
>

type cloneConfig = {isShare: bool}