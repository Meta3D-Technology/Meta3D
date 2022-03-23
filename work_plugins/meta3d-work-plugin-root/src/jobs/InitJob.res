let execFunc: Type.execFunc = (state, {getStatesFunc}) => {
  let {mostService} = state->getStatesFunc->Obj.magic->Utils.getState

  mostService.callFunc(() => {
    Js.log("init root job exec")

    state
  })
}
