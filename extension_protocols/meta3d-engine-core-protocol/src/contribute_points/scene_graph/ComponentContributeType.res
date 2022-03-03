// @genType
type componentName = string

type createStateFunc<'state, 'config> = (. 'config) => 'state

type getGameObjectsFunc<'state, 'component> = (
  . 'state,
  'component,
) => array<GameObjectContributeType.gameObject>

type createComponentFunc<'state, 'component> = (. 'state) => ('state, 'component)

type addComponentFunc<'state, 'component> = (
  . 'state,
  GameObjectContributeType.gameObject,
  'component,
) => 'state

type hasComponentFunc<'state> = (. 'state, GameObjectContributeType.gameObject) => bool

type getComponentFunc<'state, 'component> = (
  . 'state,
  GameObjectContributeType.gameObject,
) => Js.Nullable.t<'component>

type deferDisposeComponentFunc<'state, 'component> = (
  . 'state,
  GameObjectContributeType.gameObject,
  'component,
) => 'state

type batchDisposeComponentsFunc<'state, 'component> = (. 'state, array<'component>) => 'state

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

// @genType
type componentContribute<'state, 'config, 'dataName, 'component> = {
  componentName: componentName,
  createStateFunc: createStateFunc<'state, 'config>,
  getGameObjectsFunc: getGameObjectsFunc<'state, 'component>,
  createComponentFunc: createComponentFunc<'state, 'component>,
  addComponentFunc: addComponentFunc<'state, 'component>,
  hasComponentFunc: hasComponentFunc<'state>,
  getComponentFunc: getComponentFunc<'state, 'component>,
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
