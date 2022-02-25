type uiExtensionName = Meta3dType.Index.extensionName

type drawButtonData = {
  x: int,
  y: int,
  width: int,
  height: int,
  text: string,
}

type service = {
  register: 'eventData 'execState. (
    StateType.state,
    UIType.registerData<'eventData, 'execState>,
  ) => StateType.state,
  render: 'renderData. (
    Meta3dType.Index.state,
    uiExtensionName,
    'renderData,
  ) => Js.Promise.t<Meta3dType.Index.state>,
  markRender: (StateType.state, UIType.id) => StateType.state,
  markNotRender: (StateType.state, UIType.id) => StateType.state,
  drawButton: (
    Meta3dType.Index.state,
    drawButtonData,
    Meta3dType.Index.state => Js.Promise.t<Meta3dType.Index.state>,
  ) => Js.Promise.t<Meta3dType.Index.state>,
}
