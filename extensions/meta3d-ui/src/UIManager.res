let hide = (
  state: Meta3dUiProtocol.StateType.state,
  elementName: Meta3dUiProtocol.ElementContributeType.elementName,
) => {
  {
    ...state,
    isShowMap: state.isShowMap->Meta3dCommonlib.ImmutableHashMap.set(elementName, false),
  }
}

let show = (
  state: Meta3dUiProtocol.StateType.state,
  elementName: Meta3dUiProtocol.ElementContributeType.elementName,
) => {
  {
    ...state,
    isShowMap: state.isShowMap->Meta3dCommonlib.ImmutableHashMap.set(elementName, true),
  }
}

let _markStateChange = (
  state: Meta3dUiProtocol.StateType.state,
  elementName: Meta3dUiProtocol.ElementContributeType.elementName,
) => {
  {
    ...state,
    isStateChangeMap: state.isStateChangeMap->Meta3dCommonlib.ImmutableHashMap.set(
      elementName,
      true,
    ),
  }
}

let _markStateNotChange = (
  state: Meta3dUiProtocol.StateType.state,
  elementName: Meta3dUiProtocol.ElementContributeType.elementName,
) => {
  {
    ...state,
    isStateChangeMap: state.isStateChangeMap->Meta3dCommonlib.ImmutableHashMap.set(
      elementName,
      false,
    ),
  }
}

let _markAllStateNotChange = (
  state: Meta3dUiProtocol.StateType.state,
  needMarkStateNotChangeIds,
) => {
  needMarkStateNotChangeIds->Meta3dCommonlib.ArraySt.reduceOneParam((. state, elementName) => {
    _markStateNotChange(state, elementName)
  }, state)
}

// let combineReducers = (state: Meta3dUiProtocol.StateType.state, reducerData) => {
//   {
//     ...state,
//     reducers: state.reducers->Meta3dCommonlib.ArraySt.push(reducerData),
//   }
// }

let _getElementStateExn = (
  {elementStateMap}: Meta3dUiProtocol.StateType.state,
  elementName: Meta3dUiProtocol.ElementContributeType.elementName,
) => {
  elementStateMap->Meta3dCommonlib.ImmutableHashMap.getExn(elementName)
}

let getElementState = (
  {elementStateMap}: Meta3dUiProtocol.StateType.state,
  elementName: Meta3dUiProtocol.ElementContributeType.elementName,
) => {
  elementStateMap->Meta3dCommonlib.ImmutableHashMap.getNullable(elementName)
}

let _setElementState = (
  state: Meta3dUiProtocol.StateType.state,
  elementName: Meta3dUiProtocol.ElementContributeType.elementName,
  elementState: Meta3dUiProtocol.StateType.elementState,
) => {
  {
    ...state,
    elementStateMap: state.elementStateMap->Meta3dCommonlib.ImmutableHashMap.set(
      elementName,
      elementState,
    ),
  }
}

let _getElementExecOrderExn = (
  state: Meta3dUiProtocol.StateType.state,
  elementName: Meta3dUiProtocol.ElementContributeType.elementName,
) => {
  state.elementExecOrderMap->Meta3dCommonlib.ImmutableHashMap.getExn(elementName)
}

let _setElementExecOrder = (
  state: Meta3dUiProtocol.StateType.state,
  elementName: Meta3dUiProtocol.ElementContributeType.elementName,
  execOrder: Meta3dUiProtocol.ElementContributeType.execOrder,
) => {
  {
    ...state,
    elementExecOrderMap: state.elementExecOrderMap->Meta3dCommonlib.ImmutableHashMap.set(
      elementName,
      execOrder,
    ),
  }
}

let _getCurrentElementName = (state: Meta3dUiProtocol.StateType.state) => {
  state.currentElementName->Meta3dCommonlib.OptionSt.getExn
}

let _setCurrentElementName = (state: Meta3dUiProtocol.StateType.state, elementName) => {
  ...state,
  currentElementName: Some(elementName),
}

let updateElementState = (
  state: Meta3dUiProtocol.StateType.state,
  updateElementStateFunc,
) => {
  let elementName = _getCurrentElementName(state)

  let oldElementState = _getElementStateExn(state, elementName)

  let newElementState = updateElementStateFunc(oldElementState)

  oldElementState != newElementState
    ? {
        state->_markStateChange(elementName)->_setElementState(elementName, newElementState)
      }
    : {
        state->_markStateNotChange(elementName)
      }
}

