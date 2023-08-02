type actionName = string

type eventHandler = (
  Meta3dType.Index.state,
  StateType.actionData,
) => Js.Promise.t<Meta3dType.Index.state>

type actionContribute = {
  actionName: actionName,
  handler: eventHandler,
}

// type getActionContribute<'dependentExtensionProtocolNameMap, 'actionData> = (
//   Meta3dType.Index.api,
//   'dependentExtensionProtocolNameMap,
// ) => actionContribute<'actionData>
