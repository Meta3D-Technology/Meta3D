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

let combineReducers = (state: Meta3dUiProtocol.StateType.state, reducerData) => {
  {
    ...state,
    reducers: state.reducers->Meta3dCommonlib.ArraySt.push(reducerData),
  }
}

let _getElementStateExn = (
  {execStateMap}: Meta3dUiProtocol.StateType.state,
  elementName: Meta3dUiProtocol.ElementContributeType.elementName,
) => {
  execStateMap->Meta3dCommonlib.ImmutableHashMap.getExn(elementName)
}

let getElementState = (
  {execStateMap}: Meta3dUiProtocol.StateType.state,
  elementName: Meta3dUiProtocol.ElementContributeType.elementName,
) => {
  execStateMap->Meta3dCommonlib.ImmutableHashMap.getNullable(elementName)
}

let _setElementState = (
  state: Meta3dUiProtocol.StateType.state,
  elementName: Meta3dUiProtocol.ElementContributeType.elementName,
  elementState: Meta3dUiProtocol.StateType.elementState,
) => {
  {
    ...state,
    execStateMap: state.execStateMap->Meta3dCommonlib.ImmutableHashMap.set(
      elementName,
      elementState,
    ),
  }
}

let dispatch = (
  state: Meta3dUiProtocol.StateType.state,
  action: Meta3dUiProtocol.StateType.action,
) => {
  state.reducers->Meta3dCommonlib.ArraySt.reduceOneParam((. state, (elementName, reducerFunc)) => {
    let oldElementState = _getElementStateExn(state, elementName)

    let newElementState = reducerFunc(oldElementState, action)

    oldElementState !== newElementState
      ? {
          state->_markStateChange(elementName)->_setElementState(elementName, newElementState)
        }
      : {
          state->_markStateNotChange(elementName)
        }
  }, state)
}

let getIODataExn = ({ioData}: Meta3dUiProtocol.StateType.state) => {
  ioData->Meta3dCommonlib.OptionSt.getExn
}

let _setIOData = (state: Meta3dUiProtocol.StateType.state, ioData) => {
  {
    ...state,
    ioData: ioData->Some,
  }
}

let render = (
  api: Meta3dType.Index.api,
  meta3dState: Meta3dType.Index.state,
  uiExtensionName,
  ioData,
) => {
  let meta3dState = api.setExtensionState(.
    meta3dState,
    uiExtensionName,
    api.getExtensionState(. meta3dState, uiExtensionName)->_setIOData(ioData),
  )

  let state: Meta3dUiProtocol.StateType.state = api.getExtensionState(.
    meta3dState,
    uiExtensionName,
  )

  let {isShowMap, isStateChangeMap, execFuncMap, execStateMap} = state

  isShowMap
  ->Meta3dCommonlib.ImmutableHashMap.entries
  ->Meta3dCommonlib.ArraySt.traverseReducePromiseM(
    (. (meta3dState, needMarkStateNotChangeIds), (elementName, isShow)) => {
      // isShow && _getStateChangeExn(state, elementName)
      isShow
        ? {
            let elementFunc = execFuncMap->Meta3dCommonlib.ImmutableHashMap.getExn(elementName)

            /* !
              TODO should judge is state change in elementFunc:
             if state not change, not update geometry buffer, but should render if isShow!!! 
 */
            elementFunc(meta3dState, elementName)->Meta3dCommonlib.PromiseSt.map(meta3dState => {
              (meta3dState, needMarkStateNotChangeIds->Meta3dCommonlib.ArraySt.push(elementName))
            })
          }
        : (meta3dState, needMarkStateNotChangeIds)->Js.Promise.resolve
    },
    (meta3dState, []),
  )
  ->Meta3dCommonlib.PromiseSt.map(((meta3dState, needMarkStateNotChangeIds)) => {
    let state: Meta3dUiProtocol.StateType.state = api.getExtensionState(.
      meta3dState,
      uiExtensionName,
    )

    let state = state->_markAllStateNotChange(needMarkStateNotChangeIds)

    api.setExtensionState(. meta3dState, uiExtensionName, state)
  })
}

let _setElementFunc = (
  state: Meta3dUiProtocol.StateType.state,
  elementName: Meta3dUiProtocol.ElementContributeType.elementName,
  elementFunc: Meta3dUiProtocol.ElementContributeType.elementFunc,
) => {
  {
    ...state,
    execFuncMap: state.execFuncMap->Meta3dCommonlib.ImmutableHashMap.set(elementName, elementFunc),
  }
}

