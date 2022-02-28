let hide = (state: Meta3dUiProtocol.StateType.state, id: Meta3dUiProtocol.UIType.id) => {
  {
    ...state,
    isShowMap: state.isShowMap->Meta3dCommonlib.ImmutableHashMap.set(id, false),
  }
}

let show = (state: Meta3dUiProtocol.StateType.state, id: Meta3dUiProtocol.UIType.id) => {
  {
    ...state,
    isShowMap: state.isShowMap->Meta3dCommonlib.ImmutableHashMap.set(id, true),
  }
}

let _markStateChange = (
  state: Meta3dUiProtocol.StateType.state,
  id: Meta3dUiProtocol.UIType.id,
) => {
  {
    ...state,
    isStateChangeMap: state.isStateChangeMap->Meta3dCommonlib.ImmutableHashMap.set(id, true),
  }
}

let _markStateNotChange = (
  state: Meta3dUiProtocol.StateType.state,
  id: Meta3dUiProtocol.UIType.id,
) => {
  {
    ...state,
    isStateChangeMap: state.isStateChangeMap->Meta3dCommonlib.ImmutableHashMap.set(id, false),
  }
}

let _markAllStateNotChange = (
  state: Meta3dUiProtocol.StateType.state,
  needMarkStateNotChangeIds,
) => {
  needMarkStateNotChangeIds->Meta3dCommonlib.ArraySt.reduceOneParam((. state, id) => {
    _markStateNotChange(state, id)
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
  id: Meta3dUiProtocol.UIType.id,
) => {
  execStateMap->Meta3dCommonlib.ImmutableHashMap.getExn(id)
}

let getElementState = (
  {execStateMap}: Meta3dUiProtocol.StateType.state,
  id: Meta3dUiProtocol.UIType.id,
) => {
  execStateMap->Meta3dCommonlib.ImmutableHashMap.getNullable(id)
}

let _setElementState = (
  state: Meta3dUiProtocol.StateType.state,
  id: Meta3dUiProtocol.UIType.id,
  elementState: Meta3dUiProtocol.IElement.elementState,
) => {
  {
    ...state,
    execStateMap: state.execStateMap->Meta3dCommonlib.ImmutableHashMap.set(id, elementState),
  }
}

let dispatch = (
  state: Meta3dUiProtocol.StateType.state,
  action: Meta3dUiProtocol.IElement.action,
) => {
  state.reducers->Meta3dCommonlib.ArraySt.reduceOneParam((. state, (id, reducerFunc)) => {
    let oldElementState = _getElementStateExn(state, id)

    let newElementState = reducerFunc(oldElementState, action)

    oldElementState !== newElementState
      ? {
          state->_markStateChange(id)->_setElementState(id, newElementState)
        }
      : {
          state->_markStateNotChange(id)
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
    api.getExtensionStateExn(. meta3dState, uiExtensionName)->_setIOData(ioData),
  )

  let state: Meta3dUiProtocol.StateType.state = api.getExtensionStateExn(.
    meta3dState,
    uiExtensionName,
  )

  let {isShowMap, isStateChangeMap, execFuncMap, execStateMap} = state

  isShowMap
  ->Meta3dCommonlib.ImmutableHashMap.entries
  ->Meta3dCommonlib.ArraySt.traverseReducePromiseM(
    (. (meta3dState, needMarkStateNotChangeIds), (id, isShow)) => {
      // isShow && _getStateChangeExn(state, id)
      isShow
        ? {
            let elementFunc = execFuncMap->Meta3dCommonlib.ImmutableHashMap.getExn(id)

            /* !
              TODO should judge is state change in elementFunc:
             if state not change, not update geometry buffer, but should render if isShow!!! 
 */
            elementFunc(meta3dState, id)->Meta3dCommonlib.PromiseSt.map(meta3dState => {
              (meta3dState, needMarkStateNotChangeIds->Meta3dCommonlib.ArraySt.push(id))
            })
          }
        : (meta3dState, needMarkStateNotChangeIds)->Js.Promise.resolve
    },
    (meta3dState, []),
  )
  ->Meta3dCommonlib.PromiseSt.map(((meta3dState, needMarkStateNotChangeIds)) => {
    let state: Meta3dUiProtocol.StateType.state = api.getExtensionStateExn(.
      meta3dState,
      uiExtensionName,
    )

    let state = state->_markAllStateNotChange(needMarkStateNotChangeIds)

    api.setExtensionState(. meta3dState, uiExtensionName, state)
  })
}

let _setElementFunc = (
  state: Meta3dUiProtocol.StateType.state,
  id: Meta3dUiProtocol.UIType.id,
  elementFunc: Meta3dUiProtocol.IElement.elementFunc,
) => {
  {
    ...state,
    execFuncMap: state.execFuncMap->Meta3dCommonlib.ImmutableHashMap.set(id, elementFunc),
  }
}

let registerElement = (
  state: Meta3dUiProtocol.StateType.state,
  {id, elementFunc, elementState}: Meta3dUiProtocol.IElement.elementContribute<
    Meta3dUiProtocol.IElement.elementState,
  >,
) => {
  state
  ->_setElementFunc(id, elementFunc)
  ->_setElementState(id, elementState)
  ->show(id)
  ->_markStateChange(id)
}

let registerSkin = (
  state: Meta3dUiProtocol.StateType.state,
  skinContribute: Meta3dUiProtocol.ISkin.skinContribute<Meta3dUiProtocol.ISkin.buttonStyle>,
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
  customControlContribute: Meta3dUiProtocol.ICustomControl.customControlContribute<
    Meta3dUiProtocol.ICustomControl.inputData,
    Meta3dUiProtocol.ICustomControl.outputData,
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
): Meta3dUiProtocol.ISkin.skinContribute<Meta3dUiProtocol.ISkin.buttonStyle> => {
  state.skinContributeMap->Meta3dCommonlib.ImmutableHashMap.getExn(skinName)
}

let getCustomControlExn = (state: Meta3dUiProtocol.StateType.state, customControlName) => {
  let {func}: Meta3dUiProtocol.ICustomControl.customControlContribute<
    Meta3dUiProtocol.ICustomControl.inputData,
    Meta3dUiProtocol.ICustomControl.outputData,
  > =
    state.customControlContributeMap->Meta3dCommonlib.ImmutableHashMap.getExn(customControlName)

  func
}

let isStateChange = (state: Meta3dUiProtocol.StateType.state, id: Meta3dUiProtocol.UIType.id) => {
  state.isStateChangeMap->Meta3dCommonlib.ImmutableHashMap.getExn(id)
}

// let _clearButton = %raw(`
// function({x,y,width,height,text}) {
//   let id = "_" + ( x+y ).toString()

//   if(document.querySelector("#" + id) !== null){
// document.querySelector("#" + id).remove()
//   }
// }
// `)

// let _renderButton = %raw(`
// function( {x,y,width,height,text}) {
//   let button = document.createElement("button")

//   let id = "_" + ( x+y ).toString()

//   button.id = id

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
//   let state: Meta3dUiProtocol.StateType.state = api.getExtensionStateExn(.
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
  let id = "_box" + ( x+y ).toString()

  if(document.querySelector("#" + id) !== null){
document.querySelector("#" + id).remove()
  }
}
`)

let _renderBox = %raw(`
function(backgroundColor, {x,y,width,height}) {
  let dom = document.createElement("div")

  let id = "_box" + ( x+y ).toString()

  dom.id = id

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
  let state: Meta3dUiProtocol.StateType.state = api.getExtensionStateExn(.
    meta3dState,
    uiExtensionName,
  )

  _clearBox(rect)
  _renderBox(backgroundColor, rect)

  meta3dState
}

let _clearText = %raw(`
function({x,y}) {
  let id = "_text" + ( x+y ).toString()

  if(document.querySelector("#" + id) !== null){
document.querySelector("#" + id).remove()
  }
}
`)

let _renderText = %raw(`
function(text, {x,y,width,height}) {
  let dom = document.createElement("span")

  let id = "_text" + ( x+y ).toString()

  dom.id = id

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
  let state: Meta3dUiProtocol.StateType.state = api.getExtensionStateExn(.
    meta3dState,
    uiExtensionName,
  )

  _clearText(rect)
  _renderText(text, rect)

  meta3dState
}