// let getIOData = ({ioData}: Meta3dUiProtocol.StateType.state) => {
//   ioData
// }

// let _setIOData = (state: Meta3dUiProtocol.StateType.state, ioData) => {
//   {
//     ...state,
//     // ioData: ioData->Some,
//     ioData: ioData
//   }
// }

// let _prepare = (state: Meta3dUiProtocol.StateType.state, ioData) => {
//   {
//     ...state,
//     ioData: ioData,
//     // drawData: createEmptyDrawData(),
//   }
// }

let _exec = (meta3dState, state: Meta3dUiProtocol.StateType.state) => {
  let {isShowMap, isStateChangeMap, elementFuncMap, elementStateMap} = state

  isShowMap
  ->Meta3dCommonlib.ImmutableHashMap.entries
  ->Js.Array.sortInPlaceWith(
    ((elementName1, _), (elementName2, _)) =>
      _getElementExecOrderExn(state, elementName1) - _getElementExecOrderExn(state, elementName2),
    _,
  )
  ->Meta3dCommonlib.ArraySt.traverseReducePromiseM(
    (. (meta3dState, needMarkStateNotChangeIds), (elementName, isShow)) => {
      // isShow && _getStateChangeExn(state, elementName)
      isShow
        ? {
            let elementFunc = elementFuncMap->Meta3dCommonlib.ImmutableHashMap.getExn(elementName)

            /* !
              TODO should judge is state change in elementFunc:
             if state not change, not update geometry buffer, but should render if isShow!!! 

 */

            elementFunc(.
              meta3dState,
              _getElementStateExn(state, elementName),
            )->Meta3dCommonlib.PromiseSt.map(meta3dState => {
              (meta3dState, needMarkStateNotChangeIds->Meta3dCommonlib.ArraySt.push(elementName))
            })
          }
        : (meta3dState, needMarkStateNotChangeIds)->Js.Promise.resolve
    },
    (meta3dState, []),
  )
}

let _invokeIMGUIRenderFunc = (
  meta3dState,
  invokeFunc,
  (api: Meta3dType.Index.api, imguiRendererExtensionProtocolName),
) => {
  let imguiRendererState = api.getExtensionState(. meta3dState, imguiRendererExtensionProtocolName)

  let imguiRendererService: Meta3dImguiRendererProtocol.ServiceType.service = api.getExtensionService(.
    meta3dState,
    imguiRendererExtensionProtocolName,
  )

  let imguiRendererState = invokeFunc(imguiRendererState, imguiRendererService)

  let meta3dState = api.setExtensionState(.
    meta3dState,
    imguiRendererExtensionProtocolName,
    imguiRendererState,
  )

  meta3dState
}

let _invokeIMGUIRenderFuncWithParam = (
  meta3dState,
  invokeFunc,
  (api: Meta3dType.Index.api, imguiRendererExtensionProtocolName),
) => {
  let imguiRendererState = api.getExtensionState(. meta3dState, imguiRendererExtensionProtocolName)

  let imguiRendererService: Meta3dImguiRendererProtocol.ServiceType.service = api.getExtensionService(.
    meta3dState,
    imguiRendererExtensionProtocolName,
  )

  let (imguiRendererState, param) = invokeFunc(imguiRendererState, imguiRendererService)

  let meta3dState = api.setExtensionState(.
    meta3dState,
    imguiRendererExtensionProtocolName,
    imguiRendererState,
  )

  (meta3dState, param)
}

let _invokeIMGUIRenderFuncReturnData = (
  meta3dState,
  invokeFunc,
  (api: Meta3dType.Index.api, imguiRendererExtensionProtocolName),
) => {
  let imguiRendererState = api.getExtensionState(. meta3dState, imguiRendererExtensionProtocolName)

  let imguiRendererService: Meta3dImguiRendererProtocol.ServiceType.service = api.getExtensionService(.
    meta3dState,
    imguiRendererExtensionProtocolName,
  )

  invokeFunc(imguiRendererState, imguiRendererService)
}

