type eventName = string

type eventHandler<'eventData> = (
  Meta3dType.Index.state,
  'eventData,
) => Js.Promise.t<Meta3dType.Index.state>

type actionContribute<'eventData> = {
  eventName: eventName,
  handler: eventHandler<'eventData>,
}

// type getActionContribute<'dependentExtensionNameMap, 'eventData> = (
//   Meta3dType.Index.api,
//   'dependentExtensionNameMap,
// ) => actionContribute<'eventData>
