open Sinon

let createState = () => {
  Main.createExtensionState()
}

let init = (
  ~sandbox,
  ~getExtensionService,
  ~getAllContributesByType=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~getExtensionState=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~setExtensionState=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~imguiRendererExtensionName="imguiRendererExtensionName",
  ~isDebug=false,
  ~meta3dState=Obj.magic(1),
  ~canvas=Obj.magic(10),
  (),
) => {
  UIManager.init(
    meta3dState,
    (
      (
        {
          registerExtension: createEmptyStubWithJsObjSandbox(sandbox),
          getAllContributesByType: getAllContributesByType->Obj.magic,
          getExtensionService: getExtensionService->Obj.magic,
          setExtensionState: setExtensionState->Obj.magic,
          getExtensionState: getExtensionState->Obj.magic,
          registerContribute: createEmptyStubWithJsObjSandbox(sandbox),
          getContribute: createEmptyStubWithJsObjSandbox(sandbox),
        }: Meta3dType.Index.api
      ),
      imguiRendererExtensionName,
    ),
    isDebug,
    canvas,
  )
}

let buildIOData = (
  ~pointUp=false,
  ~pointDown=false,
  ~pointTap=false,
  ~pointPosition=(0, 0),
  ~pointMovementDelta=(0, 0),
  (),
): Meta3dUiProtocol.StateType.ioData => {
  {
    pointUp: pointUp,
    pointDown: pointDown,
    pointTap: pointTap,
    pointPosition: pointPosition,
    pointMovementDelta: pointMovementDelta,
  }
}

let render = (
  ~sandbox,
  ~getExtensionService=createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
    ImguiRendererServiceTool.buildService(~sandbox, ()),
    _,
  ),
  ~getAllContributesByType=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~getExtensionState=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~setExtensionState=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~uiExtensionName="uiExtensionName",
  ~imguiRendererExtensionName="imguiRendererExtensionName",
  ~meta3dState=Obj.magic(1),
  ~ioData=buildIOData(),
  (),
) => {
  UIManager.render(
    (
      {
        registerExtension: createEmptyStubWithJsObjSandbox(sandbox),
        getAllContributesByType: getAllContributesByType->Obj.magic,
        getExtensionService: getExtensionService->Obj.magic,
        setExtensionState: setExtensionState->Obj.magic,
        getExtensionState: getExtensionState->Obj.magic,
        registerContribute: createEmptyStubWithJsObjSandbox(sandbox),
        getContribute: createEmptyStubWithJsObjSandbox(sandbox),
      }: Meta3dType.Index.api
    ),
    meta3dState,
    (uiExtensionName, imguiRendererExtensionName),
    ioData,
  )
}

let registerElement = (
  ~sandbox,
  ~state,
  ~elementFunc,
  ~elementName="e1",
  ~execOrder=0,
  ~elementState=Obj.magic(1),
  ~reducers=Js.Nullable.null,
  (),
) => {
  UIManager.registerElement(
    state,
    (
      {
        elementName: elementName,
        execOrder: execOrder,
        elementFunc: elementFunc,
        elementState: elementState,
        reducers: reducers,
      }: Meta3dUiProtocol.ElementContributeType.elementContribute<
        Meta3dUiProtocol.StateType.elementState,
      >
    ),
  )
}

let markStateChange = (~state, ~elementName) => {
  UIManager._markStateChange(state, elementName)
}

let isStateChange = (state: Meta3dUiProtocol.StateType.state, elementName) => {
  state.isStateChangeMap->Meta3dCommonlib.ImmutableHashMap.getExn(elementName) == true
}

let show = (~state, ~elementName) => {
  UIManager.show(state, elementName)
}

let hide = (~state, ~elementName) => {
  UIManager.hide(state, elementName)
}

let drawBox = (
  ~sandbox,
  ~rect,
  ~backgroundColor,
  ~getExtensionService,
  ~getAllContributesByType=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~getExtensionState=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~setExtensionState=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~imguiRendererExtensionName="imguiRendererExtensionName",
  ~meta3dState=Obj.magic(1),
  (),
) => {
  UIManager.drawBox(
    meta3dState,
    (
      (
        {
          registerExtension: createEmptyStubWithJsObjSandbox(sandbox),
          getAllContributesByType: getAllContributesByType->Obj.magic,
          getExtensionService: getExtensionService->Obj.magic,
          setExtensionState: setExtensionState->Obj.magic,
          getExtensionState: getExtensionState->Obj.magic,
          registerContribute: createEmptyStubWithJsObjSandbox(sandbox),
          getContribute: createEmptyStubWithJsObjSandbox(sandbox),
        }: Meta3dType.Index.api
      ),
      imguiRendererExtensionName,
    ),
    rect,
    backgroundColor,
  )
}

let registerUIControl = (~uiControlName, ~func, ~state=createState(), ()) => {
  UIManager.registerUIControl(
    state,
    (
      {
        uiControlName: uiControlName,
        func: func,
      }: Meta3dUiProtocol.UIControlContributeType.uiControlContribute<
        Meta3dUiProtocol.StateType.inputData,
        Meta3dUiProtocol.StateType.outputData,
      >
    ),
  )
}

let getUIControlExn = UIManager.getUIControlExn

let buildSkinContribute = (skinName, skin): Meta3dUiProtocol.SkinContributeType.skinContribute<
  Meta3dUiProtocol.StateType.skin,
> => {
  {
    skinName: skinName,
    skin: skin,
  }
}

let registerSkin = (~skinName, ~skin, ~state=createState(), ()) => {
  UIManager.registerSkin(state, buildSkinContribute(skinName, skin))
}

let getSkinExn = UIManager.getSkinExn

let dispatch = UIManager.dispatch

let getElementState = UIManager.getElementState
