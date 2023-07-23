let getExtensionService: Meta3dType.Index.getExtensionService<
  Meta3dUiProtocol.ServiceType.service,
> = (api) => {
  {
    registerElement: UIManager.registerElement->Obj.magic,
    registerSkin: UIManager.registerSkin,
    registerUIControl: UIManager.registerUIControl,
    getSkin: UIManager.getSkin->Obj.magic,
    getUIControlFunc: UIManager.getUIControlFuncExn->Obj.magic,
    getUIControlState: UIManager.getUIControlState->Obj.magic,
    setUIControlState: UIManager.setUIControlState->Obj.magic,
    // updateUIControlName: (
    //   meta3dState,
    //   uiExtensionProtocolName,
    //   (oldUIControlName, newUIControlName),
    // ) => {
    //   UIManager.updateUIControlName(
    //     meta3dState,
    //     (api, uiExtensionProtocolName),
    //     (oldUIControlName, newUIControlName),
    //   )
    // },
    hide: UIManager.hide,
    show: UIManager.show,
    isStateChange: UIManager.isStateChange,
    getElementState: UIManager.getElementState->Obj.magic,
    setStyle: (meta3dState, style) => {
      UIManager.setStyle(meta3dState, (api, "meta3d-imgui-renderer-protocol"), style)
    },
    beginWindow: (meta3dState, label) => {
      UIManager.beginWindow(meta3dState, (api, "meta3d-imgui-renderer-protocol"), label)
    },
    endWindow: meta3dState => {
      UIManager.endWindow(meta3dState, (api, "meta3d-imgui-renderer-protocol"))
    },
    setNextWindowRect: (meta3dState, rect) => {
      UIManager.setNextWindowRect(
        meta3dState,
        (api, "meta3d-imgui-renderer-protocol"),
        rect,
      )
    },
    getFBOTexture: UIManager.getFBOTexture,
    setFBOTexture: UIManager.setFBOTexture,
    addFBOTexture: (meta3dState, texture, rect) => {
      UIManager.addFBOTexture(
        meta3dState,
        (api, "meta3d-imgui-renderer-protocol"),
        texture,
        rect,
      )
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
    // getIOData: UIManager.getIOData,
    dispatch: UIManager.dispatch,
    // prepare: UIManager.prepare,
    init: UIManager.init,
    clear: UIManager.clear,
    render: UIManager.render(api),
  }
}

let createExtensionState: Meta3dType.Index.createExtensionState<
  Meta3dUiProtocol.StateType.state,
> = () => {
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
    // ioData: None,
    reducers: [],
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
  _,
  _,
) => {
  {
    onRegister: Js.Nullable.null,
    onStart: Js.Nullable.null,
    onInit: Js.Nullable.null,
    onUpdate: Js.Nullable.null,
  }
}
