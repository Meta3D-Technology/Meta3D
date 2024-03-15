open EventManagerStateType

open Meta3dEventProtocol.EventType

let _getBody = state => state->BodyDoService.getBodyExn->bodyToEventTarget

let setBody = (body, state) => {
  {
    ...state,
    body: Some(body),
  }
}

let _fromPointDomEvent = (eventName, state) =>
  Meta3dBsMostDefault.Most.fromEvent(eventName, _getBody(state), false)

let _fromMobilePointDomEvent = (eventName, state) => {
  Meta3dBsMostDefault.Most.fromEvent(eventName, _getBody(state), {"passive": false}->Obj.magic)
}

let _fromTouchMoveDomEventAndPreventnDefault = state =>
  _fromMobilePointDomEvent("touchmove", state)->Meta3dBsMostDefault.Most.tap(
    event =>
      HandlePointDomEventDoService.preventDefault(
        event->eventTargetToTouchDomEvent->touchDomEventToPointDomEvent,
      ),
    _,
  )

let _fromKeyboardDomEvent = (eventName, state) =>
  Meta3dBsMostDefault.Most.fromEvent(eventName, _getBody(state), false)

let _convertMouseEventToPointEvent = (
  eventName,
  {location, locationInView, button, wheel, movementDelta, event}: mouseEvent,
) => {
  name: eventName,
  location,
  locationInView,
  button: Some(button),
  wheel: Some(wheel),
  movementDelta,
  event: event->mouseDomEventToPointDomEvent,
}

let _bindDomEventToTriggerPointEvent = (
  (domEventName, customEventName, pointEventName),
  (onDomEventFunc, convertDomEventToPointEventFunc),
  state,
) =>
  onDomEventFunc(
    ~eventName=domEventName,
    ~handleFunc=(. mouseEvent, state) => {
      let (state, _) = ManageEventDoService.triggerCustomGlobalEvent(
        CreateCustomEventDoService.create(
          customEventName,
          convertDomEventToPointEventFunc(pointEventName, mouseEvent)->pointEventToUserData->Some,
        ),
        state,
      )

      state
    },
    ~state,
    (),
  )

let _bindMouseEventToTriggerPointEvent = (state, mouseEventName, customEventName, pointEventName) =>
  _bindDomEventToTriggerPointEvent(
    (mouseEventName, customEventName, pointEventName),
    (ManageEventDoService.onMouseEvent(~priority=0), _convertMouseEventToPointEvent),
    state,
  )

let _convertTouchEventToPointEvent = (
  eventName,
  {location, locationInView, touchData, movementDelta, event}: touchEvent,
) => {
  name: eventName,
  location,
  locationInView,
  button: None,
  wheel: None,
  movementDelta,
  event: event->touchDomEventToPointDomEvent,
}

let _bindTouchEventToTriggerPointEvent = (state, touchEventName, customEventName, pointEventName) =>
  _bindDomEventToTriggerPointEvent(
    (touchEventName, customEventName, pointEventName),
    (ManageEventDoService.onTouchEvent(~priority=0), _convertTouchEventToPointEvent),
    state,
  )

