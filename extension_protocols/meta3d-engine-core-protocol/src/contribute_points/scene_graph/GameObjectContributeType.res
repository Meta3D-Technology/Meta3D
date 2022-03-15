type createStateFunc<'state, 'config> = (. 'config) => 'state

type createGameObjectFunc<'state, 'gameObject> = (. 'state) => ('state, 'gameObject)

type getNeedDisposedGameObjectsFunc<'state, 'gameObject> = (. 'state) => array<'gameObject>

type deferDisposeGameObjectFunc<
  'state,
  'transformState,
  'pbrMaterialState,
  'geometryState,
  'gameObject,
  'transform,
> = (
  . ('state, 'transformState, 'pbrMaterialState, 'geometryState),
  (
    (
      (. 'transformState, 'gameObject) => Js.Nullable.t<'transform>,
      (. 'transformState, ('transform, 'gameObject)) => 'transformState,
    ),
    (
      (
        . 'pbrMaterialState,
        'gameObject,
      ) => Js.Nullable.t<Meta3dComponentPbrmaterialProtocol.Index.pbrMaterial>,
      (
        . 'pbrMaterialState,
        (Meta3dComponentPbrmaterialProtocol.Index.pbrMaterial, 'gameObject),
      ) => 'pbrMaterialState,
    ),
    (
      (
        . 'geometryState,
        'gameObject,
      ) => Js.Nullable.t<Meta3dComponentGeometryProtocol .Index.geometry>,
      (
        . 'geometryState,
        (Meta3dComponentGeometryProtocol.Index.geometry, 'gameObject),
      ) => 'geometryState,
    ),
  ),
  'gameObject
) => ('state, 'transformState, 'pbrMaterialState, 'geometryState)

type disposeGameObjectsFunc<'state, 'transformState, 'pbrMaterialState, 'geometryState, 'gameObject, 'transform> = (
  . ('state, 'transformState, 'pbrMaterialState, 'geometryState),
  (
    (
      (. 'transformState, 'gameObject) => Js.Nullable.t<'transform>,
      (
        . 'transformState,
        Meta3dComponentTransformProtocol.Index.batchDisposeData,
      ) => 'transformState,
    ),
    (
      (
        . 'pbrMaterialState,
        'gameObject,
      ) => Js.Nullable.t<Meta3dComponentPbrmaterialProtocol.Index.pbrMaterial>,
      (
        . 'pbrMaterialState,
        Meta3dComponentPbrmaterialProtocol.Index.batchDisposeData,
      ) => 'pbrMaterialState,
    ),
    (
      (
        . 'geometryState,
        'gameObject,
      ) => Js.Nullable.t<Meta3dComponentGeometryProtocol.Index.geometry>,
      (
        . 'geometryState,
        Meta3dComponentGeometryProtocol.Index.batchDisposeData,
      ) => 'geometryState,
    ),
  ),
  array<'gameObject>,
) => ('state, 'transformState, 'pbrMaterialState, 'geometryState)

type getAllGameObjectsFunc<'state, 'gameObject> = (. 'state) => array<'gameObject>

// @genType
type gameObjectContribute<
  'state,
  'transformState,
  'pbrMaterialState,
  'geometryState,
  'config,
  'gameObject,
  'transform,
> = {
  createStateFunc: createStateFunc<'state, 'config>,
  createGameObjectFunc: createGameObjectFunc<'state, 'gameObject>,
  getNeedDisposedGameObjectsFunc: getNeedDisposedGameObjectsFunc<'state, 'gameObject>,
  deferDisposeGameObjectFunc: deferDisposeGameObjectFunc<
    'state,
    'transformState,
    'pbrMaterialState,
    'geometryState,
    'gameObject,
    'transform,
  >,
  disposeGameObjectsFunc: disposeGameObjectsFunc<
    'state,
    'transformState,
    'pbrMaterialState,
    'geometryState,
    'gameObject,
    'transform,
  >,
  getAllGameObjectsFunc: getAllGameObjectsFunc<'state, 'gameObject>,
}

type getGameObjectContribute<
  'state,
  'transformState,
  'pbrMaterialState,
  'geometryState,
  'config,
  'gameObject,
  'transform,
> = unit => gameObjectContribute<
  'state,
  'transformState,
  'pbrMaterialState,
  'geometryState,
  'config,
  'gameObject,
  'transform,
>
