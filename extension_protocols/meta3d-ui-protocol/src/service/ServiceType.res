type uiExtensionName = Meta3dType.Index.extensionName

type drawButtonData = {
  x: int,
  y: int,
  width: int,
  height: int,
  text: string,
}

type service = {
  register: 'execState. (StateType.state, UIType.registerData<'execState>) => StateType.state,
  render: (Meta3dType.Index.state, uiExtensionName) => Js.Promise.t<Meta3dType.Index.state>,
  markRender: (StateType.state, UIType.id) => StateType.state,
  markNotRender: (StateType.state, UIType.id) => StateType.state,
  getExecState: 'execState (StateType.state, UIType.id) => 'execState -> Js.Nullable.return, 
  drawButton: (
    Meta3dType.Index.state,
    drawButtonData,
    Meta3dType.Index.state => Js.Promise.t<Meta3dType.Index.state>,
  ) => Js.Promise.t<Meta3dType.Index.state>,
}
