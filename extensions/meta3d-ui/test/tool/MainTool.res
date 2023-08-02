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
  ~imguiRendererExtensionProtocolName="imguiRendererExtensionProtocolName",
  ~isInitEvent=true,
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
      imguiRendererExtensionProtocolName,
    ),
    isInitEvent,
    isDebug,
    canvas,
  )
}

let clear = (
  ~sandbox,
  ~clearColor,
  ~getExtensionService,
  ~getAllContributesByType=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~getExtensionState=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~setExtensionState=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~imguiRendererExtensionProtocolName="imguiRendererExtensionProtocolName",
  ~meta3dState=Obj.magic(1),
  (),
) => {
  UIManager.clear(
    meta3dState,
    (
      (
        {
          registerExtension: createEmptyStubWithJsObjSandbox(sandbox),
          getAllContributesByType: getAllContributesByType->Obj.magic,
          getExtensionService: getExtensionService->Obj.magic,
          getExtensionState: getExtensionState->Obj.magic,
          setExtensionState: setExtensionState->Obj.magic,
          registerContribute: createEmptyStubWithJsObjSandbox(sandbox),
          getContribute: createEmptyStubWithJsObjSandbox(sandbox),
        }: Meta3dType.Index.api
      ),
      imguiRendererExtensionProtocolName,
    ),
    clearColor,
  )
}

// let buildIOData = (
//   ~pointUp=false,
//   ~pointDown=false,
//   ~pointTap=false,
//   ~pointPosition=(0, 0),
//   ~pointMovementDelta=(0, 0),
//   (),
// ): Meta3dUiProtocol.StateType.ioData => {
//   {
//     pointUp: pointUp,
//     pointDown: pointDown,
//     pointTap: pointTap,
//     pointPosition: pointPosition,
//     pointMovementDelta: pointMovementDelta,
//   }
// }

let render = (
  ~sandbox,
  ~getExtensionService=createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
    ImguiRendererServiceTool.buildService(~sandbox, ()),
    _,
  ),
  ~getAllContributesByType=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~getExtensionState=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~setExtensionState=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~uiExtensionProtocolName="uiExtensionProtocolName",
  ~imguiRendererExtensionProtocolName="imguiRendererExtensionProtocolName",
  ~meta3dState=Obj.magic(1),
  ~time=0.,
  // ~ioData=buildIOData(),
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
    (uiExtensionProtocolName, imguiRendererExtensionProtocolName),
    time,
  )
}

let registerElement = (
  ~state,
  ~elementFunc,
  ~elementName="e1",
  ~execOrder=0,
  ~elementState=Obj.magic(1),
  // ~reducers=Js.Nullable.null,
  (),
) => {
  UIManager.registerElement(
    state,
    (
      {
        elementName,
        execOrder,
        elementFunc,
        elementState,
        // reducers,
      }: Meta3dUiProtocol.ElementContributeType.elementContribute<
        Meta3dUiProtocol.StateType.elementState,
      >
    ),
  )
}

let markStateChange = (~state, ~elementName) => {
  UIManager._markStateChange(state, elementName)
}

let isStateChange = UIManager.isStateChange

let show = (~state, ~elementName) => {
  UIManager.show(state, elementName)
}

let hide = (~state, ~elementName) => {
  UIManager.hide(state, elementName)
}

let beginWindow = (
  ~sandbox,
  ~label,
  ~getExtensionService,
  ~getAllContributesByType=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~getExtensionState=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~setExtensionState=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~imguiRendererExtensionProtocolName="imguiRendererExtensionProtocolName",
  ~meta3dState=Obj.magic(1),
  (),
) => {
  UIManager.beginWindow(
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
      imguiRendererExtensionProtocolName,
    ),
    label,
  )
}

let endWindow = (
  ~sandbox,
  ~getExtensionService,
  ~getAllContributesByType=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~getExtensionState=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~setExtensionState=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~imguiRendererExtensionProtocolName="imguiRendererExtensionProtocolName",
  ~meta3dState=Obj.magic(1),
  (),
) => {
  UIManager.endWindow(
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
      imguiRendererExtensionProtocolName,
    ),
  )
}

