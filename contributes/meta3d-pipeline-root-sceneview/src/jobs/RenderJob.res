let execFunc: Meta3dEngineCoreSceneviewProtocol.StateType.execFunc = (meta3dState, {getStatesFunc}) => {
  let {mostService} = meta3dState->getStatesFunc->Obj.magic->Utils.getState

  mostService.callFunc(() => {
    Js.log("render root job exec")

    meta3dState
  })
}
