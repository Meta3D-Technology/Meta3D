type gameObject = Meta3dGameobjectProtocol.Index.gameObject

type config = Meta3dGameobjectProtocol.Index.config

type state = {
  config: config,
  mutable maxUID: gameObject,
  mutable needDisposedGameObjectArray: array<gameObject>,
}
