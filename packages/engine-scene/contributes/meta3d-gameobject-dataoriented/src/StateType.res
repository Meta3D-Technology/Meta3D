type gameObject = Meta3dGameobjectProtocol.Index.gameObject

type config = Meta3dGameobjectProtocol.Index.config

type state = {
  config: config,
  mutable maxUID: gameObject,
  mutable needDisposedGameObjectArray: array<gameObject>,
  mutable disposedGameObjectArray: array<gameObject>,
  names: Meta3dCommonlibType.ImmutableSparseMapType.t<gameObject, Meta3dGameobjectProtocol.Index.name>,
}
