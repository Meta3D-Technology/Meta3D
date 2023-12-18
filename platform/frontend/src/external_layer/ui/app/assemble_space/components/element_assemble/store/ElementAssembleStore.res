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
  currentCustomActionName: None,
  isInCreateFromScratchTourPhase2: false,
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

let _updateAllUIControlInspectorData = (state, setFunc) => {
  {
    ...state,
    selectedUIControlInspectorData: HierachyUtils.mapAllSelectedUIControlData(
      setFunc,
      (
        (data: ElementAssembleStoreType.uiControlInspectorData) => data.children,
        (data: ElementAssembleStoreType.uiControlInspectorData, children) => {
          ...data,
          children,
        },
      ),
      state.selectedUIControlInspectorData,
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

let _resetCurrent = state => {
  {
    ...state,
    currentCustomInputName: None,
    currentCustomActionName: None,
    inspectorCurrentUIControlId: None,
  }
}

let _resetInspector = state => {
  // ...state,
  // inspectorCurrentUIControlId: None,
  // currentCustomInputName: None,
  // currentCustomActionName: None,
  state->_resetCurrent
}

let _reset = state => {
  {
    ..._createState(),
    // canvasData: state.canvasData,
    isInCreateFromScratchTourPhase2: state.isInCreateFromScratchTourPhase2,
    // customInputs: state.customInputs,
    // customActions: state.customActions,
  }
}

let reducer = (state, action) => {
  switch action {
  | Reset => state->_reset
  | ResetWhenSwitch => state->_resetInspector
  | SelectUIControl(
      id,
      protocolIconBase64,
      protocolConfigStr,
      displayName,
      data,
      parentId,
      specific,
    ) => {
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
  | AddCustomAction(customAction) => {
      ...state,
      customActions: state.customActions->Meta3dCommonlib.ListSt.push(customAction),
    }
  | RemoveCustomInput(inputName) => {
      let state = {
        ...state,
        customInputs: state.customInputs->Meta3dCommonlib.ListSt.filter(({name}) =>
          name != inputName
        ),
      }

      state->_updateAllUIControlInspectorData(data => {
        ...data,
        input: data.input->Meta3dCommonlib.OptionSt.bind(input => {
          input.inputName == inputName ? None : input->Some
        }),
      })
    }
  | RemoveCustomAction(actionName) => {
      let state = {
        ...state,
        customActions: state.customActions->Meta3dCommonlib.ListSt.filter(({name}) =>
          name != actionName
        ),
      }

      state->_updateAllUIControlInspectorData(data => {
        ...data,
        event: data.event->Meta3dCommonlib.ArraySt.filter(event => {
          event.actionName != actionName
        }),
      })
    }
  | UpdateCustomInputFileStr(oldInputName, newInputName, newOriginCode, newTranspiledCode) => {
      let state = {
        ...state,
        customInputs: state.customInputs->Meta3dCommonlib.ListSt.map(customInput => {
          customInput.name == oldInputName
            ? (
                {
                  ...customInput,
                  name: newInputName,
                  originFileStr: newOriginCode,
                  transpiledFileStr: newTranspiledCode,
                }: customInput
              )
            : customInput
        }),
      }

      state->_updateAllUIControlInspectorData(data => {
        ...data,
        input: data.input->Meta3dCommonlib.OptionSt.map(({inputName}): input => {
          inputName: inputName == oldInputName ? newInputName : inputName,
        }),
      })
    }
  | UpdateCustomActionFileStr(oldActionName, newActionName, newOriginCode, newTranspiledCode) => {
      let state = {
        ...state,
        customActions: state.customActions->Meta3dCommonlib.ListSt.map(customAction => {
          customAction.name == oldActionName
            ? (
                {
                  name: newActionName,
                  originFileStr: newOriginCode,
                  transpiledFileStr: newTranspiledCode,
                }: customAction
              )
            : customAction
        }),
      }

      state->_updateAllUIControlInspectorData(data => {
        ...data,
        event: data.event->Meta3dCommonlib.ArraySt.map(action => {
          ...action,
          actionName: action.actionName == oldActionName ? newActionName : action.actionName,
        }),
      })
    }
  | SelectCustomInput(inputName) => {
      ...state->_resetCurrent,
      currentCustomInputName: inputName->Some,
    }
  | SelectCustomAction(actionName) => {
      ...state->_resetCurrent,
      currentCustomActionName: actionName->Some,
    }
  | SetCustom(customInputs, customActions) => {
      ...state,
      customInputs,
      customActions,
    }
  | StartCreateFromScratchTourPhase2 => {
      ...state,
      isInCreateFromScratchTourPhase2: true,
    }
  | EndCreateFromScratchTourPhase2 => {
      ...state,
      isInCreateFromScratchTourPhase2: false,
    }
  }
}

let initialState = _createState()
