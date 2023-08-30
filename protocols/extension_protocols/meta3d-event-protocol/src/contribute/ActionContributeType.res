type actionName = string

type eventHandler<'uiData> = (
  Meta3dType.Index.state,
  'uiData,
) => Js.Promise.t<Meta3dType.Index.state>

type createState<'state> = unit => 'state

type actionContribute<'uiData, 'state> = {
  actionName: actionName,
  handler: eventHandler<'uiData>,
  createState: createState<'state>,
}

// type getActionContribute<'dependentExtensionProtocolNameMap, 'uiData> = (
//   Meta3dType.Index.api,
//   'dependentExtensionProtocolNameMap,
// ) => actionContribute<'uiData>
