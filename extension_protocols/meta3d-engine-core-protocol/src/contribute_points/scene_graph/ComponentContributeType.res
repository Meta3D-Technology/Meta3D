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

type deferDisposeComponentFunc<'state, 'component> = (
  . 'state,
  ('component, Meta3dGameobjectProtocol.Index.gameObject),
) => 'state

type disposeComponentsFunc<'state, 'batchDisposeData> = (. 'state, 'batchDisposeData) => 'state

// @genType
type componentContribute<
  'state,
  'config,
  'dataName,
  'needDisposedComponents,
  'batchDisposeData,
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
  getComponentDataFunc: getComponentDataFunc<'state, 'dataName, 'component>,
  setComponentDataFunc: setComponentDataFunc<'state, 'dataName, 'component>,
  deferDisposeComponentFunc: deferDisposeComponentFunc<'state, 'component>,
  disposeComponentsFunc: disposeComponentsFunc<'state, 'batchDisposeData>,
  getAllComponentsFunc: getAllComponentsFunc<'state, 'component>,
}

// @genType
type getComponentContribute<
  'state,
  'config,
  'dataName,
  'needDisposedComponents,
  'batchDisposeData,
  'component,
> = unit => componentContribute<
  'state,
  'config,
  'dataName,
  'needDisposedComponents,
  'batchDisposeData,
  'component,
>
