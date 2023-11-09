let execFunc: Meta3dEngineCoreProtocol.StateType.execFunc = (meta3dState, {getStatesFunc}) => {
  let {mostService} = getStatesFunc(. meta3dState)->Obj.magic->Utils.getState

  mostService.callFunc(. () => {
    Js.log("init root job exec")

    meta3dState
  })
}
