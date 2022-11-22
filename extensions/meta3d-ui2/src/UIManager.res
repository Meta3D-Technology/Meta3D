let hide = (
  state: Meta3dUi2Protocol.StateType.state,
  elementName: Meta3dUi2Protocol.ElementContributeType.elementName,
) => {
  {
    ...state,
    isShowMap: state.isShowMap->Meta3dCommonlib.ImmutableHashMap.set(elementName, false),
  }
}

let show = (
  state: Meta3dUi2Protocol.StateType.state,
  elementName: Meta3dUi2Protocol.ElementContributeType.elementName,
) => {
  {
    ...state,
    isShowMap: state.isShowMap->Meta3dCommonlib.ImmutableHashMap.set(elementName, true),
  }
}

let _markStateChange = (
  state: Meta3dUi2Protocol.StateType.state,
  elementName: Meta3dUi2Protocol.ElementContributeType.elementName,
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
  state: Meta3dUi2Protocol.StateType.state,
  elementName: Meta3dUi2Protocol.ElementContributeType.elementName,
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
  state: Meta3dUi2Protocol.StateType.state,
  needMarkStateNotChangeIds,
) => {
  needMarkStateNotChangeIds->Meta3dCommonlib.ArraySt.reduceOneParam((. state, elementName) => {
    _markStateNotChange(state, elementName)
  }, state)
}

// let combineReducers = (state: Meta3dUi2Protocol.StateType.state, reducerData) => {
//   {
//     ...state,
//     reducers: state.reducers->Meta3dCommonlib.ArraySt.push(reducerData),
//   }
// }

let _getElementStateExn = (
  {elementStateMap}: Meta3dUi2Protocol.StateType.state,
  elementName: Meta3dUi2Protocol.ElementContributeType.elementName,
) => {
  elementStateMap->Meta3dCommonlib.ImmutableHashMap.getExn(elementName)
}

let getElementState = (
  {elementStateMap}: Meta3dUi2Protocol.StateType.state,
  elementName: Meta3dUi2Protocol.ElementContributeType.elementName,
) => {
  elementStateMap->Meta3dCommonlib.ImmutableHashMap.getNullable(elementName)
}

let _setElementState = (
  state: Meta3dUi2Protocol.StateType.state,
  elementName: Meta3dUi2Protocol.ElementContributeType.elementName,
  elementState: Meta3dUi2Protocol.StateType.elementState,
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
  state: Meta3dUi2Protocol.StateType.state,
  elementName: Meta3dUi2Protocol.ElementContributeType.elementName,
) => {
  state.elementExecOrderMap->Meta3dCommonlib.ImmutableHashMap.getExn(elementName)
}

let _setElementExecOrder = (
  state: Meta3dUi2Protocol.StateType.state,
  elementName: Meta3dUi2Protocol.ElementContributeType.elementName,
  execOrder: Meta3dUi2Protocol.ElementContributeType.execOrder,
) => {
  {
    ...state,
    elementExecOrderMap: state.elementExecOrderMap->Meta3dCommonlib.ImmutableHashMap.set(
      elementName,
      execOrder,
    ),
  }
}

let _updateElementField = %raw(` function(
elementState, 
updatedElementStateFieldName,
updateElementStateFieldFunc
){
  var newElementState = Object.assign({}, elementState)

 newElementState[updatedElementStateFieldName] = updateElementStateFieldFunc(newElementState[updatedElementStateFieldName])

  return newElementState
} `)

let dispatch = (
  state: Meta3dUi2Protocol.StateType.state,
  actionName,
  role,
  updateElementStateFieldFunc,
) => {
  state.reducers->Meta3dCommonlib.ArraySt.reduceOneParam((. state, (elementName, reducers)) => {
    reducers.role === role
      ? {
          let oldElementState = _getElementStateExn(state, elementName)

          let newElementState =
            reducers.handlers
            ->Meta3dCommonlib.ArraySt.filter(handler => handler.actionName === actionName)
            ->Meta3dCommonlib.ArraySt.reduceOneParam(
              (. elementState, {updatedElementStateFieldName}) => {
                _updateElementField(
                  elementState,
                  updatedElementStateFieldName,
                  updateElementStateFieldFunc,
                )
              },
              oldElementState,
            )

          oldElementState != newElementState
            ? {
                state->_markStateChange(elementName)->_setElementState(elementName, newElementState)
              }
            : {
                state->_markStateNotChange(elementName)
              }
        }
      : {
          state
        }
  }, state)
}

