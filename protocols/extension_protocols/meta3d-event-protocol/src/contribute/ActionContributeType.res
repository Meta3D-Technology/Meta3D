type actionName = string

type eventHandler<'actionData> = (
  Meta3dType.Index.state,
  'actionData,
) => Js.Promise.t<Meta3dType.Index.state>

type actionContribute<'actionData> = {
  actionName: actionName,
  handler: eventHandler<'actionData>,
}

// type getActionContribute<'dependentExtensionProtocolNameMap, 'actionData> = (
//   Meta3dType.Index.api,
//   'dependentExtensionProtocolNameMap,
// ) => actionContribute<'actionData>
