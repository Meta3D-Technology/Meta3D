type uiExtensionProtocolName = Meta3dType.Index.extensionProtocolName

type imguiRendererExtensionProtocolName = Meta3dType.Index.extensionProtocolName

// type text = string

type time = float

// type elementStateField

type updateElementStateFunc = StateType.elementState => StateType.elementState

type clearColor = (float, float, float, float)

type texture = Meta3dImguiRendererProtocol.ServiceType.texture

type isDebug = bool

type vec2 = Meta3dImguiRendererProtocol.ServiceType.vec2

type service = {
  registerElement: 'elementState. (
    Meta3dType.Index.state,
    ElementContributeType.elementContribute<'elementState>,
  ) => Meta3dType.Index.state,
  registerSkin: (
    Meta3dType.Index.state,
    SkinContributeType.skinContribute<StateType.skin>,
  ) => Meta3dType.Index.state,
  registerUIControl: (
    Meta3dType.Index.state,
    UIControlContributeType.uiControlContribute<
      StateType.inputFunc,
      StateType.specificData,
      StateType.outputData,
    >,
  ) => Meta3dType.Index.state,
  registerInput: (
    Meta3dType.Index.state,
    InputContributeType.inputContribute<StateType.data>,
  ) => Meta3dType.Index.state,
  render: (
    Meta3dType.Index.state,
    (uiExtensionProtocolName, imguiRendererExtensionProtocolName),
    // StateType.ioData,
    time,
  ) => Js.Promise.t<Meta3dType.Index.state>,
  show: (Meta3dType.Index.state, ElementContributeType.elementName) => Meta3dType.Index.state,
  hide: (Meta3dType.Index.state, ElementContributeType.elementName) => Meta3dType.Index.state,
  isStateChange: (Meta3dType.Index.state, ElementContributeType.elementName) => bool,
  getElementState: 'elementState. (
    Meta3dType.Index.state,
    ElementContributeType.elementName,
  ) => Js.Nullable.t<'elementState>,
  // dispatch: 'action. (
  //   Meta3dType.Index.state,
  //   string,
  //   string,
  //   updateElementStateFunc,
  // ) => Meta3dType.Index.state,
  updateElementState: (Meta3dType.Index.state, updateElementStateFunc) => Meta3dType.Index.state,
  // getIOData: Meta3dType.Index.state => StateType.ioData,
  getSkin: 'skin. (
    Meta3dType.Index.state,
    SkinContributeType.skinName,
  ) => Js.Nullable.t<SkinContributeType.skinContribute<'skin>>,
  getUIControlFunc: 'inputFunc 'specificData 'outputData. (
    Meta3dType.Index.state,
    UIControlContributeType.uiControlName,
  ) => UIControlContributeType.uiControlFunc<'inputFunc, 'specificData, 'outputData>,
  getInputFunc: 'data. (
    Meta3dType.Index.state,
    InputContributeType.inputName,
  ) => Js.Nullable.t<InputContributeType.inputFunc<'data>>,
  // updateUIControlName: (
  //   Meta3dType.Index.state,
  //   uiExtensionProtocolName,
  //   (UIControlContributeType.uiControlName, UIControlContributeType.uiControlName),
  // ) => Meta3dType.Index.state,
  getUIControlState: 'uiControlState. (
    Meta3dType.Index.state,
    UIControlContributeType.uiControlName,
  ) => Js.Nullable.t<'uiControlState>,
  setUIControlState: 'uiControlState. (
    Meta3dType.Index.state,
    UIControlContributeType.uiControlName,
    'uiControlState,
  ) => Meta3dType.Index.state,
  setStyle: (
    Meta3dType.Index.state,
    Meta3dImguiRendererProtocol.ServiceType.style,
  ) => Meta3dType.Index.state,
  beginWindow: (
    Meta3dType.Index.state,
    Meta3dImguiRendererProtocol.ServiceType.label,
    Meta3dImguiRendererProtocol.ServiceType.windowFlags,
  ) => Meta3dType.Index.state,
  endWindow: Meta3dType.Index.state => Meta3dType.Index.state,
  beginChild: (
    Meta3dType.Index.state,
    Meta3dImguiRendererProtocol.ServiceType.label,
  ) => Meta3dType.Index.state,
  endChild: Meta3dType.Index.state => Meta3dType.Index.state,
  setNextWindowRect: (
    Meta3dType.Index.state,
    Meta3dImguiRendererProtocol.ServiceType.rect,
  ) => Meta3dType.Index.state,
  addFBOTexture: (
    Meta3dType.Index.state,
    Js.Null.t<texture>,
    Meta3dImguiRendererProtocol.ServiceType.rect,
  ) => Meta3dType.Index.state,
  getFBOTexture: (Meta3dType.Index.state, StateType.textureID) => Js.Nullable.t<texture>,
  setFBOTexture: (Meta3dType.Index.state, StateType.textureID, texture) => Meta3dType.Index.state,
  getWindowBarHeight: Meta3dType.Index.state => float,
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
  loadImage: (
    Meta3dType.Index.state,
    Meta3dImguiRendererProtocol.ServiceType.imageSrc,
  ) => Js.Promise.t<Meta3dImguiRendererProtocol.ServiceType.imguiImplTexture>,
  asset: (
    Meta3dType.Index.state,
    array<(string, string, Meta3dImguiRendererProtocol.ServiceType.imguiImplTexture)>,
    Meta3dImguiRendererProtocol.ServiceType.label,
    Meta3dImguiRendererProtocol.ServiceType.rect,
  ) => (Meta3dType.Index.state, Js.Nullable.t<string>),
  handleDragDropTarget: 'data. (
    Meta3dType.Index.state,
    string,
  ) => (Meta3dType.Index.state, Js.Nullable.t<'data>),
  menu: (
    Meta3dType.Index.state,
    Meta3dImguiRendererProtocol.ServiceType.menuAllLabels,
    string,
    Meta3dImguiRendererProtocol.ServiceType.rect,
  ) => (Meta3dType.Index.state, Js.Nullable.t<Meta3dImguiRendererProtocol.ServiceType.menuLabel>),
  tree: (
    Meta3dType.Index.state,
    Meta3dImguiRendererProtocol.ServiceType.treeData,
    Meta3dImguiRendererProtocol.ServiceType.treeNodeLabel,
    Js.Nullable.t<Meta3dImguiRendererProtocol.ServiceType.treeIndexData>,
    // {
    //   "addCubeTexture": Meta3dImguiRendererProtocol.ServiceType.imguiImplTexture,
    //   "disposeTexture": Meta3dImguiRendererProtocol.ServiceType.imguiImplTexture,
    //   "cloneTexture": Meta3dImguiRendererProtocol.ServiceType.imguiImplTexture,
    //   // "cameraIconTexture": Meta3dImguiRendererProtocol.ServiceType.imguiImplTexture,
    //   // "meshIconTexture": Meta3dImguiRendererProtocol.ServiceType.imguiImplTexture,
    //   // "lightIconTexture": Meta3dImguiRendererProtocol.ServiceType.imguiImplTexture,
    // },
    string,
    Meta3dImguiRendererProtocol.ServiceType.rect,
  ) => (Meta3dType.Index.state, Meta3dImguiRendererProtocol.ServiceType.treeReturnData),
  // inspector: (
  //   Meta3dType.Index.state,
  //   string,
  //   (float, float, float),
  //   (float, float, float),
  //   (float, float, float),
  //   string,
  //   Meta3dImguiRendererProtocol.ServiceType.rect,
  // ) => (Meta3dType.Index.state, Meta3dImguiRendererProtocol.ServiceType.inspectorReturnData),
  switchButton: (
    Meta3dType.Index.state,
    bool,
    {
      "click1Texture": Meta3dImguiRendererProtocol.ServiceType.imguiImplTexture,
      "click2Texture": Meta3dImguiRendererProtocol.ServiceType.imguiImplTexture,
    },
    Meta3dImguiRendererProtocol.ServiceType.size,
  ) => (Meta3dType.Index.state, (bool, bool)),
  imageButton: (
    Meta3dType.Index.state,
    Meta3dImguiRendererProtocol.ServiceType.imguiImplTexture,
    Meta3dImguiRendererProtocol.ServiceType.size,
  ) => (Meta3dType.Index.state, bool),
  image: (
    Meta3dType.Index.state,
    Meta3dImguiRendererProtocol.ServiceType.imguiImplTexture,
    Meta3dImguiRendererProtocol.ServiceType.size,
  ) => Meta3dType.Index.state,
  inputText: (
    Meta3dType.Index.state,
    Meta3dImguiRendererProtocol.ServiceType.label,
    string,
    int,
    int,
  ) => (Meta3dType.Index.state, Js.Nullable.t<string>),
  inputFloat1: (
    Meta3dType.Index.state,
    Meta3dImguiRendererProtocol.ServiceType.label,
    float,
    float,
    float,
    int,
  ) => (Meta3dType.Index.state, Js.Nullable.t<float>),
  inputFloat3: (
    Meta3dType.Index.state,
    Meta3dImguiRendererProtocol.ServiceType.label,
    (float, float, float),
    float,
    float,
    int,
  ) => (Meta3dType.Index.state, Js.Nullable.t<(float, float, float)>),
  checkbox: (
    Meta3dType.Index.state,
    Meta3dImguiRendererProtocol.ServiceType.label,
    bool,
  ) => (Meta3dType.Index.state, Js.Nullable.t<bool>),
  collapsing: (
    Meta3dType.Index.state,
    Meta3dImguiRendererProtocol.ServiceType.label,
    bool,
    Meta3dImguiRendererProtocol.ServiceType.cond,
  ) => (Meta3dType.Index.state, bool),
  openModal: (
    Meta3dType.Index.state,
    Meta3dImguiRendererProtocol.ServiceType.label,
  ) => Meta3dType.Index.state,
  closeCurrentModal: Meta3dType.Index.state => Meta3dType.Index.state,
  beginModal: (
    Meta3dType.Index.state,
    Meta3dImguiRendererProtocol.ServiceType.label,
  ) => (Meta3dType.Index.state, bool),
  endModal: Meta3dType.Index.state => Meta3dType.Index.state,
  popup: (
    Meta3dType.Index.state,
    Meta3dImguiRendererProtocol.ServiceType.label,
    array<string>,
    string,
  ) => (Meta3dType.Index.state, Js.Nullable.t<int>),
  imagePopup: (
    Meta3dType.Index.state,
    Meta3dImguiRendererProtocol.ServiceType.imguiImplTexture,
    Meta3dImguiRendererProtocol.ServiceType.rect,
    array<string>,
    string,
  ) => (Meta3dType.Index.state, Js.Nullable.t<int>),
  dummy: (Meta3dType.Index.state, int, int) => Meta3dType.Index.state,
  list: (
    Meta3dType.Index.state,
    Meta3dImguiRendererProtocol.ServiceType.label,
    (int, int),
    array<string>,
    (int, int),
    bool,
   Js.Nullable.t< Meta3dImguiRendererProtocol.ServiceType.imguiImplTexture>,
  ) => (Meta3dType.Index.state, (Js.Nullable.t<(int, string)>, Js.Nullable.t<bool>)),
  getItemRectMax: Meta3dType.Index.state => vec2,
  getItemRectSize: Meta3dType.Index.state => vec2,
  getWindowPos: Meta3dType.Index.state => vec2,
  getWindowSize: Meta3dType.Index.state => vec2,
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
  getCurrentElementState: Meta3dType.Index.state => Js.Nullable.t<StateType.elementState>,
  setCurrentElementState: (
    Meta3dType.Index.state,
    StateType.elementState,
  ) => Meta3dType.Index.state,
}
