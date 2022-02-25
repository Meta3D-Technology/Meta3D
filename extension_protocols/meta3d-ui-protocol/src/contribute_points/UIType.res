type id = string

type uiExtensionName = Meta3dType.Index.extensionName

type execState

type renderData

type execFunc<'renderData> = (
  Meta3dType.Index.state,
  Meta3dType.Index.api,
  uiExtensionName,
  'renderData,
) => Js.Promise.t<Meta3dType.Index.state>

type registerData<'renderData, 'execState> = {
  id: id,
  execFunc: execFunc<'renderData>,
  execState: 'execState,
}
