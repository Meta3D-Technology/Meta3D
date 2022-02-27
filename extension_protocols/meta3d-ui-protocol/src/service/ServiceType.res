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
  show: (StateType.state, UIType.id) => StateType.state,
  hide: (StateType.state, UIType.id) => StateType.state,
  getExecState: 'execState. (StateType.state, UIType.id) => Js.Nullable.t<'execState>,
  combineReducers: 'execState 'action. (
    StateType.state,
    UIType.reducerData<'execState, 'action>,
  ) => StateType.state,
  dispatch: 'action. (StateType.state, UIType.action) => StateType.state,
  drawButton: (
    Meta3dType.Index.state,
    drawButtonData,
    Meta3dType.Index.state => Js.Promise.t<Meta3dType.Index.state>,
  ) => Js.Promise.t<Meta3dType.Index.state>,
}
