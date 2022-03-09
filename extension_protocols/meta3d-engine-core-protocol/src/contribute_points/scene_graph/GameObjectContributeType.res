// @genType
// type gameObject

type createStateFunc<'state, 'config> = (. 'config) => 'state

type createGameObjectFunc<'state, 'gameObject> = (. 'state) => ('state, 'gameObject)

type getNeedDisposedGameObjectsFunc<'state, 'gameObject> = (. 'state) => array<'gameObject>

type deferDisposeGameObjectFunc<'state, 'transformState, 'gameObject, 'transform> = (. ( 'state, 'transformState  ), ((. 'transformState, 'gameObject) => Js.Nullable.t< 'transform>, (. 'transformState, 'transform) => 'transformState ), 'gameObject) => ( 'state, 'transformState )

type disposeGameObjectsFunc<'state, 'transformState, 'gameObject, 'transform> = (
  . ('state, 'transformState),
  ((. 'transformState, array<'gameObject>) => array<'transform>, (. 'transformState, array<'transform>)  => 'transformState),
  array<'gameObject>,
) => ('state, 'transformState)

type getAllGameObjectsFunc<'state, 'gameObject> = (. 'state) => array<'gameObject>

// @genType
type gameObjectContribute<'state, 'transformState, 'config, 'gameObject, 'transform> = {
  createStateFunc: createStateFunc<'state, 'config>,
  createGameObjectFunc: createGameObjectFunc<'state, 'gameObject>,
  getNeedDisposedGameObjectsFunc: getNeedDisposedGameObjectsFunc<'state, 'gameObject>,
  deferDisposeGameObjectFunc: deferDisposeGameObjectFunc<'state, 'transformState, 'gameObject, 'transform>,
  disposeGameObjectsFunc: disposeGameObjectsFunc<
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
