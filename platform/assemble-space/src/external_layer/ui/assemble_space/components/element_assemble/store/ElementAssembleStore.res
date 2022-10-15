open FrontendUtils.ElementAssembleStoreType

let _buildDefaultUIControlInspectorData = id => {
  {
    id: id,
    rect: {
      x: 0->IntForRectField,
      y: 0->IntForRectField,
      width: 20->IntForRectField,
      height: 20->IntForRectField,
    },
    isDraw: true->BoolForIsDraw,
    skin: None,
    event: [],
  }
}

let _createState = () => {
  selectedUIControls: list{},
  inspectorCurrentUIControlId: None,
  selectedUIControlInspectorData: list{},
  visualExtension: None,
  runVisualExtension: None,
  elementContributeData: None,
  isShowElementInspector: false,
  elementInspectorData: {
    elementStateFields: list{},
    reducers: {
      role: None,
      handlers: list{},
    },
  },
}

let _setUIControlInspectorData = (state, setFunc, id) => {
  {
    ...state,
    selectedUIControlInspectorData: state.selectedUIControlInspectorData->Meta3dCommonlib.ListSt.map(
      data => {
        data.id === id ? setFunc(data) : data
      },
    ),
  }
}

let reducer = (state, action) => {
  switch action {
  | Reset => _createState()
  | ResetWhenSwitch => {
      ..._createState(),
      visualExtension: state.visualExtension,
    }

  | SelectUIControl(protocolIconBase64, protocolConfigStr, name, data) => {
      let id = IdUtils.generateId(Js.Math.random)

      {
        ...state,
        selectedUIControls: state.selectedUIControls->Meta3dCommonlib.ListSt.push({
          id: id,
          protocolIconBase64: protocolIconBase64,
          protocolConfigStr: protocolConfigStr,
          name: name,
          data: data,
        }),
        selectedUIControlInspectorData: state.selectedUIControlInspectorData->Meta3dCommonlib.ListSt.push(
          _buildDefaultUIControlInspectorData(id),
        ),
      }
    }
  | SetRect(id, rect) =>
    _setUIControlInspectorData(
      state,
      data => {
        ...data,
        rect: rect,
      },
      id,
    )
  | SetIsDraw(id, isDraw) =>
    _setUIControlInspectorData(
      state,
      data => {
        ...data,
        isDraw: isDraw,
      },
      id,
    )

  | SetAction(id, (eventName, actionNameOpt)) =>
    _setUIControlInspectorData(
      state,
      data => {
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
            eventData.eventName === eventName && !(actionNameOpt->Meta3dCommonlib.OptionSt.isSome)
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
      },
      id,
    )
  | SetSkin(id, skinNameOpt) =>
    _setUIControlInspectorData(
      state,
      data => {
        ...data,
        skin: skinNameOpt->Meta3dCommonlib.OptionSt.map(skinName => {
          {skinName: skinName}
        }),
      },
      id,
    )
  | SetInspectorCurrentUIControlId(id) => {
      ...state,
      inspectorCurrentUIControlId: id->Some,
      isShowElementInspector: false,
    }
  | ShowElementInspector => {
      ...state,
      inspectorCurrentUIControlId: None,
      isShowElementInspector: true,
    }
  | SetVisualExtension(visualExtension) => {
      ...state,
      visualExtension: visualExtension->Some,
    }
  | SetRunVisualExtension(runVisualExtension) => {
      ...state,
      runVisualExtension: runVisualExtension->Some,
    }
  | SetElementContributeData(elementContributeData) => {
      ...state,
      elementContributeData: elementContributeData->Some,
    }
  | SetElementStateFields(elementStateFields) => {
      ...state,
      elementInspectorData: {
        ...state.elementInspectorData,
        elementStateFields: elementStateFields,
      },
    }
  | SetRole(role) => {
      ...state,
      elementInspectorData: {
        ...state.elementInspectorData,
        reducers: {
          ...state.elementInspectorData.reducers,
          role: role,
        },
      },
    }
  | SetHandlers(handlers) => {
      ...state,
      elementInspectorData: {
        ...state.elementInspectorData,
        reducers: {
          ...state.elementInspectorData.reducers,
          handlers: handlers,
        },
      },
    }
  | Import(selectedUIControls, selectedUIControlInspectorData, elementInspectorData) => {
      ...state,
      selectedUIControls: selectedUIControls,
      selectedUIControlInspectorData: selectedUIControlInspectorData,
      elementInspectorData: elementInspectorData,
      // elementContributeData: None,
    }
  }
}

let initialState = _createState()
