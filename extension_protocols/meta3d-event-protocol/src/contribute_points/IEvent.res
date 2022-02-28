// TODO move to StateType
type eventData

type eventName = string

type eventHandler<'eventData> = (
  Meta3dType.Index.state,
  'eventData,
) => Js.Promise.t<Meta3dType.Index.state>

type eventContribute<'eventData> = {
  eventName: eventName,
  handler: eventHandler<eventData>,
}

type geteventContribute<'dependentExtensionNameMap, 'eventData> = (
  Meta3dType.Index.api,
  'dependentExtensionNameMap,
) => eventContribute<'eventData>