// let getIOData = ({ioData}: Meta3dUi2Protocol.StateType.state) => {
//   ioData
// }

// let _setIOData = (state: Meta3dUi2Protocol.StateType.state, ioData) => {
//   {
//     ...state,
//     // ioData: ioData->Some,
//     ioData: ioData
//   }
// }

// let _prepare = (state: Meta3dUi2Protocol.StateType.state, ioData) => {
//   {
//     ...state,
//     ioData: ioData,
//     // drawData: createEmptyDrawData(),
//   }
// }

let _exec = (meta3dState, state: Meta3dUi2Protocol.StateType.state) => {
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
  (api: Meta3dType.Index.api, imguiRendererExtensionName),
) => {
  let imguiRendererState = api.getExtensionState(. meta3dState, imguiRendererExtensionName)

  let imguiRendererService: Meta3dImguiRenderer2Protocol.ServiceType.service = api.getExtensionService(.
    meta3dState,
    imguiRendererExtensionName,
  )

  let imguiRendererState = invokeFunc(imguiRendererState, imguiRendererService)

  let meta3dState = api.setExtensionState(.
    meta3dState,
    imguiRendererExtensionName,
    imguiRendererState,
  )

  meta3dState
}

let _invokeIMGUIRenderFuncWithParam = (
  meta3dState,
  invokeFunc,
  (api: Meta3dType.Index.api, imguiRendererExtensionName),
) => {
  let imguiRendererState = api.getExtensionState(. meta3dState, imguiRendererExtensionName)

  let imguiRendererService: Meta3dImguiRenderer2Protocol.ServiceType.service = api.getExtensionService(.
    meta3dState,
    imguiRendererExtensionName,
  )

  let (imguiRendererState, param) = invokeFunc(imguiRendererState, imguiRendererService)

  let meta3dState = api.setExtensionState(.
    meta3dState,
    imguiRendererExtensionName,
    imguiRendererState,
  )

  (meta3dState, param)
}

let render = (
  api: Meta3dType.Index.api,
  meta3dState: Meta3dType.Index.state,
  (uiExtensionName, imguiRendererExtensionName),
  time,
) => {
  let state: Meta3dUi2Protocol.StateType.state = api.getExtensionState(.
    meta3dState,
    uiExtensionName,
  )

  let meta3dState = api.setExtensionState(. meta3dState, uiExtensionName, state)

  let meta3dState = _invokeIMGUIRenderFunc(
    meta3dState,
    (imguiRendererState, imguiRendererService) =>
      imguiRendererService.beforeExec(. imguiRendererState, time),
    (api, imguiRendererExtensionName),
  )

  _exec(meta3dState, state)
  ->Meta3dCommonlib.PromiseSt.map(((meta3dState, needMarkStateNotChangeIds)) => {
    let state: Meta3dUi2Protocol.StateType.state = api.getExtensionState(.
      meta3dState,
      uiExtensionName,
    )

    let state = state->_markAllStateNotChange(needMarkStateNotChangeIds)

    api.setExtensionState(. meta3dState, uiExtensionName, state)
  })
  ->Meta3dCommonlib.PromiseSt.map(meta3dState => {
    _invokeIMGUIRenderFunc(
      meta3dState,
      (imguiRendererState, imguiRendererService) => {
        imguiRendererService.afterExec(. imguiRendererState)->imguiRendererService.render(. _)
      },
      (api, imguiRendererExtensionName),
    )
  })
}

