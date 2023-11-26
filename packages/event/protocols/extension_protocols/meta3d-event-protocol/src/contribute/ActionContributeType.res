type actionName = string

type eventHandler<'uiData> = (
  Meta3dType.Index.state,
  'uiData,
) => Js.Promise.t<Meta3dType.Index.state>

type createState<'state> = Meta3dType.Index.state => 'state

type init = Meta3dType.Index.state => Js.Promise.t<Meta3dType.Index.state>

type restore<'state> = ('state, 'state) => 'state

type deepCopy<'state> = 'state => 'state

type actionContribute<'uiData, 'state> = {
  actionName: actionName,
  handler: eventHandler<'uiData>,
  createState: createState<'state>,
  init: init,
  restore: Js.Nullable.t<restore<'state>>,
  deepCopy: Js.Nullable.t<deepCopy<'state>>,
}

// type getActionContribute<'dependentExtensionProtocolNameMap, 'uiData> = (
//   Meta3dType.Index.api,
//   'dependentExtensionProtocolNameMap,
// ) => actionContribute<'uiData>
