let execFunc: Meta3dEngineCoreGameviewProtocol.StateType.execFunc = (meta3dState, {getStatesFunc}) => {
  let {mostService} = meta3dState->getStatesFunc->Obj.magic->Utils.getState

  mostService.callFunc(() => {
    Js.log("init root job exec")

    meta3dState
  })
}
