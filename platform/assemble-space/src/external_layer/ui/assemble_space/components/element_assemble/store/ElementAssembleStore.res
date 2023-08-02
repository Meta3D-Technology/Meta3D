open FrontendUtils.ElementAssembleStoreType

let _buildDefaultUIControlInspectorData = (id, specific) => {
  {
    id: id,
    rect: {
      x: 0->IntForRectField,
      y: 0->IntForRectField,
      width: 20->IntForRectField,
      height: 20->IntForRectField,
    },
    isDraw: true->BoolForIsDraw,
    event: [],
    specific: specific,
    children: list{},
  }
}

let _createState = () => {
  selectedUIControls: list{},
  parentUIControlId: None,
  inspectorCurrentUIControlId: None,
  selectedUIControlInspectorData: list{},
  visualExtension: None,
  runVisualExtension: None,
  elementContribute: None,
  isShowElementInspector: false,
  elementInspectorData: {
    elementStateFields: list{},
    // reducers: {
    //   role: None,
    //   handlers: list{},
    // },
  },
}

let _setUIControlInspectorData = (state, setFunc, id) => {
  {
    ...state,
    selectedUIControlInspectorData: HierachyUtils.mapSelectedUIControlData(
      setFunc,
      (
        (data: FrontendUtils.ElementAssembleStoreType.uiControlInspectorData) => data.id,
        (data: FrontendUtils.ElementAssembleStoreType.uiControlInspectorData) => data.children,
        (data: FrontendUtils.ElementAssembleStoreType.uiControlInspectorData, children) => {
          ...data,
          children: children,
        },
      ),
      state.selectedUIControlInspectorData,
      id,
    ),
  }
}

let _findParentUIControlId = (
  (hasChildren, serializeUIControlProtocolConfigLib),
  selectedUIControls,
  id,
) => {
  let {protocolConfigStr, parentId} =
    HierachyUtils.findSelectedUIControlData(
      None,
      (
        (data: FrontendUtils.ElementAssembleStoreType.uiControl) => data.id,
        (data: FrontendUtils.ElementAssembleStoreType.uiControl) => data.children,
      ),
      selectedUIControls,
      id,
    )->Meta3dCommonlib.OptionSt.getExn

  hasChildren(. serializeUIControlProtocolConfigLib(. protocolConfigStr)) ? id->Some : parentId
  // ->Meta3dCommonlib.OptionSt.bind(
  //     _findParentUIControlId(
  //       (hasChildren, serializeUIControlProtocolConfigLib),
  //       selectedUIControls,
  //       _,
  //     ),
  //   )
}

let reducer = (state, action) => {
  switch action {
  | Reset => _createState()
  | ResetWhenSwitch => {
      ..._createState(),
      visualExtension: state.visualExtension,
    }
  | SelectUIControl(protocolIconBase64, protocolConfigStr, displayName, data, parentId, specific) => {
      let id = IdUtils.generateId(Js.Math.random)

      let childUIControl = {
        id: id,
        parentId: parentId,
        children: list{},
        protocolIconBase64: protocolIconBase64,
        protocolConfigStr: protocolConfigStr,
        displayName: displayName,
        data: data,
      }

      let childUIControlInspector = _buildDefaultUIControlInspectorData(id, specific)

      {
        ...state,
        selectedUIControls: HierachyUtils.addChildUIControlData(
          (
            (data: FrontendUtils.ElementAssembleStoreType.uiControl) => data.id,
            (data: FrontendUtils.ElementAssembleStoreType.uiControl) => data.children,
            (data: FrontendUtils.ElementAssembleStoreType.uiControl, children) => {
              ...data,
              children: children,
            },
          ),
          state.selectedUIControls,
          childUIControl,
          parentId,
        ),
        selectedUIControlInspectorData: HierachyUtils.addChildUIControlData(
          (
            (data: FrontendUtils.ElementAssembleStoreType.uiControlInspectorData) => data.id,
            (data: FrontendUtils.ElementAssembleStoreType.uiControlInspectorData) => data.children,
            (data: FrontendUtils.ElementAssembleStoreType.uiControlInspectorData, children) => {
              ...data,
              children: children,
            },
          ),
          state.selectedUIControlInspectorData,
          childUIControlInspector,
          parentId,
        ),
      }
    }
  | SetSpecificData(id, specific) =>
    _setUIControlInspectorData(
      state,
      data => {
        ...data,
        specific: specific,
      },
      id,
    )
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
  | SelectRootUIControl => {
      ...state,
      parentUIControlId: None,
      inspectorCurrentUIControlId: None,
      isShowElementInspector: false,
    }
  | SelectSelectedUIControl(funcs, id) => {
      ...state,
      parentUIControlId: _findParentUIControlId(funcs, state.selectedUIControls, id),
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
  | SetElementContribute(elementContribute) => {
      ...state,
      elementContribute: elementContribute->Some,
    }
  | SetElementStateFields(elementStateFields) => {
      ...state,
      elementInspectorData: {
        ...state.elementInspectorData,
        elementStateFields: elementStateFields,
      },
    }
  // | SetRole(role) => {
  //     ...state,
  //     elementInspectorData: {
  //       ...state.elementInspectorData,
  //       reducers: {
  //         ...state.elementInspectorData.reducers,
  //         role: role,
  //       },
  //     },
  //   }
  // | SetHandlers(handlers) => {
  //     ...state,
  //     elementInspectorData: {
  //       ...state.elementInspectorData,
  //       reducers: {
  //         ...state.elementInspectorData.reducers,
  //         handlers: handlers,
  //       },
  //     },
  //   }
  | Import(selectedUIControls, selectedUIControlInspectorData, elementInspectorData) => {
      ...state,
      selectedUIControls: selectedUIControls,
      selectedUIControlInspectorData: selectedUIControlInspectorData,
      elementInspectorData: elementInspectorData,
      // elementContribute: None,
    }
  }
}

let initialState = _createState()