let bindDomEventToTriggerPointEvent = (
  stateForEventHandler,
  browser: Meta3dEventProtocol.BrowserType.browser,
) =>
  switch browser {
  | Chrome
  | Firefox
  | Unknown =>
    stateForEventHandler
    ->_bindMouseEventToTriggerPointEvent(Click, NameEventDoService.getPointTapEventName(), PointTap)
    ->_bindMouseEventToTriggerPointEvent(MouseUp, NameEventDoService.getPointUpEventName(), PointUp)
    ->_bindMouseEventToTriggerPointEvent(
      MouseDown,
      NameEventDoService.getPointDownEventName(),
      PointDown,
    )
    ->_bindMouseEventToTriggerPointEvent(
      MouseWheel,
      NameEventDoService.getPointScaleEventName(),
      PointScale,
    )
    ->_bindMouseEventToTriggerPointEvent(
      MouseMove,
      NameEventDoService.getPointMoveEventName(),
      PointMove,
    )
    ->_bindMouseEventToTriggerPointEvent(
      MouseDragStart,
      NameEventDoService.getPointDragStartEventName(),
      PointDragStart,
    )
    ->_bindMouseEventToTriggerPointEvent(
      MouseDragOver,
      NameEventDoService.getPointDragOverEventName(),
      PointDragOver,
    )
    ->_bindMouseEventToTriggerPointEvent(
      MouseDragDrop,
      NameEventDoService.getPointDragDropEventName(),
      PointDragDrop,
    )
  | Android
  | IOS =>
    stateForEventHandler
    ->_bindTouchEventToTriggerPointEvent(
      TouchTap,
      NameEventDoService.getPointTapEventName(),
      PointTap,
    )
    ->_bindTouchEventToTriggerPointEvent(
      TouchEnd,
      NameEventDoService.getPointUpEventName(),
      PointUp,
    )
    ->_bindTouchEventToTriggerPointEvent(
      TouchStart,
      NameEventDoService.getPointDownEventName(),
      PointDown,
    )
    ->_bindTouchEventToTriggerPointEvent(
      TouchMove,
      NameEventDoService.getPointMoveEventName(),
      PointMove,
    )
    ->_bindTouchEventToTriggerPointEvent(
      TouchDragStart,
      NameEventDoService.getPointDragStartEventName(),
      PointDragStart,
    )
    ->_bindTouchEventToTriggerPointEvent(
      TouchDragOver,
      NameEventDoService.getPointDragOverEventName(),
      PointDragOver,
    )
    ->_bindTouchEventToTriggerPointEvent(
      TouchDragDrop,
      NameEventDoService.getPointDragDropEventName(),
      PointDragDrop,
    )
  // | browser =>
  //   Meta3dLog.Log.fatal(
  //     Meta3dLog.Log.buildFatalMessage(
  //       ~title="bindDomEventToTriggerPointEvent",
  //       ~description=j`unknown browser`,
  //       ~reason="",
  //       ~solution=j``,
  //       ~params=j`browser:$browser`,
  //     ),
  //   )
  }

let _preventContextMenuEvent = event => {
  HandleDomEventDoService.preventDefault(
    event->Meta3dEventProtocol.EventType.eventTargetToDomEvent,
  )->ignore

  ()
}

let _execMouseEventHandle = (eventName, event, eventExtensionProtocolName) => {
  let state = ContainerManager.getState(eventExtensionProtocolName)

  state
  ->HandleMouseEventDoService.execEventHandle(
    event
    ->eventTargetToMouseDomEvent
    ->HandleMouseEventDoService.convertMouseDomEventToMouseEvent(eventName, _, state),
  )
  ->ContainerManager.setState(eventExtensionProtocolName)

  ()
}

let _execMouseChangePositionEventHandle = (
  mouseEventName,
  eventExtensionProtocolName,
  event,
  setPositionFunc,
) => {
  let state = ContainerManager.getState(eventExtensionProtocolName)

  let mouseEvent =
    event
    ->eventTargetToMouseDomEvent
    ->HandleMouseEventDoService.convertMouseDomEventToMouseEvent(mouseEventName, _, state)

  state
  ->HandleMouseEventDoService.execEventHandle(mouseEvent)
  ->setPositionFunc(mouseEvent)
  ->ContainerManager.setState(eventExtensionProtocolName)

  ()
}

let _execMouseMoveEventHandle = (mouseEventName, event, eventExtensionProtocolName) =>
  _execMouseChangePositionEventHandle(
    mouseEventName,
    eventExtensionProtocolName,
    event,
    HandleMouseEventDoService.setLastXYWhenMouseMove,
  )

let _execMouseDragingEventHandle = (mouseEventName, event, eventExtensionProtocolName) =>
  _execMouseChangePositionEventHandle(
    mouseEventName,
    eventExtensionProtocolName,
    event,
    HandleMouseEventDoService.setLastXYByLocation,
  )

let _execMouseDragStartEventHandle = (event, eventExtensionProtocolName) => {
  let state = ContainerManager.getState(eventExtensionProtocolName)

  state
  ->HandleMouseEventDoService.execEventHandle(
    event
    ->eventTargetToMouseDomEvent
    ->HandleMouseEventDoService.convertMouseDomEventToMouseEvent(MouseDragStart, _, state),
  )
  ->HandleMouseEventDoService.setIsDrag(true)
  ->HandleMouseEventDoService.setLastXY(None, None)
  ->ContainerManager.setState(eventExtensionProtocolName)

  ()
}

let _execMouseDragDropEventHandle = (event, eventExtensionProtocolName) => {
  let state = ContainerManager.getState(eventExtensionProtocolName)

  state
  ->HandleMouseEventDoService.execEventHandle(
    event
    ->eventTargetToMouseDomEvent
    ->HandleMouseEventDoService.convertMouseDomEventToMouseEvent(MouseDragDrop, _, state),
  )
  ->HandleMouseEventDoService.setIsDrag(false)
  ->ContainerManager.setState(eventExtensionProtocolName)

  ()
}

