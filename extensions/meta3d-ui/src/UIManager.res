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
  state: Meta3dUiProtocol.StateType.state,
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

let getIOData = ({ioData}: Meta3dUiProtocol.StateType.state) => {
  ioData
}

// let _setIOData = (state: Meta3dUiProtocol.StateType.state, ioData) => {
//   {
//     ...state,
//     // ioData: ioData->Some,
//     ioData: ioData
//   }
// }

let _prepare = (state: Meta3dUiProtocol.StateType.state, ioData) => {
  {
    ...state,
    ioData: ioData,
    // drawData: createEmptyDrawData(),
  }
}

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

let render = (
  api: Meta3dType.Index.api,
  meta3dState: Meta3dType.Index.state,
  (uiExtensionName, imguiRendererExtensionName),
  ioData,
) => {
  let state: Meta3dUiProtocol.StateType.state =
    api.getExtensionState(. meta3dState, uiExtensionName)->_prepare(ioData)

  let meta3dState = api.setExtensionState(. meta3dState, uiExtensionName, state)

  _exec(meta3dState, state)
  ->Meta3dCommonlib.PromiseSt.map(((meta3dState, needMarkStateNotChangeIds)) => {
    let state: Meta3dUiProtocol.StateType.state = api.getExtensionState(.
      meta3dState,
      uiExtensionName,
    )

    let state = state->_markAllStateNotChange(needMarkStateNotChangeIds)

    api.setExtensionState(. meta3dState, uiExtensionName, state)
  })
  ->Meta3dCommonlib.PromiseSt.map(meta3dState => {
    let imguiRendererState = api.getExtensionState(. meta3dState, imguiRendererExtensionName)

    let imguiRendererService: Meta3dImguiRendererProtocol.ServiceType.service = api.getExtensionService(.
      meta3dState,
      imguiRendererExtensionName,
    )

    let imguiRendererState = imguiRendererService.render(. imguiRendererState, meta3dState)

    api.setExtensionState(. meta3dState, imguiRendererExtensionName, imguiRendererState)
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

let _addReducers = (state: Meta3dUiProtocol.StateType.state, elementName, reducers) => {
  reducers
  ->Meta3dCommonlib.NullableSt.map((. reducers): Meta3dUiProtocol.StateType.state => {
    {
      ...state,
      reducers: state.reducers->Meta3dCommonlib.ArraySt.push((elementName, reducers)),
    }
  })
  ->Meta3dCommonlib.NullableSt.getWithDefault(state)
}

let registerElement = (
  state: Meta3dUiProtocol.StateType.state,
  {
    elementName,
    execOrder,
    elementFunc,
    elementState,
    reducers,
  }: Meta3dUiProtocol.ElementContributeType.elementContribute<
    Meta3dUiProtocol.StateType.elementState,
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

let getSkinExn = (
  state: Meta3dUiProtocol.StateType.state,
  skinName,
): Meta3dUiProtocol.SkinContributeType.skinContribute<Meta3dUiProtocol.StateType.skin> => {
  state.skinContributeMap->Meta3dCommonlib.ImmutableHashMap.getExn(skinName)
}

let getUIControlExn = (state: Meta3dUiProtocol.StateType.state, uiControlName) => {
  let {func}: Meta3dUiProtocol.UIControlContributeType.uiControlContribute<
    Meta3dUiProtocol.StateType.inputData,
    Meta3dUiProtocol.StateType.outputData,
  > =
    state.uiControlContributeMap->Meta3dCommonlib.ImmutableHashMap.getExn(uiControlName)

  func
}

let isStateChange = (
  state: Meta3dUiProtocol.StateType.state,
  elementName: Meta3dUiProtocol.ElementContributeType.elementName,
) => {
  state.isStateChangeMap->Meta3dCommonlib.ImmutableHashMap.getExn(elementName)
}

// let _clearButton = %raw(`
// function({x,y,width,height,text}) {
//   let elementName = "_" + ( x+y ).toString()

//   if(document.querySelector("#" + elementName) !== null){
// document.querySelector("#" + elementName).remove()
//   }
// }
// `)

// let _renderButton = %raw(`
// function( {x,y,width,height,text}) {
//   let button = document.createElement("button")

//   let elementName = "_" + ( x+y ).toString()

//   button.elementName = elementName

//   button.style.position = "absolute"
//   button.style.left = x + "px"
//   button.style.top = y + "px"
//   button.style.width = width + "px"
//   button.style.height = height + "px"
//   button.innerHTML =text

//   document.body.appendChild(
//     button
//   )
// }
// `)

// let drawButton = (
//   meta3dState,
//   (api: Meta3dType.Index.api, uiExtensionName),
//   data: Meta3dUiProtocol.ServiceType.drawButtonData,
// ) => {
//   let state: Meta3dUiProtocol.StateType.state = api.getExtensionState(.
//     meta3dState,
//     uiExtensionName,
//   )

//   _clearButton(data)
//   _renderButton(data)

//   let {isPointDown, pointPosition} = _getIODataExn(state)
//   let (pointPositionX, pointPositionY) = pointPosition

//   let {x, y, width, height, text} = data

//   let isClick =
//     isPointDown &&
//     pointPositionX >= x &&
//     pointPositionX <= x + width &&
//     pointPositionY >= y &&
//     pointPositionY <= y + height
//       ? {
//           true
//         }
//       : {
//           false
//         }

//   (meta3dState, isClick)
// }

let drawBox = (
  meta3dState,
  (api: Meta3dType.Index.api, imguiRendererExtensionName),
  rect: Meta3dImguiRendererProtocol.ServiceType.rect,
  backgroundColor: Meta3dImguiRendererProtocol.ServiceType.color,
) => {
  let imguiRendererState = api.getExtensionState(. meta3dState, imguiRendererExtensionName)

  let imguiRendererService: Meta3dImguiRendererProtocol.ServiceType.service = api.getExtensionService(.
    meta3dState,
    imguiRendererExtensionName,
  )

  let imguiRendererState = imguiRendererService.drawBox(. rect, backgroundColor, imguiRendererState)

  let meta3dState = api.setExtensionState(.
    meta3dState,
    imguiRendererExtensionName,
    imguiRendererState,
  )

  meta3dState
}

// let _clearText = %raw(`
// function({x,y}) {
//   let elementName = "_text" + ( x+y ).toString()

//   if(document.querySelector("#" + elementName) !== null){
// document.querySelector("#" + elementName).remove()
//   }
// }
// `)

// let _renderText = %raw(`
// function(text, {x,y,width,height}) {
//   let dom = document.createElement("span")

//   let elementName = "_text" + ( x+y ).toString()

//   dom.elementName = elementName

//   dom.style.position = "absolute"
//   dom.style.left = x + "px"
//   dom.style.top = y + "px"
//   dom.style.width = width + "px"
//   dom.style.height = height + "px"
//   dom.innerHTML = text

//   document.body.appendChild(
//     dom
//   )
// }
// `)

// let drawText = (
//   meta3dState,
//   (api: Meta3dType.Index.api, uiExtensionName),
//   rect: Meta3dUiProtocol.ServiceType.rect,
//   text: Meta3dUiProtocol.ServiceType.text,
// ) => {
//   let state: Meta3dUiProtocol.StateType.state = api.getExtensionState(.
//     meta3dState,
//     uiExtensionName,
//   )

//   _clearText(rect)
//   _renderText(text, rect)

//   meta3dState
// }

let init = (
  meta3dState,
  (api: Meta3dType.Index.api, imguiRendererExtensionName),
  isDebug,
  canvas,
) => {
  let imguiRendererState = api.getExtensionState(. meta3dState, imguiRendererExtensionName)

  let imguiRendererService: Meta3dImguiRendererProtocol.ServiceType.service = api.getExtensionService(.
    meta3dState,
    imguiRendererExtensionName,
  )

  let imguiRendererState = imguiRendererService.init(.
    imguiRendererState,
    meta3dState,
    isDebug,
    canvas,
  )

  let meta3dState = api.setExtensionState(.
    meta3dState,
    imguiRendererExtensionName,
    imguiRendererState,
  )

  meta3dState
}

let clear = (meta3dState, (api: Meta3dType.Index.api, imguiRendererExtensionName), clearColor) => {
  let imguiRendererState = api.getExtensionState(. meta3dState, imguiRendererExtensionName)

  let imguiRendererService: Meta3dImguiRendererProtocol.ServiceType.service = api.getExtensionService(.
    meta3dState,
    imguiRendererExtensionName,
  )

  imguiRendererService.clear(. imguiRendererState, meta3dState, clearColor)

  meta3dState
}
