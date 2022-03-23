let execFunc: Type.execFunc = (engineCoreState, {getStatesFunc}) => {
  let {mostService} = engineCoreState->getStatesFunc->Obj.magic->Utils.getState

  mostService.callFunc(() => {
    Js.log("update root job exec")

    engineCoreState
  })
}