let render = (
  api: Meta3dType.Index.api,
  meta3dState: Meta3dType.Index.state,
  (uiExtensionProtocolName, imguiRendererExtensionProtocolName),
  time,
) => {
  let state: Meta3dUiProtocol.StateType.state = api.getExtensionState(.
    meta3dState,
    uiExtensionProtocolName,
  )

  let meta3dState = api.setExtensionState(. meta3dState, uiExtensionProtocolName, state)

  let meta3dState = _invokeIMGUIRenderFunc(
    meta3dState,
    (imguiRendererState, imguiRendererService) =>
      imguiRendererService.beforeExec(. imguiRendererState, time),
    (api, imguiRendererExtensionProtocolName),
  )

  _exec(meta3dState, state)
  ->Meta3dCommonlib.PromiseSt.map(((meta3dState, needMarkStateNotChangeIds)) => {
    let state: Meta3dUiProtocol.StateType.state = api.getExtensionState(.
      meta3dState,
      uiExtensionProtocolName,
    )

    let state = state->_markAllStateNotChange(needMarkStateNotChangeIds)

    api.setExtensionState(. meta3dState, uiExtensionProtocolName, state)
  })
  ->Meta3dCommonlib.PromiseSt.map(meta3dState => {
    _invokeIMGUIRenderFunc(
      meta3dState,
      (imguiRendererState, imguiRendererService) => {
        imguiRendererService.afterExec()
        imguiRendererService.render()

        imguiRendererState
      },
      (api, imguiRendererExtensionProtocolName),
    )
  })
}

let _setElementFunc = (
  state: Meta3dUiProtocol.StateType.state,
  elementName: Meta3dUiProtocol.ElementContributeType.elementName,
  elementFunc,
) => {
  {
    ...state,
    elementFuncMap: state.elementFuncMap->Meta3dCommonlib.ImmutableHashMap.set(
      elementName,
      elementFunc,
    ),
  }
}

// let _addReducers = (state: Meta3dUiProtocol.StateType.state, elementName, reducers) => {
//   reducers
//   ->Meta3dCommonlib.NullableSt.map((. reducers): Meta3dUiProtocol.StateType.state => {
//     {
//       ...state,
//       reducers: state.reducers->Meta3dCommonlib.ArraySt.push((elementName, reducers)),
//     }
//   })
//   ->Meta3dCommonlib.NullableSt.getWithDefault(state)
// }

// let _setElementUIControlStates = (
//   state: Meta3dUiProtocol.StateType.state,
//   elementName: Meta3dUiProtocol.ElementContributeType.elementName,
//   uiControlStates: Meta3dUiProtocol.ElementContributeType.uiControlStates,
// ) => {
//   {
//     ...state,
//     elementUIControlStatesMap: state.elementUIControlStatesMap->Meta3dCommonlib.ImmutableHashMap.set(
//       elementName,
//       uiControlStates,
//     ),
//   }
// }

let registerElement = (
  state: Meta3dUiProtocol.StateType.state,
  {
    elementName,
    execOrder,
    elementFunc,
    elementState,
    // uiControlStates,
    // reducers,
  }: Meta3dUiProtocol.ElementContributeType.elementContribute<
    Meta3dUiProtocol.StateType.elementState,
  >,
) => {
  state
  ->_setCurrentElementName(elementName)
  ->_setElementFunc(elementName, elementFunc)
  ->_setElementState(elementName, elementState)
  // ->_setElementUIControlStates(elementName, uiControlStates)
  ->_setElementExecOrder(elementName, execOrder)
  // ->_addReducers(elementName, reducers)
  ->show(elementName)
  ->_markStateChange(elementName)
}

let registerSkin = (
  state: Meta3dUiProtocol.StateType.state,
  skinContribute: Meta3dUiProtocol.SkinContributeType.skinContribute<
    Meta3dUiProtocol.StateType.skin,
  >,
) => {
  {
    ...state,
    skinContributeMap: state.skinContributeMap->Meta3dCommonlib.ImmutableHashMap.set(
      skinContribute.skinName,
      skinContribute,
    ),
  }
}

let registerUIControl = (
  state: Meta3dUiProtocol.StateType.state,
  uiControlContribute: Meta3dUiProtocol.UIControlContributeType.uiControlContribute<
    Meta3dUiProtocol.StateType.inputData,
    Meta3dUiProtocol.StateType.outputData,
  >,
) => {
  {
    ...state,
    uiControlContributeMap: state.uiControlContributeMap->Meta3dCommonlib.ImmutableHashMap.set(
      uiControlContribute.uiControlName,
      uiControlContribute,
    ),
  }
}

let getSkin = (state: Meta3dUiProtocol.StateType.state, skinName) => {
  state.skinContributeMap->Meta3dCommonlib.ImmutableHashMap.getNullable(skinName)
}

