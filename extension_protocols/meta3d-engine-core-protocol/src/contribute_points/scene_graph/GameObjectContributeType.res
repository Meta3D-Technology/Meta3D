// @genType
// type gameObject

type createStateFunc<'state, 'config> = (. 'config) => 'state

type createGameObjectFunc<'state, 'gameObject> = (. 'state) => ('state, 'gameObject)

type getNeedDisposedGameObjectsFunc<'state, 'gameObject> = (. 'state) => array<'gameObject>

type deferDisposeGameObjectFunc<'state, 'transformState, 'pbrMaterialState, 'gameObject, 'transform> = (
  . ('state, 'transformState, 'pbrMaterialState),
  (
  (
    (. 'transformState, 'gameObject) => Js.Nullable.t<'transform>,
    (. 'transformState, ('transform, 'gameObject)) => 'transformState,
  ),
  (
    (. 'pbrMaterialState, 'gameObject) => Js.Nullable.t<Meta3dComponentPbrmaterialProtocol.Index.pbrMaterial >,
    (. 'pbrMaterialState, (Meta3dComponentPbrmaterialProtocol.Index.pbrMaterial , 'gameObject)) => 'pbrMaterialState,
  ),
  ),
  'gameObject,
) => ('state, 'transformState, 'pbrMaterialState)

type disposeGameObjectsFunc<'state, 'transformState, 'pbrMaterialState, 'gameObject, 'transform> = (
  . ('state, 'transformState, 'pbrMaterialState),
  (
  (
    (. 'transformState, 'gameObject) => Js.Nullable.t<'transform>,
    (. 'transformState, Meta3dComponentTransformProtocol.Index.batchDisposeData) => 'transformState,
  ),
  (
    (. 'pbrMaterialState, 'gameObject) => Js.Nullable.t<Meta3dComponentPbrmaterialProtocol.Index.pbrMaterial >,
    (. 'pbrMaterialState, Meta3dComponentPbrmaterialProtocol.Index.batchDisposeData) => 'pbrMaterialState,
  ),
  ),
  array<'gameObject>,
) => ('state, 'transformState, 'pbrMaterialState)

type getAllGameObjectsFunc<'state, 'gameObject> = (. 'state) => array<'gameObject>

// @genType
type gameObjectContribute<
  'state,
  'transformState,
  'pbrMaterialState,
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
    'gameObject,
    'transform,
  >,
  disposeGameObjectsFunc: disposeGameObjectsFunc<
    'state,
    'transformState,
'pbrMaterialState,
    'gameObject,
    'transform,
  >,
  getAllGameObjectsFunc: getAllGameObjectsFunc<'state, 'gameObject>,
}

type getGameObjectContribute<
  'state,
  'transformState,
'pbrMaterialState,
  'config,
  'gameObject,
  'transform,
> = unit => gameObjectContribute<
  'state,
  'transformState,
'pbrMaterialState,
  'config,
  'gameObject,
  'transform,
>
