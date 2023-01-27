open EventManagerStateType

let setLastXY = (lastX, lastY) =>
  ContainerManager.getState(EventExtensionTool.buildEventExtentsionProtocolName())
  ->HandleMouseEventDoService.setLastXY(lastX, lastY)
  ->ContainerManager.setState(EventExtensionTool.buildEventExtentsionProtocolName())

let getIsDrag = () =>
  ContainerManager.getState(
    EventExtensionTool.buildEventExtentsionProtocolName(),
  )->HandleMouseEventDoService.getIsDrag

let setIsDrag = isDrag =>
  ContainerManager.getState(EventExtensionTool.buildEventExtentsionProtocolName())
  ->HandleMouseEventDoService.setIsDrag(isDrag)
  ->ContainerManager.setState(EventExtensionTool.buildEventExtentsionProtocolName())

let buildMouseEvent = (
  ~pageX=10,
  ~pageY=20,
  ~which=0,
  ~movementX=1,
  ~movementY=2,
  ~detail=Js.Nullable.undefined,
  ~wheelDelta=Js.Nullable.undefined,
  ~preventDefaultFunc=() => (),
  ~stopPropagationFunc=() => (),
  (),
) =>
  {
    "pageX": pageX,
    "pageY": pageY,
    "which": which,
    "movementX": movementX,
    "movementY": movementY,
    "detail": detail,
    "wheelDelta": wheelDelta,
    "preventDefault": preventDefaultFunc,
    "stopPropagation": stopPropagationFunc,
  }

let setPointerLocked = %raw(`
function(){
 document.pointerLockElement = {};
 }
  `)

let setNotPointerLocked = %raw(`
function(){
 document.pointerLockElement = undefined;
 }
  `)

let prepareWithState = (
  ~sandbox,
  ~state,
  ~offsetLeft=1,
  ~offsetTop=2,
  ~offsetParent=Js.Nullable.undefined,
  ~setBrowserFunc=BrowserDetectTool.setChrome,
  (),
) => {
  let canvasDom = EventTool.buildFakeCanvas((offsetLeft, offsetTop, offsetParent))

  state
  ->BodyDoService.setBody(BodyTool.getBody())
  ->CanvasDoService.setCanvas(canvasDom->Obj.magic)
  ->setBrowserFunc
  ->InitEventDoService.initEvent(EventExtensionTool.buildEventExtentsionProtocolName())
}

let prepare = (
  ~sandbox,
  ~offsetLeft=1,
  ~offsetTop=2,
  ~offsetParent=Js.Nullable.undefined,
  ~setBrowserFunc=BrowserDetectTool.setChrome,
  (),
) =>
  prepareWithState(
    ~sandbox,
    ~offsetLeft,
    ~offsetTop,
    ~offsetParent,
    ~setBrowserFunc,
    ~state=ContainerManager.getState(EventExtensionTool.buildEventExtentsionProtocolName()),
    (),
  )->ContainerManager.setState(EventExtensionTool.buildEventExtentsionProtocolName())

let prepareForPointerLock = (sandbox, state) => {
  open Sinon

  let canvas = CanvasDoService.getCanvas(state)->Meta3dCommonlib.OptionSt.unsafeGet->Obj.magic
  let requestPointerLockStub = createEmptyStubWithJsObjSandbox(sandbox)
  canvas["requestPointerLock"] = requestPointerLockStub

  (state, requestPointerLockStub)
}
