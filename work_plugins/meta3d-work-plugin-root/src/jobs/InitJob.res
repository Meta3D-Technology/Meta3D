let execFunc: Type.execFunc = (engineCoreState, {getStatesFunc}) => {
  let {mostService} = engineCoreState->getStatesFunc->Obj.magic->Utils.getState

  mostService.callFunc(() => {
    Js.log("init root job exec")

    engineCoreState
  })
}
