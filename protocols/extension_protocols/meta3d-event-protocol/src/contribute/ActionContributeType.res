type actionName = string

type eventHandler<'actionData> = (
  Meta3dType.Index.state,
  'actionData,
) => Js.Promise.t<Meta3dType.Index.state>

type actionContribute<'actionData> = {
  actionName: actionName,
  handler: eventHandler<'actionData>,
}

// type getActionContribute<'dependentExtensionNameMap, 'actionData> = (
//   Meta3dType.Index.api,
//   'dependentExtensionNameMap,
// ) => actionContribute<'actionData>
