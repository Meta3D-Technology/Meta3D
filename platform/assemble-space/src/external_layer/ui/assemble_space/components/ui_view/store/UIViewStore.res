open FrontendUtils.UIViewStoreType

let _buildDefaultUIControlInspectorData = id => {
  {
    id: id,
    rect: {
      x: 0,
      y: 0,
      width: 20,
      height: 20,
    },
  }
}

let reducer = (state, action) => {
  switch action {
  | Reset => {
      ...state,
      selectedUIControls: list{},
      inspectorCurrentUIControlId: None,
      selectedUIControlInspectorData: list{},
      visualExtension: None,
      elementContribute: None,
    }
  | SelectUIControl(protocolIconBase64, name, data) => {
      let id = IdUtils.generateId(Js.Math.random)

      {
        ...state,
        selectedUIControls: state.selectedUIControls->Meta3dCommonlib.ListSt.push({
          id: id,
          protocolIconBase64: protocolIconBase64,
          name: name,
          data: data,
        }),
        selectedUIControlInspectorData: state.selectedUIControlInspectorData->Meta3dCommonlib.ListSt.push(
          _buildDefaultUIControlInspectorData(id),
        ),
      }
    }
  | SetRect(id, rect) => {
      ...state,
      selectedUIControlInspectorData: state.selectedUIControlInspectorData->Meta3dCommonlib.ListSt.map(
        data => {
          data.id === id
            ? {
                {
                  ...data,
                  rect: rect,
                }
              }
            : data
        },
      ),
    }
  | SetInspectorCurrentUIControlId(id) => {
      ...state,
      inspectorCurrentUIControlId: id->Some,
    }
  | SetVisualExtension(visualExtension) => {
      ...state,
      visualExtension: visualExtension->Some,
    }
  | SetElementContribute(elementContribute) => {
      ...state,
      elementContribute: elementContribute->Some,
    }
  }
}

let initialState = {
  selectedUIControls: list{},
  inspectorCurrentUIControlId: None,
  selectedUIControlInspectorData: list{},
  visualExtension: None,
  elementContribute: None,
}