let setNextWindowRect = (
  ~sandbox,
  ~rect,
  ~getExtensionService,
  ~getAllContributesByType=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~getExtensionState=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~setExtensionState=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~imguiRendererExtensionProtocolName="imguiRendererExtensionProtocolName",
  ~meta3dState=Obj.magic(1),
  (),
) => {
  UIManager.setNextWindowRect(
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
      imguiRendererExtensionProtocolName,
    ),
    rect,
  )
}

let getFBOTexture = (~textureID, ~state=createState(), ()) => {
  UIManager.getFBOTexture(state, textureID)
}

let setFBOTexture = (~textureID, ~texture, ~state=createState(), ()) => {
  UIManager.setFBOTexture(state, textureID, texture)
}

let addFBOTexture = (
  ~sandbox,
  ~getExtensionService,
  ~texture,
  ~rect,
  ~getAllContributesByType=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~getExtensionState=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~setExtensionState=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~imguiRendererExtensionProtocolName="imguiRendererExtensionProtocolName",
  ~meta3dState=Obj.magic(1),
  (),
) => {
  UIManager.addFBOTexture(
    meta3dState,
    (
      (
        {
          registerExtension: createEmptyStubWithJsObjSandbox(sandbox),
          getAllContributesByType: getAllContributesByType->Obj.magic,
          getExtensionService: getExtensionService->Obj.magic,
          getExtensionState: getExtensionState->Obj.magic,
          setExtensionState: setExtensionState->Obj.magic,
          registerContribute: createEmptyStubWithJsObjSandbox(sandbox),
          getContribute: createEmptyStubWithJsObjSandbox(sandbox),
        }: Meta3dType.Index.api
      ),
      imguiRendererExtensionProtocolName,
    ),
    texture,
    rect,
  )
}

let getContext = (
  ~sandbox,
  ~getExtensionService,
  ~getAllContributesByType=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~getExtensionState=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~setExtensionState=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~imguiRendererExtensionProtocolName="imguiRendererExtensionProtocolName",
  ~meta3dState=Obj.magic(1),
  (),
) => {
  UIManager.getContext(
    meta3dState,
    (
      (
        {
          registerExtension: createEmptyStubWithJsObjSandbox(sandbox),
          getAllContributesByType: getAllContributesByType->Obj.magic,
          getExtensionService: getExtensionService->Obj.magic,
          getExtensionState: getExtensionState->Obj.magic,
          setExtensionState: setExtensionState->Obj.magic,
          registerContribute: createEmptyStubWithJsObjSandbox(sandbox),
          getContribute: createEmptyStubWithJsObjSandbox(sandbox),
        }: Meta3dType.Index.api
      ),
      imguiRendererExtensionProtocolName,
    ),
  )
}

let button = (
  ~sandbox,
  ~label,
  ~size,
  ~getExtensionService,
  ~getAllContributesByType=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~getExtensionState=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~setExtensionState=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~imguiRendererExtensionProtocolName="imguiRendererExtensionProtocolName",
  ~meta3dState=Obj.magic(1),
  (),
) => {
  UIManager.button(
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
      imguiRendererExtensionProtocolName,
    ),
    label,
    size,
  )
}

let registerUIControl = (~uiControlName, ~func, ~state=createState(), ()) => {
  UIManager.registerUIControl(
    state,
    (
      {
        uiControlName,
        func,
      }: Meta3dUiProtocol.UIControlContributeType.uiControlContribute<
        Meta3dUiProtocol.StateType.inputData,
        Meta3dUiProtocol.StateType.outputData,
      >
    ),
  )
}

let getUIControlState = UIManager.getUIControlState

let setUIControlState = UIManager.setUIControlState

let getUIControlFuncExn = UIManager.getUIControlFuncExn

let buildSkinContribute = (skinName, skin): Meta3dUiProtocol.SkinContributeType.skinContribute<
  Meta3dUiProtocol.StateType.skin,
> => {
  {
    skinName,
    skin,
  }
}

let registerSkin = (~skinName, ~skin, ~state=createState(), ()) => {
  UIManager.registerSkin(state, buildSkinContribute(skinName, skin))
}

let getSkin = UIManager.getSkin

// let dispatch = UIManager.dispatch
let updateElementState = UIManager.updateElementState

let getElementState = UIManager.getElementState
