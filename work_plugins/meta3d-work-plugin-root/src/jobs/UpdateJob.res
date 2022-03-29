let execFunc: Meta3dEngineCoreProtocol.StateType.execFunc = (engineCoreState, {getStatesFunc}) => {
  let {mostService} = engineCoreState->getStatesFunc->Obj.magic->Utils.getState

  mostService.callFunc(() => {
    Js.log("update root job exec")

    engineCoreState
  })
}
