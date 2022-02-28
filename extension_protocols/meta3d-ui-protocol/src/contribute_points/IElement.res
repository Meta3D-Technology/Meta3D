// TODO move to StateType?
type elementState

// TODO move to StateType?
type dependentExtensionNameMap

type elementFunc = (Meta3dType.Index.state, UIType.id) => Js.Promise.t<Meta3dType.Index.state>

type elementContribute<'elementState> = {
  id: UIType.id,
  elementFunc: elementFunc,
  elementState: 'elementState,
}

type getElementContribute<'dependentExtensionNameMap, 'elementState> = (
  Meta3dType.Index.api,
  'dependentExtensionNameMap,
) => elementContribute<'elementState>

// TODO move to StateType?
type action

type reducerFunc<'elementState, 'action> = ('elementState, 'action) => 'elementState

type reducerData<'elementState, 'action> = (UIType.id, reducerFunc<'elementState, 'action>)
