@genType
type gameObject

type createStateFunc<'state> = unit => 'state

type createGameObjectFunc<'state, 'gameObject> = (. 'state) => ('state, 'gameObject)

type getAllGameObjectsFunc<'state, 'gameObject> = (. 'state) => array<'gameObject>

@genType
type gameObjectContribute<'state, 'gameObject> = {
  createStateFunc: createStateFunc<'state>,
  createGameObjectFunc: createGameObjectFunc<'state, 'gameObject>,
  getAllGameObjectsFunc: getAllGameObjectsFunc<'state, 'gameObject>,
}

type getGameObjectContribute<'state, 'gameObject> = unit => gameObjectContribute<'state, 'gameObject>