let registerElement = (
  state: Meta3dUiProtocol.StateType.state,
  {elementName, elementFunc, elementState}: Meta3dUiProtocol.ElementContributeType.elementContribute<
    Meta3dUiProtocol.StateType.elementState,
  >,
) => {
  state
  ->_setElementFunc(elementName, elementFunc)
  ->_setElementState(elementName, elementState)
  ->show(elementName)
  ->_markStateChange(elementName)
}

let registerSkin = (
  state: Meta3dUiProtocol.StateType.state,
  skinContribute: Meta3dUiProtocol.SkinContributeType.skinContribute<Meta3dUiProtocol.StateType.buttonStyle>,
) => {
  {
    ...state,
    skinContributeMap: state.skinContributeMap->Meta3dCommonlib.ImmutableHashMap.set(
      skinContribute.skinName,
      skinContribute,
    ),
  }
}

let registerCustomControl = (
  state: Meta3dUiProtocol.StateType.state,
  customControlContribute: Meta3dUiProtocol.CustomControlContributeType.customControlContribute<
    Meta3dUiProtocol.StateType.inputData,
    Meta3dUiProtocol.StateType.outputData,
  >,
) => {
  {
    ...state,
    customControlContributeMap: state.customControlContributeMap->Meta3dCommonlib.ImmutableHashMap.set(
      customControlContribute.customControlName,
      customControlContribute,
    ),
  }
}

let getSkinExn = (
  state: Meta3dUiProtocol.StateType.state,
  skinName,
): Meta3dUiProtocol.SkinContributeType.skinContribute<Meta3dUiProtocol.StateType.buttonStyle> => {
  state.skinContributeMap->Meta3dCommonlib.ImmutableHashMap.getExn(skinName)
}

let getCustomControlExn = (state: Meta3dUiProtocol.StateType.state, customControlName) => {
  let {func}: Meta3dUiProtocol.CustomControlContributeType.customControlContribute<
    Meta3dUiProtocol.StateType.inputData,
    Meta3dUiProtocol.StateType.outputData,
  > =
    state.customControlContributeMap->Meta3dCommonlib.ImmutableHashMap.getExn(customControlName)

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

let _clearBox = %raw(`
function({x,y}) {
  let elementName = "_box" + ( x+y ).toString()

  if(document.querySelector("#" + elementName) !== null){
document.querySelector("#" + elementName).remove()
  }
}
`)

let _renderBox = %raw(`
function(backgroundColor, {x,y,width,height}) {
  let dom = document.createElement("div")

  let elementName = "_box" + ( x+y ).toString()

  dom.elementName = elementName

  dom.style.position = "absolute"
  dom.style.left = x + "px"
  dom.style.top = y + "px"
  dom.style.width = width + "px"
  dom.style.height = height + "px"
  dom.style["background-color"] = backgroundColor

  document.body.appendChild(
    dom
  )
}
`)

let drawBox = (
  meta3dState,
  (api: Meta3dType.Index.api, uiExtensionName),
  rect: Meta3dUiProtocol.ServiceType.rect,
  backgroundColor: Meta3dUiProtocol.ServiceType.color,
) => {
  let state: Meta3dUiProtocol.StateType.state = api.getExtensionState(.
    meta3dState,
    uiExtensionName,
  )

  _clearBox(rect)
  _renderBox(backgroundColor, rect)

  meta3dState
}

let _clearText = %raw(`
function({x,y}) {
  let elementName = "_text" + ( x+y ).toString()

  if(document.querySelector("#" + elementName) !== null){
document.querySelector("#" + elementName).remove()
  }
}
`)

let _renderText = %raw(`
function(text, {x,y,width,height}) {
  let dom = document.createElement("span")

  let elementName = "_text" + ( x+y ).toString()

  dom.elementName = elementName

  dom.style.position = "absolute"
  dom.style.left = x + "px"
  dom.style.top = y + "px"
  dom.style.width = width + "px"
  dom.style.height = height + "px"
  dom.innerHTML = text

  document.body.appendChild(
    dom
  )
}
`)

let drawText = (
  meta3dState,
  (api: Meta3dType.Index.api, uiExtensionName),
  rect: Meta3dUiProtocol.ServiceType.rect,
  text: Meta3dUiProtocol.ServiceType.text,
) => {
  let state: Meta3dUiProtocol.StateType.state = api.getExtensionState(.
    meta3dState,
    uiExtensionName,
  )

  _clearText(rect)
  _renderText(text, rect)

  meta3dState
}
