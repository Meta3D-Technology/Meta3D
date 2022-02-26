type id = string

type uiExtensionName = Meta3dType.Index.extensionName

type execState

type dependentExtensionNameMap

type execFunc<'dependentExtensionNameMap> = (
  (Meta3dType.Index.api, 'dependentExtensionNameMap),
  Meta3dType.Index.state,
) => Js.Promise.t<Meta3dType.Index.state>

type registeredExecFunc = Meta3dType.Index.state => Js.Promise.t<Meta3dType.Index.state>

type registerData<'execState> = {
  id: id,
  execFunc: registeredExecFunc,
  execState: 'execState,
}