let _setElementFunc = (
  state: Meta3dUi2Protocol.StateType.state,
  elementName: Meta3dUi2Protocol.ElementContributeType.elementName,
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

let _addReducers = (state: Meta3dUi2Protocol.StateType.state, elementName, reducers) => {
  reducers
  ->Meta3dCommonlib.NullableSt.map((. reducers): Meta3dUi2Protocol.StateType.state => {
    {
      ...state,
      reducers: state.reducers->Meta3dCommonlib.ArraySt.push((elementName, reducers)),
    }
  })
  ->Meta3dCommonlib.NullableSt.getWithDefault(state)
}

let registerElement = (
  state: Meta3dUi2Protocol.StateType.state,
  {
    elementName,
    execOrder,
    elementFunc,
    elementState,
    reducers,
  }: Meta3dUi2Protocol.ElementContributeType.elementContribute<
    Meta3dUi2Protocol.StateType.elementState,
  >,
) => {
  state
  ->_setElementFunc(elementName, elementFunc)
  ->_setElementState(elementName, elementState)
  ->_setElementExecOrder(elementName, execOrder)
  ->_addReducers(elementName, reducers)
  ->show(elementName)
  ->_markStateChange(elementName)
}

let registerSkin = (
  state: Meta3dUi2Protocol.StateType.state,
  skinContribute: Meta3dUi2Protocol.SkinContributeType.skinContribute<
    Meta3dUi2Protocol.StateType.skin,
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
  state: Meta3dUi2Protocol.StateType.state,
  uiControlContribute: Meta3dUi2Protocol.UIControlContributeType.uiControlContribute<
    Meta3dUi2Protocol.StateType.inputData,
    Meta3dUi2Protocol.StateType.outputData,
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

let getSkinExn = (
  state: Meta3dUi2Protocol.StateType.state,
  skinName,
): Meta3dUi2Protocol.SkinContributeType.skinContribute<Meta3dUi2Protocol.StateType.skin> => {
  state.skinContributeMap->Meta3dCommonlib.ImmutableHashMap.getExn(skinName)
}

let getUIControlExn = (state: Meta3dUi2Protocol.StateType.state, uiControlName) => {
  let {func}: Meta3dUi2Protocol.UIControlContributeType.uiControlContribute<
    Meta3dUi2Protocol.StateType.inputData,
    Meta3dUi2Protocol.StateType.outputData,
  > =
    state.uiControlContributeMap->Meta3dCommonlib.ImmutableHashMap.getExn(uiControlName)

  func
}

let isStateChange = (
  state: Meta3dUi2Protocol.StateType.state,
  elementName: Meta3dUi2Protocol.ElementContributeType.elementName,
) => {
  state.isStateChangeMap->Meta3dCommonlib.ImmutableHashMap.getExn(elementName)
}

let setStyle = (meta3dState, data, style) => {
  _invokeIMGUIRenderFunc(
    meta3dState,
    (imguiRendererState, imguiRendererService) =>
      imguiRendererService.setStyle(. style, imguiRendererState),
    data,
  )
}

let beginWindow = (meta3dState, data, label: Meta3dImguiRenderer2Protocol.ServiceType.label) => {
  _invokeIMGUIRenderFunc(
    meta3dState,
    (imguiRendererState, imguiRendererService) =>
      imguiRendererService.beginWindow(. label, imguiRendererState),
    data,
  )
}

let endWindow = (meta3dState, data) => {
  _invokeIMGUIRenderFunc(
    meta3dState,
    (imguiRendererState, imguiRendererService) =>
      imguiRendererService.endWindow(. imguiRendererState),
    data,
  )
}

let setNextWindowRect = (
  meta3dState,
  data,
  rect: Meta3dImguiRenderer2Protocol.ServiceType.rect,
) => {
  _invokeIMGUIRenderFunc(
    meta3dState,
    (imguiRendererState, imguiRendererService) =>
      imguiRendererService.setNextWindowRect(. rect, imguiRendererState),
    data,
  )
}

let button = (meta3dState, data, label: Meta3dImguiRenderer2Protocol.ServiceType.label, size) => {
  _invokeIMGUIRenderFuncWithParam(
    meta3dState,
    (imguiRendererState, imguiRendererService) =>
      imguiRendererService.button(. label, size, imguiRendererState),
    data,
  )
}

let setCursorPos = (meta3dState, data, pos) => {
  _invokeIMGUIRenderFunc(
    meta3dState,
    (imguiRendererState, imguiRendererService) =>
      imguiRendererService.setCursorPos(. pos, imguiRendererState),
    data,
  )
}

let init = (
  meta3dState,
  (api: Meta3dType.Index.api, imguiRendererExtensionName),
  isInitEvent,
  isDebug,
  canvas,
) => {
  let imguiRendererState = api.getExtensionState(. meta3dState, imguiRendererExtensionName)

  let imguiRendererService: Meta3dImguiRenderer2Protocol.ServiceType.service = api.getExtensionService(.
    meta3dState,
    imguiRendererExtensionName,
  )

  imguiRendererService.init(.
    imguiRendererState,
    isInitEvent,
    isDebug,
    canvas,
  )->Meta3dCommonlib.PromiseSt.map(imguiRendererState => {
    api.setExtensionState(. meta3dState, imguiRendererExtensionName, imguiRendererState)
  })
}

let clear = (meta3dState, data, clearColor) => {
  _invokeIMGUIRenderFunc(
    meta3dState,
    (imguiRendererState, imguiRendererService) =>
      imguiRendererService.clear(. imguiRendererState, clearColor),
    data,
  )
}
