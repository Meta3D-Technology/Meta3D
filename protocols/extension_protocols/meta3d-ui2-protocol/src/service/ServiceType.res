type uiExtensionName = Meta3dType.Index.extensionName

type imguiRendererExtensionName = Meta3dType.Index.extensionName

// type text = string

type time = float

type elementStateField

type updateElementStateFieldFunc = elementStateField => elementStateField

type clearColor = (float, float, float, float)

type service = {
  registerElement: 'elementState. (
    StateType.state,
    ElementContributeType.elementContribute<'elementState>,
  ) => StateType.state,
  registerSkin: (
    StateType.state,
    SkinContributeType.skinContribute<StateType.skin>,
  ) => StateType.state,
  registerUIControl: (
    StateType.state,
    UIControlContributeType.uiControlContribute<StateType.inputData, StateType.outputData>,
  ) => StateType.state,
  render: (
    Meta3dType.Index.state,
    (uiExtensionName, imguiRendererExtensionName),
    // StateType.ioData,
    time,
  ) => Js.Promise.t<Meta3dType.Index.state>,
  show: (StateType.state, ElementContributeType.elementName) => StateType.state,
  hide: (StateType.state, ElementContributeType.elementName) => StateType.state,
  isStateChange: (StateType.state, ElementContributeType.elementName) => bool,
  getElementState: 'elementState. (
    StateType.state,
    ElementContributeType.elementName,
  ) => Js.Nullable.t<'elementState>,
  dispatch: 'action. (
    StateType.state,
    string,
    string,
    updateElementStateFieldFunc,
  ) => StateType.state,
  // getIOData: StateType.state => StateType.ioData,
  getSkin: 'skin. (
    StateType.state,
    SkinContributeType.skinName,
  ) => SkinContributeType.skinContribute<'skin>,
  getUIControl: 'inputData 'outputData. (
    StateType.state,
    UIControlContributeType.uiControlName,
  ) => UIControlContributeType.uiControlFunc<'inputData, 'outputData>,
  beginWindow: (
    Meta3dType.Index.state,
    Meta3dImguiRenderer2Protocol.ServiceType.label,
  ) => Meta3dType.Index.state,
  endWindow: Meta3dType.Index.state => Meta3dType.Index.state,
  init: (
    Meta3dType.Index.state,
    (Meta3dType.Index.api, imguiRendererExtensionName),
    bool,
    Dom.htmlCanvasElement,
  ) => Js.Promise.t<Meta3dType.Index.state>,
  clear: (
    Meta3dType.Index.state,
    (Meta3dType.Index.api, imguiRendererExtensionName),
    clearColor,
  ) => Meta3dType.Index.state,
}
