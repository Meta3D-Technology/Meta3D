type elementName = string

// TODO move to StateType?
type elementState

// TODO move to StateType?
type dependentExtensionNameMap

type elementFunc = (Meta3dType.Index.state, elementName) => Js.Promise.t<Meta3dType.Index.state>

type elementContribute<'elementState> = {
  elementName: elementName,
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

type reducerData<'elementState, 'action> = (elementName, reducerFunc<'elementState, 'action>)
