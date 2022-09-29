open FrontendUtils.UIViewStoreType

let reducer = (state, action) => {
  switch action {
  | Reset => {
      ...state,
      selectedUIControls: list{},
      inspectorCurrentUIControlId: None,
      canvasData: {
        width: 0,
        height: 0,
      },
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
  | SetCanvasData(canvasData) => {
      ...state,
      canvasData: canvasData,
    }
  }
}

let initialState = {
  selectedUIControls: list{},
  inspectorCurrentUIControlId: None,
  canvasData: {
    width: 0,
    height: 0,
  },
}
