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

let clear = (
  ~sandbox,
  ~clearColor,
  ~getExtensionService,
  ~getAllContributesByType=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~getExtensionState=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~setExtensionState=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~imguiRendererExtensionName="imguiRendererExtensionName",
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
      imguiRendererExtensionName,
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
// ): Meta3dUi2Protocol.StateType.ioData => {
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
  ~uiExtensionName="uiExtensionName",
  ~imguiRendererExtensionName="imguiRendererExtensionName",
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
    (uiExtensionName, imguiRendererExtensionName),
    time,
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
      }: Meta3dUi2Protocol.ElementContributeType.elementContribute<
        Meta3dUi2Protocol.StateType.elementState,
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
  ~imguiRendererExtensionName="imguiRendererExtensionName",
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
      imguiRendererExtensionName,
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
  ~imguiRendererExtensionName="imguiRendererExtensionName",
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
      imguiRendererExtensionName,
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
  ~imguiRendererExtensionName="imguiRendererExtensionName",
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
      imguiRendererExtensionName,
    ),
    rect,
  )
}

let registerUIControl = (~uiControlName, ~func, ~state=createState(), ()) => {
  UIManager.registerUIControl(
    state,
    (
      {
        uiControlName: uiControlName,
        func: func,
      }: Meta3dUi2Protocol.UIControlContributeType.uiControlContribute<
        Meta3dUi2Protocol.StateType.inputData,
        Meta3dUi2Protocol.StateType.outputData,
      >
    ),
  )
}

let getUIControlExn = UIManager.getUIControlExn

let buildSkinContribute = (skinName, skin): Meta3dUi2Protocol.SkinContributeType.skinContribute<
  Meta3dUi2Protocol.StateType.skin,
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
