open ElementAssembleStoreType

let _buildDefaultUIControlInspectorData = (id, specific) => {
  {
    id,
    rect: {
      x: 0->IntForRectField,
      y: 0->IntForRectField,
      width: 20->IntForRectField,
      height: 20->IntForRectField,
    },
    isDraw: true->BoolForIsDraw,
    event: [],
    input: None,
    specific,
    children: list{},
  }
}

let _createState = () => {
  canvasData: {
    width: 0,
    height: 0,
  },
  selectedUIControls: list{},
  parentUIControlId: None,
  inspectorCurrentUIControlId: None,
  selectedUIControlInspectorData: list{},
  // visualExtension: None,
  // runVisualExtension: None,
  elementContribute: None,
  // isShowElementInspector: false,
  // elementInspectorData: {
  //   elementStateFields: list{},
  //   // reducers: {
  //   //   role: None,
  //   //   handlers: list{},
  //   // },
  // },
  // isImportElement: false,
  // isImportElementCustom: false,
  customInputs: list{},
  customActions: list{},
  currentCustomInputName: None,
}

let _setUIControlInspectorData = (state, setFunc, id) => {
  {
    ...state,
    selectedUIControlInspectorData: HierachyUtils.mapSelectedUIControlData(
      setFunc,
      (
        (data: ElementAssembleStoreType.uiControlInspectorData) => data.id,
        (data: ElementAssembleStoreType.uiControlInspectorData) => data.children,
        (data: ElementAssembleStoreType.uiControlInspectorData, children) => {
          ...data,
          children,
        },
      ),
      state.selectedUIControlInspectorData,
      id,
    ),
  }
}

