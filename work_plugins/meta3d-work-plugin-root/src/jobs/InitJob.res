let exec: Type.elementFunc = states => {
  let {mostService} = Utils.getState(states)

  mostService.callFunc(() => {
    Js.log("init root job exec")

    states
  })
}
