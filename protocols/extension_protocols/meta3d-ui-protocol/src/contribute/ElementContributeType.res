type elementName = string

type elementFunc<'elementState> = (
  Meta3dType.Index.state,
  'elementState,
) => Js.Promise.t<Meta3dType.Index.state>

type execOrder = int

type elementContribute<'elementState> = {
  elementName: elementName,
  execOrder: execOrder,
  elementFunc: elementFunc<'elementState>,
  elementState: 'elementState,
}

// type getElementContribute<'dependentExtensionNameMap, 'elementState> = (
//   Meta3dType.Index.api,
//   'dependentExtensionNameMap,
// ) => elementContribute<'elementState>

type reducerFunc<'elementState, 'action> = ('elementState, 'action) => 'elementState

type reducerData<'elementState, 'action> = (elementName, reducerFunc<'elementState, 'action>)
