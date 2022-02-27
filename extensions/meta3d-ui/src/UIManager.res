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

let _getExecStateExn = (
  {execStateMap}: Meta3dUiProtocol.StateType.state,
  id: Meta3dUiProtocol.UIType.id,
) => {
  execStateMap->Meta3dCommonlib.ImmutableHashMap.getExn(id)
}

let getExecState = (
  {execStateMap}: Meta3dUiProtocol.StateType.state,
  id: Meta3dUiProtocol.UIType.id,
) => {
  execStateMap->Meta3dCommonlib.ImmutableHashMap.getNullable(id)
}

let _setExecState = (
  state: Meta3dUiProtocol.StateType.state,
  id: Meta3dUiProtocol.UIType.id,
  execState: Meta3dUiProtocol.UIType.execState,
) => {
  {
    ...state,
    execStateMap: state.execStateMap->Meta3dCommonlib.ImmutableHashMap.set(id, execState),
  }
}

let dispatch = (
  state: Meta3dUiProtocol.StateType.state,
  action: Meta3dUiProtocol.UIType.action,
) => {
  state.reducers->Meta3dCommonlib.ArraySt.reduceOneParam((. state, (id, reducerFunc)) => {
    let oldExecState = _getExecStateExn(state, id)

    let newExecState = reducerFunc(oldExecState, action)

    oldExecState !== newExecState
      ? {
          state->_markStateChange(id)->_setExecState(id, newExecState)
        }
      : {
          state->_markStateNotChange(id)
        }
  }, state)
}

let _getIODataExn = ({ioData}: Meta3dUiProtocol.StateType.state) => {
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
            let execFunc = execFuncMap->Meta3dCommonlib.ImmutableHashMap.getExn(id)

            /* !
              TODO should judge is state change in execFunc:
             if state not change, not update geometry buffer, but should render if isShow!!! 
 */
            execFunc(meta3dState, id)->Meta3dCommonlib.PromiseSt.map(meta3dState => {
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

let _setExecFunc = (
  state: Meta3dUiProtocol.StateType.state,
  id: Meta3dUiProtocol.UIType.id,
  execFunc: Meta3dUiProtocol.UIType.registeredExecFunc,
) => {
  {
    ...state,
    execFuncMap: state.execFuncMap->Meta3dCommonlib.ImmutableHashMap.set(id, execFunc),
  }
}

let register = (
  state: Meta3dUiProtocol.StateType.state,
  {id, execFunc, execState}: Meta3dUiProtocol.UIType.registerData<
    Meta3dUiProtocol.UIType.execState,
  >,
) => {
  state->_setExecFunc(id, execFunc)->_setExecState(id, execState)->show(id)->_markStateChange(id)
}

let isStateChange = (state: Meta3dUiProtocol.StateType.state, id: Meta3dUiProtocol.UIType.id) => {
  state.isStateChangeMap->Meta3dCommonlib.ImmutableHashMap.getExn(id)
}

let _clearButton = %raw(`
function({x,y,width,height,text}) {
  let id = "_" + ( x+y ).toString()

  if(document.querySelector("#" + id) !== null){
document.querySelector("#" + id).remove()
  }
}
`)

let _renderButton = %raw(`
function( {x,y,width,height,text}) {
  let button = document.createElement("button")

  let id = "_" + ( x+y ).toString()

  button.id = id

  button.style.position = "absolute"
  button.style.left = x + "px"
  button.style.top = y + "px"
  button.style.width = width + "px"
  button.style.height = height + "px"
  button.innerHTML =text

  document.body.appendChild(
    button
  )
}
`)

let drawButton = (
  meta3dState,
  (api: Meta3dType.Index.api, uiExtensionName),
  data: Meta3dUiProtocol.ServiceType.drawButtonData,
) => {
  let state: Meta3dUiProtocol.StateType.state = api.getExtensionStateExn(.
    meta3dState,
    uiExtensionName,
  )

  _clearButton(data)
  _renderButton(data)

  let {isPointDown, pointPosition} = _getIODataExn(state)
  let (pointPositionX, pointPositionY) = pointPosition

  let {x, y, width, height, text} = data

  let isClick =
    isPointDown &&
    pointPositionX >= x &&
    pointPositionX <= x + width &&
    pointPositionY >= y &&
    pointPositionY <= y + height
      ? {
          true
        }
      : {
          false
        }

  (meta3dState, isClick)
}
