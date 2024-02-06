let getExtensionService: Meta3dType.Index.getExtensionService<
  Meta3dUiProtocol.ServiceType.service,
> = api => {
  {
    registerElement: (meta3dState, elementContribute) => {
      api.setExtensionState(.
        meta3dState,
        "meta3d-ui-protocol",
        (UIManager.registerElement->Obj.magic)(
          api.getExtensionState(. meta3dState, "meta3d-ui-protocol"),
          elementContribute,
        ),
      )
    },
    registerSkin: (meta3dState, skinContribute) => {
      api.setExtensionState(.
        meta3dState,
        "meta3d-ui-protocol",
        (UIManager.registerSkin->Obj.magic)(
          api.getExtensionState(. meta3dState, "meta3d-ui-protocol"),
          skinContribute,
        ),
      )
    },
    registerUIControl: (meta3dState, uiControlContribute) => {
      api.setExtensionState(.
        meta3dState,
        "meta3d-ui-protocol",
        (UIManager.registerUIControl->Obj.magic)(
          api.getExtensionState(. meta3dState, "meta3d-ui-protocol"),
          uiControlContribute,
        ),
      )
    },
    registerInput: (meta3dState, inputContribute) => {
      api.setExtensionState(.
        meta3dState,
        "meta3d-ui-protocol",
        (UIManager.registerInput->Obj.magic)(
          api.getExtensionState(. meta3dState, "meta3d-ui-protocol"),
          inputContribute,
        ),
      )
    },
    getSkin: (meta3dState, skinName) => {
      (UIManager.getSkin->Obj.magic)(
        api.getExtensionState(. meta3dState, "meta3d-ui-protocol"),
        skinName,
      )
    },
    getUIControlFunc: (meta3dState, uiControlName) => {
      (UIManager.getUIControlFuncExn->Obj.magic)(
        api.getExtensionState(. meta3dState, "meta3d-ui-protocol"),
        uiControlName,
      )
    },
    getUIControlState: (meta3dState, uiControlName) => {
      (UIManager.getUIControlState->Obj.magic)(
        api.getExtensionState(. meta3dState, "meta3d-ui-protocol"),
        uiControlName,
      )
    },
    setUIControlState: (meta3dState, uiControlName, uiControlState) => {
      api.setExtensionState(.
        meta3dState,
        "meta3d-ui-protocol",
        (UIManager.setUIControlState->Obj.magic)(
          api.getExtensionState(. meta3dState, "meta3d-ui-protocol"),
          uiControlName,
          uiControlState,
        ),
      )
    },
    getInputFunc: (meta3dState, inputName) => {
      (UIManager.getInputFunc->Obj.magic)(
        api.getExtensionState(. meta3dState, "meta3d-ui-protocol"),
        inputName,
      )
    },
    hide: (meta3dState, elementName) => {
      api.setExtensionState(.
        meta3dState,
        "meta3d-ui-protocol",
        UIManager.hide(api.getExtensionState(. meta3dState, "meta3d-ui-protocol"), elementName),
      )
    },
    show: (meta3dState, elementName) => {
      api.setExtensionState(.
        meta3dState,
        "meta3d-ui-protocol",
        UIManager.show(api.getExtensionState(. meta3dState, "meta3d-ui-protocol"), elementName),
      )
    },
    isStateChange: (meta3dState, elementName) => {
      UIManager.isStateChange(
        api.getExtensionState(. meta3dState, "meta3d-ui-protocol"),
        elementName,
      )
    },
    getElementState: (meta3dState, elementName) => {
      (UIManager.getElementState->Obj.magic)(
        api.getExtensionState(. meta3dState, "meta3d-ui-protocol"),
        elementName,
      )
    },
    setStyle: (meta3dState, style) => {
      UIManager.setStyle(meta3dState, (api, "meta3d-imgui-renderer-protocol"), style)
    },
    beginWindow: (meta3dState, label, flags) => {
      UIManager.beginWindow(meta3dState, (api, "meta3d-imgui-renderer-protocol"), label, flags)
    },
    endWindow: meta3dState => {
      UIManager.endWindow(meta3dState, (api, "meta3d-imgui-renderer-protocol"))
    },
    beginChild: (meta3dState, label) => {
      UIManager.beginChild(meta3dState, (api, "meta3d-imgui-renderer-protocol"), label)
    },
    endChild: meta3dState => {
      UIManager.endChild(meta3dState, (api, "meta3d-imgui-renderer-protocol"))
    },
    setNextWindowRect: (meta3dState, rect) => {
      UIManager.setNextWindowRect(meta3dState, (api, "meta3d-imgui-renderer-protocol"), rect)
    },
    getFBOTexture: (meta3dState, textureID) => {
      UIManager.getFBOTexture(api.getExtensionState(. meta3dState, "meta3d-ui-protocol"), textureID)
    },
    setFBOTexture: (meta3dState, textureID, texture) => {
      api.setExtensionState(.
        meta3dState,
        "meta3d-ui-protocol",
        UIManager.setFBOTexture(
          api.getExtensionState(. meta3dState, "meta3d-ui-protocol"),
          textureID,
          texture,
        ),
      )
    },
    addFBOTexture: (meta3dState, texture, rect) => {
      UIManager.addFBOTexture(meta3dState, (api, "meta3d-imgui-renderer-protocol"), texture, rect)
    },
    getWindowBarHeight: meta3dState => {
      UIManager.getWindowBarHeight(meta3dState, (api, "meta3d-imgui-renderer-protocol"))
    },
    getContext: meta3dState => {
      UIManager.getContext(meta3dState, (api, "meta3d-imgui-renderer-protocol"))
    },
    button: (meta3dState, label, size) => {
      UIManager.button(meta3dState, (api, "meta3d-imgui-renderer-protocol"), label, size)
    },
    setCursorPos: (meta3dState, pos) => {
      UIManager.setCursorPos(meta3dState, (api, "meta3d-imgui-renderer-protocol"), pos)
    },
    loadImage: UIManager.loadImage((api, "meta3d-imgui-renderer-protocol")),
    asset: UIManager.asset((api, "meta3d-imgui-renderer-protocol")),
    handleDragDropTarget: UIManager.handleDragDropTarget((api, "meta3d-imgui-renderer-protocol")),
    menu: UIManager.menu((api, "meta3d-imgui-renderer-protocol")),
    tree: UIManager.tree((api, "meta3d-imgui-renderer-protocol")),
    // inspector: UIManager.inspector((api, "meta3d-imgui-renderer-protocol")),
    switchButton: UIManager.switchButton((api, "meta3d-imgui-renderer-protocol")),
    imageButton: UIManager.imageButton((api, "meta3d-imgui-renderer-protocol")),
    image: UIManager.image((api, "meta3d-imgui-renderer-protocol")),
    inputText: UIManager.inputText((api, "meta3d-imgui-renderer-protocol")),
    inputFloat1: UIManager.inputFloat1((api, "meta3d-imgui-renderer-protocol")),
    inputFloat3: UIManager.inputFloat3((api, "meta3d-imgui-renderer-protocol")),
    checkbox: UIManager.checkbox((api, "meta3d-imgui-renderer-protocol")),
    collapsing: UIManager.collapsing((api, "meta3d-imgui-renderer-protocol")),
    openModal: UIManager.openModal((api, "meta3d-imgui-renderer-protocol")),
    closeCurrentModal: UIManager.closeCurrentModal((api, "meta3d-imgui-renderer-protocol")),
    beginModal: UIManager.beginModal((api, "meta3d-imgui-renderer-protocol")),
    endModal: UIManager.endModal((api, "meta3d-imgui-renderer-protocol")),
    popup: UIManager.popup((api, "meta3d-imgui-renderer-protocol")),
    dummy: UIManager.dummy((api, "meta3d-imgui-renderer-protocol")),
    getItemRectMax: UIManager.getItemRectMax((api, "meta3d-imgui-renderer-protocol")),
    getItemRectSize: UIManager.getItemRectSize((api, "meta3d-imgui-renderer-protocol")),
    getWindowPos: UIManager.getWindowPos((api, "meta3d-imgui-renderer-protocol")),
    getWindowSize: UIManager.getWindowSize((api, "meta3d-imgui-renderer-protocol")),
    // getIOData: UIManager.getIOData,
    // dispatch: UIManager.dispatch,
    updateElementState: (meta3dState, updateElementStateFunc) => {
      api.setExtensionState(.
        meta3dState,
        "meta3d-ui-protocol",
        UIManager.updateElementState(
          api.getExtensionState(. meta3dState, "meta3d-ui-protocol"),
          updateElementStateFunc,
        ),
      )
    },
    // prepare: UIManager.prepare,
    init: UIManager.init,
    clear: UIManager.clear,
    render: UIManager.render(api),
    getCurrentElementState: meta3dState => {
      UIManager.getCurrentElementState(api.getExtensionState(. meta3dState, "meta3d-ui-protocol"))
    },
    setCurrentElementState: (meta3dState, currentElementState) => {
      api.setExtensionState(.
        meta3dState,
        "meta3d-ui-protocol",
        UIManager.setCurrentElementState(
          api.getExtensionState(. meta3dState, "meta3d-ui-protocol"),
          currentElementState,
        ),
      )
    },
  }
}

let createExtensionState: Meta3dType.Index.createExtensionState<
  Meta3dUiProtocol.StateType.state,
> = (. _, _) => {
  {
    elementFuncMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
    elementStateMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
    elementExecOrderMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
    isShowMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
    fboTextureMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
    isStateChangeMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
    skinContributeMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
    uiControlContributeMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
    uiControlStateMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
    inputContributeMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
    // ioData: None,
    // reducers: [],
    currentElementName: None,
    // imguiData: ManageIMGUIService.createData()
    // ioData: {
    //   pointUp: false,
    //   pointDown: false,
    //   pointTap: false,
    //   pointPosition: (0, 0),
    //   pointMovementDelta: (0, 0),
    // },
  }
}

let getExtensionLife: Meta3dType.Index.getExtensionLife<Meta3dUiProtocol.ServiceType.service> = (
  api,
  _,
) => {
  {
    onRegister: Js.Nullable.null,
    onRestore: Meta3dCommonlib.NullableSt.return(UIManager.restore(api)),
    onDeepCopy: Meta3dCommonlib.NullableSt.return(UIManager.deepCopy(api)),
    onStart: Js.Nullable.null,
    onInit: Js.Nullable.null,
    onUpdate: Js.Nullable.null,
  }
}
