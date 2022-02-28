type uiExtensionName = Meta3dType.Index.extensionName

type color = string

type text = string

type rect = {
  x: int,
  y: int,
  width: int,
  height: int,
}

type service = {
  registerElement: 'elementState. (
    StateType.state,
    IElement.elementContribute<'elementState>,
  ) => StateType.state,
  registerSkin: (StateType.state, ISkin.skinContribute<StateType.buttonStyle>) => StateType.state,
  registerCustomControl: (
    StateType.state,
    ICustomControl.customControlContribute<StateType.inputData, StateType.outputData>,
  ) => StateType.state,
  render: (
    Meta3dType.Index.state,
    uiExtensionName,
    StateType.ioData,
  ) => Js.Promise.t<Meta3dType.Index.state>,
  show: (StateType.state, IElement.elementName) => StateType.state,
  hide: (StateType.state, IElement.elementName) => StateType.state,
  isStateChange: (StateType.state, IElement.elementName) => bool,
  getElementState: 'elementState. (
    StateType.state,
    IElement.elementName,
  ) => Js.Nullable.t<'elementState>,
  combineReducers: 'elementState 'action. (
    StateType.state,
    IElement.reducerData<'elementState, 'action>,
  ) => StateType.state,
  dispatch: 'action. (StateType.state, StateType.action) => StateType.state,
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
