open FrontendUtils.UIViewStoreType

let reducer = (state, action) => {
  switch action {
  | Reset => {
      ...state,
      selectedUIControls: list{},
      inspectorCurrentUIControlId: None,
    }
  | SelectUIControl(protocolIconBase64, name, data) => {
      ...state,
      selectedUIControls: state.selectedUIControls->Meta3dCommonlib.ListSt.push({
        id: IdUtils.generateId(Js.Math.random),
        protocolIconBase64: protocolIconBase64,
        name: name,
        data: data,
      }),
    }
  | SetInspectorCurrentUIControlId(id) => {
      ...state,
      inspectorCurrentUIControlId: id->Some,
    }
  | SetVisualExtension(visualExtension) => {
      ...state,
      visualExtension: visualExtension->Some,
    }
  }
}

let initialState = {
  selectedUIControls: list{},
  inspectorCurrentUIControlId: None,
  visualExtension: None,
}
