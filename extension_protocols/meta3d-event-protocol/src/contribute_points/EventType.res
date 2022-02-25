type eventData

type eventName = string

type eventExtensionName = Meta3dType.Index.extensionName

type eventHandler<'eventData> = (
  Meta3dType.Index.state,
  Meta3dType.Index.api,
  eventExtensionName,
  'eventData,
) => Js.Promise.t<Meta3dType.Index.state>