let _execTouchEventHandle = (touchEventName, event, eventExtensionProtocolName) => {
  ContainerManager.getState(eventExtensionProtocolName)
  ->HandleTouchEventDoService.execEventHandle(touchEventName, event->eventTargetToTouchDomEvent)
  ->ContainerManager.setState(eventExtensionProtocolName)

  ()
}

let _execTouchChangePositionEventHandle = (
  touchEventName,
  eventExtensionProtocolName,
  event,
  setPositonFunc,
) => {
  ContainerManager.getState(eventExtensionProtocolName)
  ->HandleTouchEventDoService.execEventHandle(touchEventName, event->eventTargetToTouchDomEvent)
  ->setPositonFunc(touchEventName, event->eventTargetToTouchDomEvent)
  ->ContainerManager.setState(eventExtensionProtocolName)

  ()
}

let _execTouchMoveEventHandle = (touchEventName, event, eventExtensionProtocolName) =>
  _execTouchChangePositionEventHandle(
    touchEventName,
    eventExtensionProtocolName,
    event,
    HandleTouchEventDoService.setLastXYWhenTouchMove,
  )

let _execTouchDragingEventHandle = (touchEventName, event, eventExtensionProtocolName) =>
  _execTouchChangePositionEventHandle(
    touchEventName,
    eventExtensionProtocolName,
    event,
    HandleTouchEventDoService.setLastXYByLocation,
  )

let _execTouchDragStartEventHandle = (event, eventExtensionProtocolName) => {
  ContainerManager.getState(eventExtensionProtocolName)
  ->HandleTouchEventDoService.execEventHandle(TouchDragStart, event->eventTargetToTouchDomEvent)
  ->HandleTouchEventDoService.setIsDrag(true)
  ->HandleTouchEventDoService.setLastXY(None, None)
  ->ContainerManager.setState(eventExtensionProtocolName)

  ()
}

let _execTouchDragDropEventHandle = (event, eventExtensionProtocolName) => {
  ContainerManager.getState(eventExtensionProtocolName)
  ->HandleTouchEventDoService.execEventHandle(TouchDragDrop, event->eventTargetToTouchDomEvent)
  ->HandleTouchEventDoService.setIsDrag(false)
  ->ContainerManager.setState(eventExtensionProtocolName)

  ()
}

let _execKeyboardEventHandle = (keyboardEventName, event, eventExtensionProtocolName) => {
  ContainerManager.getState(eventExtensionProtocolName)
  ->HandleKeyboardEventDoService.execEventHandle(
    keyboardEventName,
    event->eventTargetToKeyboardDomEvent,
  )
  ->ContainerManager.setState(eventExtensionProtocolName)

  ()
}

let _fromPCDomEventArr = (state, eventExtensionProtocolName) => [
  Meta3dBsMostDefault.Most.fromEvent(
    "contextmenu",
    _getBody(state),
    false,
  )->Meta3dBsMostDefault.Most.tap(event => _preventContextMenuEvent(event), _),
  _fromPointDomEvent("click", state)->Meta3dBsMostDefault.Most.tap(
    event => _execMouseEventHandle(Click, event, eventExtensionProtocolName),
    _,
  ),
  _fromPointDomEvent("mousedown", state)->Meta3dBsMostDefault.Most.tap(
    event => _execMouseEventHandle(MouseDown, event, eventExtensionProtocolName),
    _,
  ),
  _fromPointDomEvent("mouseup", state)->Meta3dBsMostDefault.Most.tap(
    event => _execMouseEventHandle(MouseUp, event, eventExtensionProtocolName),
    _,
  ),
  _fromPointDomEvent("mousemove", state)->Meta3dBsMostDefault.Most.tap(
    event => _execMouseMoveEventHandle(MouseMove, event, eventExtensionProtocolName),
    _,
  ),
  // _fromPointDomEvent("mousewheel", state)->Meta3dBsMostDefault.Most.tap(
  _fromPointDomEvent("wheel", state)->Meta3dBsMostDefault.Most.tap(
    event => _execMouseEventHandle(MouseWheel, event, eventExtensionProtocolName),
    _,
  ),
  _fromPointDomEvent("mousedown", state)
  ->Meta3dBsMostDefault.Most.tap(
    event => _execMouseDragStartEventHandle(event, eventExtensionProtocolName),
    _,
  )
  ->Meta3dBsMostDefault.Most.flatMap(
    event =>
      _fromPointDomEvent("mousemove", state)
      ->Meta3dBsMostDefault.Most.skip(2, _)
      ->Meta3dBsMostDefault.Most.until(
        _fromPointDomEvent("mouseup", state)->Meta3dBsMostDefault.Most.tap(
          event => _execMouseDragDropEventHandle(event, eventExtensionProtocolName),
          _,
        ),
        _,
      ),
    /* !
         fix chrome bug for getMovementDeltaWhenPointerLocked:
         the first movementDelta->x >100!
 */

    _,
  )
  ->Meta3dBsMostDefault.Most.tap(
    event => _execMouseDragingEventHandle(MouseDragOver, event, eventExtensionProtocolName),
    _,
  ),
  _fromKeyboardDomEvent("keyup", state)->Meta3dBsMostDefault.Most.tap(
    event => _execKeyboardEventHandle(KeyUp, event, eventExtensionProtocolName),
    _,
  ),
  _fromKeyboardDomEvent("keydown", state)->Meta3dBsMostDefault.Most.tap(
    event => _execKeyboardEventHandle(KeyDown, event, eventExtensionProtocolName),
    _,
  ),
  _fromKeyboardDomEvent("keypress", state)->Meta3dBsMostDefault.Most.tap(
    event => _execKeyboardEventHandle(KeyPress, event, eventExtensionProtocolName),
    _,
  ),
]

