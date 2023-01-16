type uiExtensionProtocolName = Meta3dType.Index.extensionProtocolName

type imguiRendererExtensionProtocolName = Meta3dType.Index.extensionProtocolName

// type text = string

type time = float

type elementStateField

type updateElementStateFieldFunc = elementStateField => elementStateField

type clearColor = (float, float, float, float)

type texture = Meta3dImguiRendererProtocol.ServiceType.texture

type isDebug = bool

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
    (uiExtensionProtocolName, imguiRendererExtensionProtocolName),
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
  ) => Js.Nullable.t<SkinContributeType.skinContribute<'skin>>,
  getUIControlFunc: 'inputData 'outputData. (
    StateType.state,
    UIControlContributeType.uiControlName,
  ) => UIControlContributeType.uiControlFunc<'inputData, 'outputData>,
  // updateUIControlName: (
  //   Meta3dType.Index.state,
  //   uiExtensionProtocolName,
  //   (UIControlContributeType.uiControlName, UIControlContributeType.uiControlName),
  // ) => Meta3dType.Index.state,
  getUIControlState: 'uiControlState. (
    StateType.state,
    UIControlContributeType.uiControlName,
  ) => Js.Nullable.t<'uiControlState>,
  setUIControlState: 'uiControlState. (
    StateType.state,
    UIControlContributeType.uiControlName,
    'uiControlState,
  ) => StateType.state,
  setStyle: (
    Meta3dType.Index.state,
    Meta3dImguiRendererProtocol.ServiceType.style,
  ) => Meta3dType.Index.state,
  beginWindow: (
    Meta3dType.Index.state,
    Meta3dImguiRendererProtocol.ServiceType.label,
  ) => Meta3dType.Index.state,
  endWindow: Meta3dType.Index.state => Meta3dType.Index.state,
  setNextWindowRect: (
    Meta3dType.Index.state,
    Meta3dImguiRendererProtocol.ServiceType.rect,
  ) => Meta3dType.Index.state,
  addFBOTexture: (
    Meta3dType.Index.state,
    Js.Null.t<texture>,
    Meta3dImguiRendererProtocol.ServiceType.size,
  ) => Meta3dType.Index.state,
  getFBOTexture: (StateType.state, StateType.textureID) => Js.Nullable.t<texture>,
  setFBOTexture: (StateType.state, StateType.textureID, texture) => StateType.state,
  getContext: Meta3dType.Index.state => Meta3dImguiRendererProtocol.ServiceType.context,
  button: (
    Meta3dType.Index.state,
    Meta3dImguiRendererProtocol.ServiceType.label,
    Meta3dImguiRendererProtocol.ServiceType.size,
  ) => (Meta3dType.Index.state, bool),
  setCursorPos: (
    Meta3dType.Index.state,
    Meta3dImguiRendererProtocol.ServiceType.pos,
  ) => Meta3dType.Index.state,
  // prepare: (
  //   StateType.state,
  //   array<
  //     UIControlContributeType.uiControlContribute<
  //       StateType.uiControlState,
  //       StateType.inputData,
  //       StateType.outputData,
  //     >,
  //   >,
  // ) => StateType.state,
  init: (
    Meta3dType.Index.state,
    (Meta3dType.Index.api, imguiRendererExtensionProtocolName),
    bool,
    bool,
    Dom.htmlCanvasElement,
  ) => Js.Promise.t<Meta3dType.Index.state>,
  clear: (
    Meta3dType.Index.state,
    (Meta3dType.Index.api, imguiRendererExtensionProtocolName),
    clearColor,
  ) => Meta3dType.Index.state,
}