let _setActionData = (state, id, eventName, actionNameOpt) => {
  _setUIControlInspectorData(
    state,
    data => {
      ...data,
      event: switch data.event {
      | event
        if event->Meta3dCommonlib.ArraySt.length == 0 &&
          actionNameOpt->Meta3dCommonlib.OptionSt.isSome => [
          {
            eventName,
            actionName: actionNameOpt->Meta3dCommonlib.OptionSt.getExn,
          },
        ]
      | _ =>
        switch actionNameOpt {
        | None =>
          data.event->Meta3dCommonlib.ArraySt.filter(eventData => {
            eventData.eventName !== eventName
          })
        | Some(actionName) =>
          data.event->Meta3dCommonlib.ArraySt.includesByFunc(eventData => {
            eventData.eventName === eventName
          })
            ? data.event->Meta3dCommonlib.ArraySt.map(eventData => {
                eventData.eventName === eventName
                  ? {
                      (
                        {
                          eventName,
                          actionName,
                        }: eventData
                      )
                    }
                  : eventData
              })
            : data.event->Js.Array.concat(
                [
                  (
                    {
                      eventName,
                      actionName,
                    }: eventData
                  ),
                ],
                _,
              )
        }
      },
    },
    id,
  )
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
        (data: ElementAssembleStoreType.uiControl) => data.id,
        (data: ElementAssembleStoreType.uiControl) => data.children,
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

let _resetInspector = state => {
  ...state,
  inspectorCurrentUIControlId: None,
  currentCustomInputName: None,
}

let _reset = state => {
  {
    ..._createState(),
    canvasData: state.canvasData,
    // customInputs: state.customInputs,
    // customActions: state.customActions,
  }
}

let _resetCurrent = state => {
  {
    ...state,
    currentCustomInputName: None,
    inspectorCurrentUIControlId: None,
  }
}

let reducer = (state, action) => {
  switch action {
  | Reset => state->_reset
  | ResetWhenSwitch => state->_resetInspector
  | SelectUIControl(
      protocolIconBase64,
      protocolConfigStr,
      displayName,
      data,
      parentId,
      specific,
    ) => {
      let id = IdUtils.generateId(Js.Math.random)

      let childUIControl = {
        id,
        parentId,
        children: list{},
        protocolIconBase64,
        protocolConfigStr,
        displayName,
        data,
      }

      let childUIControlInspector = _buildDefaultUIControlInspectorData(id, specific)

      {
        ...state->_resetCurrent,
        selectedUIControls: HierachyUtils.addChildUIControlData(
          (
            (data: ElementAssembleStoreType.uiControl) => data.id,
            (data: ElementAssembleStoreType.uiControl) => data.children,
            (data: ElementAssembleStoreType.uiControl, children) => {
              ...data,
              children,
            },
          ),
          state.selectedUIControls,
          childUIControl,
          parentId,
        ),
        selectedUIControlInspectorData: HierachyUtils.addChildUIControlData(
          (
            (data: ElementAssembleStoreType.uiControlInspectorData) => data.id,
            (data: ElementAssembleStoreType.uiControlInspectorData) => data.children,
            (data: ElementAssembleStoreType.uiControlInspectorData, children) => {
              ...data,
              children,
            },
          ),
          state.selectedUIControlInspectorData,
          childUIControlInspector,
          parentId,
        ),
      }
    }
  | UnSelectUIControlAndChildren(id) => {
      ...state,
      selectedUIControls: HierachyUtils.removeUIControlData(
        (
          (data: ElementAssembleStoreType.uiControl) => data.id,
          (data: ElementAssembleStoreType.uiControl) => data.children,
          (data: ElementAssembleStoreType.uiControl, children) => {
            ...data,
            children,
          },
        ),
        state.selectedUIControls,
        id,
      ),
      selectedUIControlInspectorData: HierachyUtils.removeUIControlData(
        (
          (data: ElementAssembleStoreType.uiControlInspectorData) => data.id,
          (data: ElementAssembleStoreType.uiControlInspectorData) => data.children,
          (data: ElementAssembleStoreType.uiControlInspectorData, children) => {
            ...data,
            children,
          },
        ),
        state.selectedUIControlInspectorData,
        id,
      ),
    }
  | SetSpecificData(id, specific) =>
    _setUIControlInspectorData(
      state,
      data => {
        ...data,
        specific,
      },
      id,
    )
  | SetRect(id, rect) =>
    _setUIControlInspectorData(
      state,
      data => {
        ...data,
        rect,
      },
      id,
    )
  | SetIsDraw(id, isDraw) =>
    _setUIControlInspectorData(
      state,
      data => {
        ...data,
        isDraw,
      },
      id,
    )
  | SetInput(id, inputNameOpt) =>
    _setUIControlInspectorData(
      state,
      data => {
        ...data,
        input: inputNameOpt->Meta3dCommonlib.OptionSt.map((inputName): input => {
          inputName: inputName,
        }),
      },
      id,
    )
  // | SetInputFileStr(id, inputName, inputFileStr) =>
  //   _setUIControlInspectorData(
  //     state,
  //     data => {
  //       ...data,
  //       input: {
  //         inputName,
  //         inputFileStr: inputFileStr->Some,
  //       }->Some,
  //     },
  //     id,
  //   )
  | SetAction(id, (eventName, actionNameOpt)) => _setActionData(state, id, eventName, actionNameOpt)
  // | SetActionFileStr(id, eventName, actionName, actionFileStr) =>
  //   _setActionData(state, id, eventName, actionName->Some, actionFileStr->Some)
  | SelectRootUIControl => {
      ...state->_resetCurrent,
      parentUIControlId: None,
      inspectorCurrentUIControlId: None,
      // isShowElementInspector: false,
    }

  | SelectSelectedUIControl(funcs, id) => {
      ...state->_resetCurrent,
      parentUIControlId: _findParentUIControlId(funcs, state.selectedUIControls, id),
      inspectorCurrentUIControlId: id->Some,
      // isShowElementInspector: false,
    }
  // | ShowElementInspector => {
  //     ...state,
  //     inspectorCurrentUIControlId: None,
  //     isShowElementInspector: true,
  //   }
  // | SetVisualExtension(visualExtension) => {
  //     ...state,
  //     visualExtension: visualExtension->Some,
  //   }
  // | SetRunVisualExtension(runVisualExtension) => {
  //     ...state,
  //     runVisualExtension: runVisualExtension->Some,
  //   }
  | SetElementContribute(elementContribute) => {
      ...state,
      elementContribute: elementContribute->Some,
    }
  // | SetElementStateFields(elementStateFields) => {
  //     ...state,
  //     elementInspectorData: {
  //       ...state.elementInspectorData,
  //       elementStateFields,
  //     },
  //   }
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
  | Import(selectedUIControls, selectedUIControlInspectorData) => {
      ...state,
      selectedUIControls,
      selectedUIControlInspectorData,
      // isImportElement: true,
    }
  // | ImportElementCustom(customInputs) => {
  //     ...state,
  //     customInputs,
  //     // isImportElementCustom: true,
  //   }
  | SetCanvasData(canvasData) => {
      ...state,
      canvasData,
    }
  | AddCustomInput(customInput) => {
      ...state,
      customInputs: state.customInputs->Meta3dCommonlib.ListSt.push(customInput),
    }
  | UpdateCustomInputFileStr(oldInputName, newInputName, fileStr) => {
      ...state,
      customInputs: state.customInputs->Meta3dCommonlib.ListSt.map(customInput => {
        customInput.name == oldInputName
          ? (
              {
                name: newInputName,
                fileStr,
              }: customInput
            )
          : customInput
      }),
    }
  | SelectCustomInput(inputName) => {
      ...state->_resetCurrent,
      currentCustomInputName: inputName->Some,
    }
  | SetCustom(customInputs) => {
      ...state,
      customInputs,
    }
  }
}

let initialState = _createState()
