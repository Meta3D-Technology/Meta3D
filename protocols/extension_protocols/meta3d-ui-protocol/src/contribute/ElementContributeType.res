type elementName = string

type elementFunc<'elementState> = (
  . Meta3dType.Index.state,
  'elementState,
) => Js.Promise.t<Meta3dType.Index.state>

type execOrder = int

type handler = {
  actionName: string,
  updatedElementStateFieldName: string,
}

type reducer = {
  role: string,
  handlers: array<handler>,
}

type elementContribute<'elementState> = {
  elementName: elementName,
  execOrder: execOrder,
  elementFunc: elementFunc<'elementState>,
  elementState: 'elementState,
  reducer: Js.Nullable.t<reducer>,
}

// type getElementContribute<'dependentExtensionNameMap, 'elementState> = (
//   Meta3dType.Index.api,
//   'dependentExtensionNameMap,
// ) => elementContribute<'elementState>

// type reducerFunc<'elementState, 'action> = ('elementState, 'action) => 'elementState

// type reducerData<'elementState, 'action> = (elementName, reducerFunc<'elementState, 'action>)
type reducerData = (elementName, reducer)
