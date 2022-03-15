type gameObject = Meta3dGameobjectProtocol.Index.gameObject

type transform = Meta3dComponentTransformProtocol.Index.transform

type pbrMaterial = Meta3dComponentPbrmaterialProtocol.Index.pbrMaterial

type geometry = Meta3dComponentGeometryProtocol.Index.geometry

type config = Meta3dGameobjectProtocol.Index.config

type createStateFunc<'state> = (. config) => 'state

type createGameObjectFunc<'state> = (. 'state) => ('state, gameObject)

type getNeedDisposedGameObjectsFunc<'state> = (. 'state) => array<gameObject>

type deferDisposeGameObjectFunc<'state, 'transformState, 'pbrMaterialState, 'geometryState> = (
  . ('state, 'transformState, 'pbrMaterialState, 'geometryState),
  (
    (
      (. 'transformState, gameObject) => Js.Nullable.t<transform>,
      (. 'transformState, (transform, gameObject)) => 'transformState,
    ),
    (
      (. 'pbrMaterialState, gameObject) => Js.Nullable.t<pbrMaterial>,
      (. 'pbrMaterialState, (pbrMaterial, gameObject)) => 'pbrMaterialState,
    ),
    (
      (. 'geometryState, gameObject) => Js.Nullable.t<geometry>,
      (. 'geometryState, (geometry, gameObject)) => 'geometryState,
    ),
  ),
  gameObject,
) => ('state, 'transformState, 'pbrMaterialState, 'geometryState)

type disposeGameObjectsFunc<'state, 'transformState, 'pbrMaterialState, 'geometryState> = (
  . ('state, 'transformState, 'pbrMaterialState, 'geometryState),
  (
    (
      (. 'transformState, gameObject) => Js.Nullable.t<transform>,
      (
        . 'transformState,
        Meta3dComponentTransformProtocol.Index.batchDisposeData,
      ) => 'transformState,
    ),
    (
      (. 'pbrMaterialState, gameObject) => Js.Nullable.t<pbrMaterial>,
      (
        . 'pbrMaterialState,
        Meta3dComponentPbrmaterialProtocol.Index.batchDisposeData,
      ) => 'pbrMaterialState,
    ),
    (
      (. 'geometryState, gameObject) => Js.Nullable.t<geometry>,
      (. 'geometryState, Meta3dComponentGeometryProtocol.Index.batchDisposeData) => 'geometryState,
    ),
  ),
  array<gameObject>,
) => ('state, 'transformState, 'pbrMaterialState, 'geometryState)

type getAllGameObjectsFunc<'state> = (. 'state) => array<gameObject>

// @genType
type gameObjectContribute<'state, 'transformState, 'pbrMaterialState, 'geometryState> = {
  createStateFunc: createStateFunc<'state>,
  createGameObjectFunc: createGameObjectFunc<'state>,
  getNeedDisposedGameObjectsFunc: getNeedDisposedGameObjectsFunc<'state>,
  deferDisposeGameObjectFunc: deferDisposeGameObjectFunc<
    'state,
    'transformState,
    'pbrMaterialState,
    'geometryState,
  >,
  disposeGameObjectsFunc: disposeGameObjectsFunc<
    'state,
    'transformState,
    'pbrMaterialState,
    'geometryState,
  >,
  getAllGameObjectsFunc: getAllGameObjectsFunc<'state>,
}

type getGameObjectContribute<
  'state,
  'transformState,
  'pbrMaterialState,
  'geometryState,
> = unit => gameObjectContribute<'state, 'transformState, 'pbrMaterialState, 'geometryState>
