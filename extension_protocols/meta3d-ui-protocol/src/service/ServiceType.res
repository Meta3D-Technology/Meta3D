type uiExtensionName = Meta3dType.Index.extensionName

// type drawButtonData = {
//   x: int,
//   y: int,
//   width: int,
//   height: int,
//   text: string,
// }

type color = string

type text = string

type rect = {
  x: int,
  y: int,
  width: int,
  height: int,
}

type service = {
  register: 'execState. (StateType.state, UIType.registerData<'execState>) => StateType.state,
  registerSkin: (StateType.state, ISkin.skinContribute<ISkin.buttonStyle>) => StateType.state,
  registerCustomControl: (
    StateType.state,
    ICustomControl.customControlContribute<ICustomControl.inputData, ICustomControl.outputData>,
  ) => StateType.state,
  render: (
    Meta3dType.Index.state,
    uiExtensionName,
    StateType.ioData,
  ) => Js.Promise.t<Meta3dType.Index.state>,
  show: (StateType.state, UIType.id) => StateType.state,
  hide: (StateType.state, UIType.id) => StateType.state,
  isStateChange: (StateType.state, UIType.id) => bool,
  getExecState: 'execState. (StateType.state, UIType.id) => Js.Nullable.t<'execState>,
  combineReducers: 'execState 'action. (
    StateType.state,
    UIType.reducerData<'execState, 'action>,
  ) => StateType.state,
  dispatch: 'action. (StateType.state, UIType.action) => StateType.state,
  getIOData: StateType.state => StateType.ioData,
  getSkin: 'buttonStyle. (StateType.state, ISkin.skinName) => ISkin.skinContribute<'buttonStyle>,
  getCustomControl: 'inputData 'outputData. (
    StateType.state,
    ICustomControl.customControlName,
  ) => ICustomControl.customControlFunc<'inputData, 'outputData>,
  drawBox: (
    Meta3dType.Index.state,
    (Meta3dType.Index.api, Meta3dType.Index.extensionName),
    rect,
    color,
  ) => Meta3dType.Index.state,
  drawText: (
    Meta3dType.Index.state,
    (Meta3dType.Index.api, Meta3dType.Index.extensionName),
    rect,
    text,
  ) => Meta3dType.Index.state,
}
