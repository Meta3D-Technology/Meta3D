type uiExtensionName = Meta3dType.Index.extensionName

type imguiRendererExtensionName = Meta3dType.Index.extensionName

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
    ElementContributeType.elementContribute<'elementState>,
  ) => StateType.state,
  registerSkin: (
    StateType.state,
    SkinContributeType.skinContribute<StateType.buttonStyle>,
  ) => StateType.state,
  registerCustomControl: (
    StateType.state,
    CustomControlContributeType.customControlContribute<StateType.inputData, StateType.outputData>,
  ) => StateType.state,
  render: (
    Meta3dType.Index.state,
    (uiExtensionName, imguiRendererExtensionName),
    StateType.ioData,
  ) => Js.Promise.t<Meta3dType.Index.state>,
  show: (StateType.state, ElementContributeType.elementName) => StateType.state,
  hide: (StateType.state, ElementContributeType.elementName) => StateType.state,
  isStateChange: (StateType.state, ElementContributeType.elementName) => bool,
  getElementState: 'elementState. (
    StateType.state,
    ElementContributeType.elementName,
  ) => Js.Nullable.t<'elementState>,
  combineReducers: 'elementState 'action. (
    StateType.state,
    ElementContributeType.reducerData<'elementState, 'action>,
  ) => StateType.state,
  dispatch: 'action. (StateType.state, StateType.action) => StateType.state,
  getIOData: StateType.state => StateType.ioData,
  getSkin: 'buttonStyle. (
    StateType.state,
    SkinContributeType.skinName,
  ) => SkinContributeType.skinContribute<'buttonStyle>,
  getCustomControl: 'inputData 'outputData. (
    StateType.state,
    CustomControlContributeType.customControlName,
  ) => CustomControlContributeType.customControlFunc<'inputData, 'outputData>,
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
  init: (
    Meta3dType.Index.state,
    (Meta3dType.Index.api, Meta3dType.Index.extensionName),
    bool,
    Dom.htmlCanvasElement,
  ) => Meta3dType.Index.state,
}
