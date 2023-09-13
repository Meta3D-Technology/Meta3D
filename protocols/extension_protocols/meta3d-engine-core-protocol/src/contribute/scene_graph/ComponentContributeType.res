// @genType
type componentName = string

type createStateFunc<'state, 'config> = (. 'config) => 'state

type getGameObjectsFunc<'state, 'component> = (
  . 'state,
  'component,
) => array<Meta3dGameobjectProtocol.Index.gameObject>

type createComponentFunc<'state, 'component> = (. 'state) => ('state, 'component)

type addComponentFunc<'state, 'component> = (
  . 'state,
  Meta3dGameobjectProtocol.Index.gameObject,
  'component,
) => 'state

type hasComponentFunc<'state> = (. 'state, Meta3dGameobjectProtocol.Index.gameObject) => bool

type removeComponentFunc<'state, 'component> = (
  . 'state,
  Meta3dGameobjectProtocol.Index.gameObject,
  'component,
) => 'state

type getComponentFunc<'state, 'component> = (
  . 'state,
  Meta3dGameobjectProtocol.Index.gameObject,
) => Js.Nullable.t<'component>

type getNeedDisposedComponentsFunc<'state, 'needDisposedComponents> = (
  . 'state,
) => 'needDisposedComponents

type getAllComponentsFunc<'state, 'component> = (. 'state) => array<'component>

type dataValue

type dataName = int

// TODO add 'dataValue and remove "type dataValue" ?
type getComponentDataFunc<'state, 'component> = (
  . 'state,
  'component,
  dataName
) => Js.Nullable.t<dataValue>

type setComponentDataFunc<'state,  'component> = (
  . 'state,
  'component,
  dataName,
  dataValue,
) => 'state

type deferDisposeComponentFunc<'state, 'component> = (
  . 'state,
  ('component, Meta3dGameobjectProtocol.Index.gameObject),
) => 'state

type disposeComponentsFunc<'state, 'batchDisposeData> = (. 'state, 'batchDisposeData) => 'state

type countRange = array<int>

type clonedComponents<'component> = array<'component>

type cloneComponentFunc<'state, 'cloneConfig, 'component> = (
  . 'state,
  countRange,
  'cloneConfig,
  'component,
) => ('state, clonedComponents<'component>)

type restore<'state> = (. 'state, 'state) => 'state

type deepCopy<'state> = (. 'state) => 'state

type componentContribute<
  'state,
  'config,
  'needDisposedComponents,
  'batchDisposeData,
  'cloneConfig,
  'component,
> = {
  componentName: componentName,
  createStateFunc: createStateFunc<'state, 'config>,
  getGameObjectsFunc: getGameObjectsFunc<'state, 'component>,
  createComponentFunc: createComponentFunc<'state, 'component>,
  addComponentFunc: addComponentFunc<'state, 'component>,
  removeComponentFunc: removeComponentFunc<'state, 'component>,
  hasComponentFunc: hasComponentFunc<'state>,
  getComponentFunc: getComponentFunc<'state, 'component>,
  getNeedDisposedComponentsFunc: getNeedDisposedComponentsFunc<'state, 'needDisposedComponents>,
  getComponentDataFunc: getComponentDataFunc<'state,  'component>,
  setComponentDataFunc: setComponentDataFunc<'state,  'component>,
  deferDisposeComponentFunc: deferDisposeComponentFunc<'state, 'component>,
  disposeComponentsFunc: disposeComponentsFunc<'state, 'batchDisposeData>,
  cloneComponentFunc: cloneComponentFunc<'state, 'cloneConfig, 'component>,
  getAllComponentsFunc: getAllComponentsFunc<'state, 'component>,
  restore: restore<'state>,
  deepCopy: deepCopy<'state>
}

// // @genType
// type getComponentContribute<
//   'state,
//   'config,
//   'needDisposedComponents,
//   'batchDisposeData,
//   'cloneConfig,
//   'component,
// > = unit => componentContribute<
//   'state,
//   'config,
//   'needDisposedComponents,
//   'batchDisposeData,
//   'cloneConfig,
//   'component,
// >
