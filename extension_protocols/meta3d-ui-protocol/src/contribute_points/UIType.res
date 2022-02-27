type id = string

type uiExtensionName = Meta3dType.Index.extensionName

// TODO move to StateType?
type execState

type dependentExtensionNameMap

type execFunc<'dependentExtensionNameMap> = (
  (Meta3dType.Index.api, 'dependentExtensionNameMap),
  Meta3dType.Index.state,
  id,
) => Js.Promise.t<Meta3dType.Index.state>

type registeredExecFunc = (Meta3dType.Index.state, id) => Js.Promise.t<Meta3dType.Index.state>

type registerData<'execState> = {
  id: id,
  execFunc: registeredExecFunc,
  execState: 'execState,
}

// TODO move to StateType?
type action

type reducerFunc<'execState, 'action> = ('execState, 'action) => 'execState

type reducerData<'execState, 'action> = (id, reducerFunc<'execState, 'action>)