let _getUIControlExn = (state: Meta3dUiProtocol.StateType.state, uiControlName) => {
  state.uiControlContributeMap->Meta3dCommonlib.ImmutableHashMap.getExn(uiControlName)
}

// let getUIControlDataExn = (state: Meta3dUiProtocol.StateType.state, uiControlName) => {
//   _getUIControlExn(state, uiControlName).data
// }

let getUIControlFuncExn = (state: Meta3dUiProtocol.StateType.state, uiControlName) => {
  _getUIControlExn(state, uiControlName).func
}

// let updateUIControlName = (
//   meta3dState,
//   (api: Meta3dType.Index.api, uiExtensionProtocolName),
//   (oldUIControlName, newUIControlName),
// ) => {
//   let meta3dState = api.removeUIControlContribute(. meta3dState, oldUIControlName)

//   let state: Meta3dUiProtocol.StateType.state = api.getExtensionState(.
//     meta3dState,
//     uiExtensionProtocolName,
//   )

//   let uiControlContribute = _getUIControlExn(state, oldUIControlName)

//   api.setExtensionState(.
//     meta3dState,
//     uiExtensionProtocolName,
//     {
//       ...state,
//       uiControlContributeMap: state.uiControlContributeMap
//       ->Meta3dCommonlib.ImmutableHashMap.deleteVal(oldUIControlName)
//       ->Meta3dCommonlib.ImmutableHashMap.set(newUIControlName, uiControlContribute),
//     },
//   )
// }

// let _setUIControlState = (
//   state: Meta3dUiProtocol.StateType.state,
//   uiControlName,
//   uiControlState,
// ) => {
//   {
//     ...state,
//     uiControlStateMap: state.uiControlStateMap->Meta3dCommonlib.ImmutableHashMap.set(
//       uiControlName,
//       uiControlState,
//     ),
//   }
// }

// let _getCurrentElementUIControlStatesExn = (
//   {elementUIControlStatesMap}: Meta3dUiProtocol.StateType.state,
//   isDebug,
// ) => {
//   Meta3dCommonlib.Contract.requireCheck(() => {
//     open Meta3dCommonlib.Contract
//     open Operators

//     test(
//       Meta3dCommonlib.Log.buildAssertMessage(~expect=j`only has one element`, ~actual=j`not`),
//       () =>
//         elementUIControlStatesMap
//         ->Meta3dCommonlib.ImmutableHashMap.entries
//         ->Meta3dCommonlib.ArraySt.length
//         ->assertEqual(Int, _, 1),
//     )
//   }, isDebug)

//   elementUIControlStatesMap
//   ->Meta3dCommonlib.ImmutableHashMap.entries
//   ->Meta3dCommonlib.ArraySt.getExn(0)
//   ->Meta3dCommonlib.Tuple2.getLast
// }

// let getUIControlStateExn = (state: Meta3dUiProtocol.StateType.state, uiControlName, isDebug) => {
//   _getCurrentElementUIControlStatesExn(state, isDebug)->Meta3dCommonlib.ImmutableHashMap.getExn(
//     uiControlName,
//   )
// }

let getUIControlState = (state: Meta3dUiProtocol.StateType.state, uiControlName) => {
  state.uiControlStateMap->Meta3dCommonlib.ImmutableHashMap.getNullable(uiControlName)
}

let setUIControlState = (
  state: Meta3dUiProtocol.StateType.state,
  uiControlName,
  uiControlState,
) => {
  {
    ...state,
    uiControlStateMap: state.uiControlStateMap->Meta3dCommonlib.ImmutableHashMap.set(
      uiControlName,
      uiControlState,
    ),
  }
}

// let prepare = (state: Meta3dUiProtocol.StateType.state, meta3dState, api: Meta3dType.Index.api) => {
// let prepare = (state: Meta3dUiProtocol.StateType.state, allUIControlContributes) => {
//   // api.getAllContributesByType(
//   //   meta3dState,
//   //   Meta3dType.ContributeType.UIControl,
//   // )
//   allUIControlContributes->Meta3dCommonlib.ArraySt.reduceOneParam(
//     (.
//       state,
//       uiControlContribute: Meta3dUiProtocol.UIControlContributeType.uiControlContribute<
//         Meta3dUiProtocol.StateType.uiControlState,
//         Meta3dUiProtocol.StateType.inputData,
//         Meta3dUiProtocol.StateType.outputData,
//       >,
//     ) => {
//       _setUIControlState(
//         state,
//         uiControlContribute.uiControlName,
//         uiControlContribute.createStateFunc(),
//       )
//     },
//     state,
//   )
// }