let _fromMobileDomEventArr = (state, eventExtensionProtocolName) => [
  _fromMobilePointDomEvent("touchend", state)
  ->Meta3dBsMostDefault.Most.since(_fromMobilePointDomEvent("touchstart", state), _)
  ->Meta3dBsMostDefault.Most.tap(
    event => _execTouchEventHandle(TouchTap, event, eventExtensionProtocolName),
    _,
  ),
  _fromMobilePointDomEvent("touchend", state)->Meta3dBsMostDefault.Most.tap(
    event => _execTouchEventHandle(TouchEnd, event, eventExtensionProtocolName),
    _,
  ),
  _fromMobilePointDomEvent("touchstart", state)->Meta3dBsMostDefault.Most.tap(
    event => _execTouchEventHandle(TouchStart, event, eventExtensionProtocolName),
    _,
  ),
  _fromTouchMoveDomEventAndPreventnDefault(state)->Meta3dBsMostDefault.Most.tap(
    event => _execTouchMoveEventHandle(TouchMove, event, eventExtensionProtocolName),
    _,
  ),
  _fromMobilePointDomEvent("touchstart", state)
  ->Meta3dBsMostDefault.Most.tap(
    event => _execTouchDragStartEventHandle(event, eventExtensionProtocolName),
    _,
  )
  ->Meta3dBsMostDefault.Most.flatMap(
    event =>
      _fromTouchMoveDomEventAndPreventnDefault(state)->Meta3dBsMostDefault.Most.until(
        _fromMobilePointDomEvent("touchend", state)->Meta3dBsMostDefault.Most.tap(
          event => _execTouchDragDropEventHandle(event, eventExtensionProtocolName),
          _,
        ),
        _,
      ),
    _,
  )
  ->Meta3dBsMostDefault.Most.tap(
    event => _execTouchDragingEventHandle(TouchDragOver, event, eventExtensionProtocolName),
    _,
  ),
]

let fromDomEvent = (state, eventExtensionProtocolName) =>
  Meta3dBsMostDefault.Most.mergeArray(
    switch BrowserDoService.getBrowser(state) {
    | Android
    | IOS =>
      _fromMobileDomEventArr(state, eventExtensionProtocolName)
    | Chrome
    | Firefox
    | Unknown =>
      _fromPCDomEventArr(state, eventExtensionProtocolName)
    // | browser =>
    //   Meta3dLog.Log.fatal(
    //     Meta3dLog.Log.buildFatalMessage(
    //       ~title="fromDomEvent",
    //       ~description=j`unknown browser`,
    //       ~reason="",
    //       ~solution=j``,
    //       ~params=j`browser:$browser`,
    //     ),
    //   )
    },
  )

let handleDomEventStreamError = e => {
  Meta3dCommonlib.Log.logForDebug(e)
}

let initEvent = (state, eventExtensionProtocolName) => {
  let domEventStreamSubscription = fromDomEvent(
    state,
    eventExtensionProtocolName,
  )->Meta3dBsMostDefault.Most.subscribe(
    {
      "next": _ => (),
      "error": e => handleDomEventStreamError(e),
      "complete": () => (),
    },
    _,
  )

  let state = state->ManageEventDoService.setDomEventStreamSubscription(domEventStreamSubscription)

  ContainerManager.getState(eventExtensionProtocolName)
  ->bindDomEventToTriggerPointEvent(BrowserDoService.getBrowser(state))
  ->ContainerManager.setState(eventExtensionProtocolName)

  state
}
