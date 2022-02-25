let markNotRender = (state: Meta3dUiProtocol.StateType.state, id: Meta3dUiProtocol.UIType.id) => {
  {
    ...state,
    isRenderMap: state.isRenderMap->Meta3dCommonlib.ImmutableHashMap.set(id, false),
  }
}

let markRender = (state: Meta3dUiProtocol.StateType.state, id: Meta3dUiProtocol.UIType.id) => {
  {
    ...state,
    isRenderMap: state.isRenderMap->Meta3dCommonlib.ImmutableHashMap.set(id, true),
  }
}

let _markAllNotRender = (state: Meta3dUiProtocol.StateType.state) => {
  let {isRenderMap} = state

  isRenderMap
  ->Meta3dCommonlib.ImmutableHashMap.entries
  ->Meta3dCommonlib.ArraySt.reduceOneParam((. state, (id, isRender)) => {
    isRender
      ? {
          markNotRender(state, id)
        }
      : state
  }, state)
}

let render = (api: Meta3dType.Index.api, meta3dState: Meta3dType.Index.state, uiExtensionName) => {
  // renderData: Meta3dUiProtocol.UIType.renderData,

  let state: Meta3dUiProtocol.StateType.state = api.getExtensionStateExn(.
    meta3dState,
    uiExtensionName,
  )
  let {isRenderMap, execFuncMap, execStateMap} = state

  isRenderMap
  ->Meta3dCommonlib.ImmutableHashMap.entries
  ->Meta3dCommonlib.ArraySt.traverseReducePromiseM((. meta3dState, (id, isRender)) => {
    isRender
      ? {
          let execFunc = execFuncMap->Meta3dCommonlib.ImmutableHashMap.getExn(id)

          // execFunc(meta3dState, api, uiExtensionName, renderData)
          execFunc(meta3dState, uiExtensionName, renderData)
        }
      : meta3dState->Js.Promise.resolve
  }, meta3dState)
  ->Meta3dCommonlib.PromiseSt.map(meta3dState => {
    let state: Meta3dUiProtocol.StateType.state = api.getExtensionStateExn(.
      meta3dState,
      uiExtensionName,
    )

    let state = state->_markAllNotRender

    api.setExtensionState(. meta3dState, uiExtensionName, state)
  })
}

let _setExecFunc = (
  state: Meta3dUiProtocol.StateType.state,
  id: Meta3dUiProtocol.UIType.id,
  execFunc: Meta3dUiProtocol.UIType.execFunc<Meta3dUiProtocol.UIType.renderData>,
) => {
  {
    ...state,
    execFuncMap: state.execFuncMap->Meta3dCommonlib.ImmutableHashMap.set(id, execFunc),
  }
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

let register = (
  state: Meta3dUiProtocol.StateType.state,
  {id, execFunc, execState}: Meta3dUiProtocol.UIType.registerData<
    Meta3dUiProtocol.UIType.renderData,
    Meta3dUiProtocol.UIType.execState,
  >,
) => {
  state->_setExecFunc(id, execFunc)->_setExecState(id, execState)->markRender(id)
}

let drawButton = %raw(`
function(meta3dState, {x,y,width,height,text},onClickFunc) {
  /////*! only read state, not write it */
  /*! get state from meta3dState */

  let id = "_" + ( x+y ).toString()

  if(document.querySelector("#" + id) !== null){
document.querySelector("#" + id).remove()
  }


let button = document.createElement("button")

button.style.position = "absolute"
button.style.left = x + "px"
button.style.top = y + "px"
button.style.width = width + "px"
button.style.height = height + "px"
button.innerHTML =text

// TODO fix onclick, should return meta3dState
button.onclick = (e) => onClickFunc(meta3dState)
button.id = id

  document.body.appendChild(
    button
  )

  return new Promise((resolve) =>{
    resolve(meta3dState)
  }) 
}
`)
