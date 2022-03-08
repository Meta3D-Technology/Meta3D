// @genType
type gameObject

type createStateFunc<'state, 'config> = (. 'config) => 'state

type createGameObjectFunc<'state, 'gameObject> = (. 'state) => ('state, 'gameObject)

type deferDisposeGameObjectFunc<'state, 'gameObject> = (. 'state, 'gameObject) => 'state

type batchDisposeGameObjectsFunc<'state, 'transformState, 'gameObject, 'transform> = (
  . ('state, 'transformState),
  (. 'transformState, array<'transform>) => 'transformState,
  array<'gameObject>,
) => ('state, 'transformState)

type getAllGameObjectsFunc<'state, 'gameObject> = (. 'state) => array<'gameObject>

// @genType
type gameObjectContribute<'state, 'transformState, 'config, 'gameObject, 'transform> = {
  createStateFunc: createStateFunc<'state, 'config>,
  createGameObjectFunc: createGameObjectFunc<'state, 'gameObject>,
  deferDisposeGameObjectFunc: deferDisposeGameObjectFunc<'state, 'gameObject>,
  batchDisposeGameObjectsFunc: batchDisposeGameObjectsFunc<
    'state,
    'transformState,
    'gameObject,
    'transform,
  >,
  getAllGameObjectsFunc: getAllGameObjectsFunc<'state, 'gameObject>,
}

type getGameObjectContribute<
  'state,
  'transformState,
  'config,
  'gameObject,
  'transform,
> = unit => gameObjectContribute<'state, 'transformState, 'config, 'gameObject, 'transform>
