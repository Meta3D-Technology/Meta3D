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
    event: [],
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
  | SetAction(id, (eventName, actionNameOpt)) => {
      ...state,
      selectedUIControlInspectorData: state.selectedUIControlInspectorData->Meta3dCommonlib.ListSt.map(
        data => {
          data.id === id
            ? {
                {
                  ...data,
                  event: switch data.event {
                  | event
                    if event->Meta3dCommonlib.ArraySt.length == 0 &&
                      actionNameOpt->Meta3dCommonlib.OptionSt.isSome => [
                      {
                        eventName: eventName,
                        actionName: actionNameOpt->Meta3dCommonlib.OptionSt.getExn,
                      },
                    ]
                  | _ =>
                    data.event
                    ->Meta3dCommonlib.ArraySt.filter(eventData => {
                      eventData.eventName === eventName &&
                        !(actionNameOpt->Meta3dCommonlib.OptionSt.isSome)
                        ? false
                        : true
                    })
                    ->Meta3dCommonlib.ArraySt.map(eventData => {
                      eventData.eventName === eventName
                        ? {
                            {
                              eventName: eventName,
                              actionName: actionNameOpt->Meta3dCommonlib.OptionSt.getExn,
                            }
                          }
                        : eventData
                    })
                  },
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
