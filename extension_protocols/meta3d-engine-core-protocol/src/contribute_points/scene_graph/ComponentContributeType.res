// @genType
type componentName = string

type createStateFunc<'state, 'config> = (. 'config) => 'state

type getGameObjectsFunc<'state, 'component> = (
  . 'state,
  'component,
) => array<GameObjectType.gameObject>

type createComponentFunc<'state, 'component> = (. 'state) => ('state, 'component)

type addComponentFunc<'state, 'component> = (
  . 'state,
  GameObjectType.gameObject,
  'component,
) => 'state

type hasComponentFunc<'state> = (. 'state, GameObjectType.gameObject) => bool

type removeComponentFunc<'state, 'component> = (
  . 'state,
  GameObjectType.gameObject,
  'component,
) => 'state

type getComponentFunc<'state, 'component> = (
  . 'state,
  GameObjectType.gameObject,
) => Js.Nullable.t<'component>

type getComponentsFunc<'state, 'component> = (
  . 'state,
  array<GameObjectType.gameObject>,
) => array<'component>

type getNeedDisposedComponentsFunc<'state, 'component> = (. 'state) => array<'component>

type getAllComponentsFunc<'state, 'component> = (. 'state) => array<'component>

// type dataName = int

// @genType
type dataValue

// TODO add 'dataValue and remove "type dataValue" ?
type getComponentDataFunc<'state, 'dataName, 'component> = (
  . 'state,
  'component,
  'dataName,
) => Js.Nullable.t<dataValue>

type setComponentDataFunc<'state, 'dataName, 'component> = (
  . 'state,
  'component,
  'dataName,
  dataValue,
) => 'state

type deferDisposeComponentFunc<'state, 'component> = (. 'state, 'component) => 'state

type batchDisposeComponentsFunc<'state, 'component> = (. 'state, array<'component>) => 'state

// @genType
type componentContribute<'state, 'config, 'dataName, 'component> = {
  componentName: componentName,
  createStateFunc: createStateFunc<'state, 'config>,
  getGameObjectsFunc: getGameObjectsFunc<'state, 'component>,
  createComponentFunc: createComponentFunc<'state, 'component>,
  addComponentFunc: addComponentFunc<'state, 'component>,
  removeComponentFunc: removeComponentFunc<'state, 'component>,
  hasComponentFunc: hasComponentFunc<'state>,
  getComponentFunc: getComponentFunc<'state, 'component>,
  getComponentsFunc: getComponentsFunc<'state, 'component>,
  getNeedDisposedComponentsFunc: getNeedDisposedComponentsFunc<'state, 'component>,
  getComponentDataFunc: getComponentDataFunc<'state, 'dataName, 'component>,
  setComponentDataFunc: setComponentDataFunc<'state, 'dataName, 'component>,
  deferDisposeComponentFunc: deferDisposeComponentFunc<'state, 'component>,
  batchDisposeComponentsFunc: batchDisposeComponentsFunc<'state, 'component>,
  getAllComponentsFunc: getAllComponentsFunc<'state, 'component>,
}

// @genType
type getComponentContribute<'state, 'config, 'dataName, 'component> = unit => componentContribute<
  'state,
  'config,
  'dataName,
  'component,
>