let isStateChange = (
  state: Meta3dUiProtocol.StateType.state,
  elementName: Meta3dUiProtocol.ElementContributeType.elementName,
) => {
  state.isStateChangeMap->Meta3dCommonlib.ImmutableHashMap.getExn(elementName)
}

let setStyle = (meta3dState, data, style) => {
  _invokeIMGUIRenderFunc(
    meta3dState,
    (imguiRendererState, imguiRendererService) =>
      imguiRendererService.setStyle(. imguiRendererState, style),
    data,
  )
}

let beginWindow = (meta3dState, data, label: Meta3dImguiRendererProtocol.ServiceType.label) => {
  _invokeIMGUIRenderFunc(
    meta3dState,
    (imguiRendererState, imguiRendererService) => {
      imguiRendererService.beginWindow(. label)

      imguiRendererState
    },
    data,
  )
}

let endWindow = (meta3dState, data) => {
  _invokeIMGUIRenderFunc(
    meta3dState,
    (imguiRendererState, imguiRendererService) => {
      imguiRendererService.endWindow()

      imguiRendererState
    },
    data,
  )
}

let setNextWindowRect = (meta3dState, data, rect: Meta3dImguiRendererProtocol.ServiceType.rect) => {
  _invokeIMGUIRenderFunc(
    meta3dState,
    (imguiRendererState, imguiRendererService) => {
      imguiRendererService.setNextWindowRect(. rect)

      imguiRendererState
    },
    data,
  )
}

let getFBOTexture = (state: Meta3dUiProtocol.StateType.state, textureID) => {
  state.fboTextureMap->Meta3dCommonlib.ImmutableHashMap.getNullable(textureID)
}

let setFBOTexture = (state: Meta3dUiProtocol.StateType.state, textureID, texture) => {
  {
    ...state,
    fboTextureMap: state.fboTextureMap->Meta3dCommonlib.ImmutableHashMap.set(textureID, texture),
  }
}

let addFBOTexture = (meta3dState, data, texture, rect) => {
  _invokeIMGUIRenderFunc(
    meta3dState,
    (imguiRendererState, imguiRendererService) => {
      imguiRendererService.addFBOTexture(. texture, rect)

      imguiRendererState
    },
    data,
  )
}

let getWindowBarHeight = (meta3dState, data) => {
  _invokeIMGUIRenderFuncReturnData(
    meta3dState,
    (imguiRendererState, imguiRendererService) => {
      imguiRendererService.getWindowBarHeight()
    },
    data,
  )
}

let getContext = (meta3dState, data) => {
  _invokeIMGUIRenderFuncReturnData(
    meta3dState,
    (imguiRendererState, imguiRendererService) => {
      imguiRendererService.getContext()
    },
    data,
  )
}

let button = (meta3dState, data, label: Meta3dImguiRendererProtocol.ServiceType.label, size) => {
  _invokeIMGUIRenderFuncWithParam(
    meta3dState,
    (imguiRendererState, imguiRendererService) => {
      (imguiRendererState, imguiRendererService.button(. label, size))
    },
    data,
  )
}

let setCursorPos = (meta3dState, data, pos) => {
  _invokeIMGUIRenderFunc(
    meta3dState,
    (imguiRendererState, imguiRendererService) => {
      imguiRendererService.setCursorPos(. pos)

      imguiRendererState
    },
    data,
  )
}

let clear = (meta3dState, data, clearColor) => {
  _invokeIMGUIRenderFunc(
    meta3dState,
    (imguiRendererState, imguiRendererService) => {
      imguiRendererService.clear(. clearColor)

      imguiRendererState
    },
    data,
  )
}

let init = (
  meta3dState,
  (api: Meta3dType.Index.api, imguiRendererExtensionProtocolName),
  isInitEvent,
  isDebug,
  canvas,
) => {
  let imguiRendererState = api.getExtensionState(. meta3dState, imguiRendererExtensionProtocolName)

  let imguiRendererService: Meta3dImguiRendererProtocol.ServiceType.service = api.getExtensionService(.
    meta3dState,
    imguiRendererExtensionProtocolName,
  )

  imguiRendererService.init(.
    imguiRendererState,
    isInitEvent,
    isDebug,
    canvas,
  )->Meta3dCommonlib.PromiseSt.map(imguiRendererState => {
    api.setExtensionState(. meta3dState, imguiRendererExtensionProtocolName, imguiRendererState)
  })
}
