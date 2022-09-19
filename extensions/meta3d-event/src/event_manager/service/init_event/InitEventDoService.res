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
  Meta3dBsMost.Most.fromEvent(eventName, _getBody(state), false)

let _fromMobilePointDomEvent = (eventName, state) => {
  Meta3dBsMost.Most.fromEvent(eventName, _getBody(state), {"passive": false}->Obj.magic)
}

let _fromTouchMoveDomEventAndPreventnDefault = state =>
  _fromMobilePointDomEvent("touchmove", state)->Meta3dBsMost.Most.tap(
    event =>
      HandlePointDomEventDoService.preventDefault(
        event->eventTargetToTouchDomEvent->touchDomEventToPointDomEvent,
      ),
    _,
  )

let _fromKeyboardDomEvent = (eventName, state) =>
  Meta3dBsMost.Most.fromEvent(eventName, _getBody(state), false)

let _convertMouseEventToPointEvent = (
  eventName,
  {location, locationInView, button, wheel, movementDelta, event}: mouseEvent,
) => {
  name: eventName,
  location: location,
  locationInView: locationInView,
  button: Some(button),
  wheel: Some(wheel),
  movementDelta: movementDelta,
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
  location: location,
  locationInView: locationInView,
  button: None,
  wheel: None,
  movementDelta: movementDelta,
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
  | Firefox =>
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

let _execMouseEventHandle = (eventName, event, eventExtensionName) => {
  let state = ContainerManager.getState(eventExtensionName)

  state
  ->HandleMouseEventDoService.execEventHandle(
    event
    ->eventTargetToMouseDomEvent
    ->HandleMouseEventDoService.convertMouseDomEventToMouseEvent(eventName, _, state),
  )
  ->ContainerManager.setState(eventExtensionName)

  ()
}

let _execMouseChangePositionEventHandle = (
  mouseEventName,
  eventExtensionName,
  event,
  setPositionFunc,
) => {
  let state = ContainerManager.getState(eventExtensionName)

  let mouseEvent =
    event
    ->eventTargetToMouseDomEvent
    ->HandleMouseEventDoService.convertMouseDomEventToMouseEvent(mouseEventName, _, state)

  state
  ->HandleMouseEventDoService.execEventHandle(mouseEvent)
  ->setPositionFunc(mouseEvent)
  ->ContainerManager.setState(eventExtensionName)

  ()
}

let _execMouseMoveEventHandle = (mouseEventName, event, eventExtensionName) =>
  _execMouseChangePositionEventHandle(
    mouseEventName,
    eventExtensionName,
    event,
    HandleMouseEventDoService.setLastXYWhenMouseMove,
  )

let _execMouseDragingEventHandle = (mouseEventName, event, eventExtensionName) =>
  _execMouseChangePositionEventHandle(
    mouseEventName,
    eventExtensionName,
    event,
    HandleMouseEventDoService.setLastXYByLocation,
  )

let _execMouseDragStartEventHandle = (event, eventExtensionName) => {
  let state = ContainerManager.getState(eventExtensionName)

  state
  ->HandleMouseEventDoService.execEventHandle(
    event
    ->eventTargetToMouseDomEvent
    ->HandleMouseEventDoService.convertMouseDomEventToMouseEvent(MouseDragStart, _, state),
  )
  ->HandleMouseEventDoService.setIsDrag(true)
  ->HandleMouseEventDoService.setLastXY(None, None)
  ->ContainerManager.setState(eventExtensionName)

  ()
}

let _execMouseDragDropEventHandle = (event, eventExtensionName) => {
  let state = ContainerManager.getState(eventExtensionName)

  state
  ->HandleMouseEventDoService.execEventHandle(
    event
    ->eventTargetToMouseDomEvent
    ->HandleMouseEventDoService.convertMouseDomEventToMouseEvent(MouseDragDrop, _, state),
  )
  ->HandleMouseEventDoService.setIsDrag(false)
  ->ContainerManager.setState(eventExtensionName)

  ()
}

let _execTouchEventHandle = (touchEventName, event, eventExtensionName) => {
  ContainerManager.getState(eventExtensionName)
  ->HandleTouchEventDoService.execEventHandle(touchEventName, event->eventTargetToTouchDomEvent)
  ->ContainerManager.setState(eventExtensionName)

  ()
}

let _execTouchChangePositionEventHandle = (
  touchEventName,
  eventExtensionName,
  event,
  setPositonFunc,
) => {
  ContainerManager.getState(eventExtensionName)
  ->HandleTouchEventDoService.execEventHandle(touchEventName, event->eventTargetToTouchDomEvent)
  ->setPositonFunc(touchEventName, event->eventTargetToTouchDomEvent)
  ->ContainerManager.setState(eventExtensionName)

  ()
}

let _execTouchMoveEventHandle = (touchEventName, event, eventExtensionName) =>
  _execTouchChangePositionEventHandle(
    touchEventName,
    eventExtensionName,
    event,
    HandleTouchEventDoService.setLastXYWhenTouchMove,
  )

let _execTouchDragingEventHandle = (touchEventName, event, eventExtensionName) =>
  _execTouchChangePositionEventHandle(
    touchEventName,
    eventExtensionName,
    event,
    HandleTouchEventDoService.setLastXYByLocation,
  )

let _execTouchDragStartEventHandle = (event, eventExtensionName) => {
  ContainerManager.getState(eventExtensionName)
  ->HandleTouchEventDoService.execEventHandle(TouchDragStart, event->eventTargetToTouchDomEvent)
  ->HandleTouchEventDoService.setIsDrag(true)
  ->HandleTouchEventDoService.setLastXY(None, None)
  ->ContainerManager.setState(eventExtensionName)

  ()
}

let _execTouchDragDropEventHandle = (event, eventExtensionName) => {
  ContainerManager.getState(eventExtensionName)
  ->HandleTouchEventDoService.execEventHandle(TouchDragDrop, event->eventTargetToTouchDomEvent)
  ->HandleTouchEventDoService.setIsDrag(false)
  ->ContainerManager.setState(eventExtensionName)

  ()
}

let _execKeyboardEventHandle = (keyboardEventName, event, eventExtensionName) => {
  ContainerManager.getState(eventExtensionName)
  ->HandleKeyboardEventDoService.execEventHandle(
    keyboardEventName,
    event->eventTargetToKeyboardDomEvent,
  )
  ->ContainerManager.setState(eventExtensionName)

  ()
}

let _fromPCDomEventArr = (state, eventExtensionName) => [
  Meta3dBsMost.Most.fromEvent("contextmenu", _getBody(state), false)->Meta3dBsMost.Most.tap(
    event => _preventContextMenuEvent(event),
    _,
  ),
  _fromPointDomEvent("click", state)->Meta3dBsMost.Most.tap(
    event => _execMouseEventHandle(Click, event, eventExtensionName),
    _,
  ),
  _fromPointDomEvent("mousedown", state)->Meta3dBsMost.Most.tap(
    event => _execMouseEventHandle(MouseDown, event, eventExtensionName),
    _,
  ),
  _fromPointDomEvent("mouseup", state)->Meta3dBsMost.Most.tap(
    event => _execMouseEventHandle(MouseUp, event, eventExtensionName),
    _,
  ),
  _fromPointDomEvent("mousemove", state)->Meta3dBsMost.Most.tap(
    event => _execMouseMoveEventHandle(MouseMove, event, eventExtensionName),
    _,
  ),
  _fromPointDomEvent("mousewheel", state)->Meta3dBsMost.Most.tap(
    event => _execMouseEventHandle(MouseWheel, event, eventExtensionName),
    _,
  ),
  _fromPointDomEvent("mousedown", state)
  ->Meta3dBsMost.Most.tap(event => _execMouseDragStartEventHandle(event, eventExtensionName), _)
  ->Meta3dBsMost.Most.flatMap(
    event =>
      _fromPointDomEvent("mousemove", state)
      ->Meta3dBsMost.Most.skip(2, _)
      ->Meta3dBsMost.Most.until(
        _fromPointDomEvent("mouseup", state)->Meta3dBsMost.Most.tap(
          event => _execMouseDragDropEventHandle(event, eventExtensionName),
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
  ->Meta3dBsMost.Most.tap(
    event => _execMouseDragingEventHandle(MouseDragOver, event, eventExtensionName),
    _,
  ),
  _fromKeyboardDomEvent("keyup", state)->Meta3dBsMost.Most.tap(
    event => _execKeyboardEventHandle(KeyUp, event, eventExtensionName),
    _,
  ),
  _fromKeyboardDomEvent("keydown", state)->Meta3dBsMost.Most.tap(
    event => _execKeyboardEventHandle(KeyDown, event, eventExtensionName),
    _,
  ),
  _fromKeyboardDomEvent("keypress", state)->Meta3dBsMost.Most.tap(
    event => _execKeyboardEventHandle(KeyPress, event, eventExtensionName),
    _,
  ),
]

let _fromMobileDomEventArr = (state, eventExtensionName) => [
  _fromMobilePointDomEvent("touchend", state)
  ->Meta3dBsMost.Most.since(_fromMobilePointDomEvent("touchstart", state), _)
  ->Meta3dBsMost.Most.tap(event => _execTouchEventHandle(TouchTap, event, eventExtensionName), _),
  _fromMobilePointDomEvent("touchend", state)->Meta3dBsMost.Most.tap(
    event => _execTouchEventHandle(TouchEnd, event, eventExtensionName),
    _,
  ),
  _fromMobilePointDomEvent("touchstart", state)->Meta3dBsMost.Most.tap(
    event => _execTouchEventHandle(TouchStart, event, eventExtensionName),
    _,
  ),
  _fromTouchMoveDomEventAndPreventnDefault(state)->Meta3dBsMost.Most.tap(
    event => _execTouchMoveEventHandle(TouchMove, event, eventExtensionName),
    _,
  ),
  _fromMobilePointDomEvent("touchstart", state)
  ->Meta3dBsMost.Most.tap(event => _execTouchDragStartEventHandle(event, eventExtensionName), _)
  ->Meta3dBsMost.Most.flatMap(
    event =>
      _fromTouchMoveDomEventAndPreventnDefault(state)->Meta3dBsMost.Most.until(
        _fromMobilePointDomEvent("touchend", state)->Meta3dBsMost.Most.tap(
          event => _execTouchDragDropEventHandle(event, eventExtensionName),
          _,
        ),
        _,
      ),
    _,
  )
  ->Meta3dBsMost.Most.tap(
    event => _execTouchDragingEventHandle(TouchDragOver, event, eventExtensionName),
    _,
  ),
]

let fromDomEvent = (state, eventExtensionName) =>
  Meta3dBsMost.Most.mergeArray(
    switch BrowserDoService.getBrowser(state) {
    | Chrome
    | Firefox =>
      _fromPCDomEventArr(state, eventExtensionName)
    | Android
    | IOS =>
      _fromMobileDomEventArr(state, eventExtensionName)
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

let initEvent = (state, eventExtensionName) => {
  let domEventStreamSubscription = fromDomEvent(
    state,
    eventExtensionName,
  )->Meta3dBsMost.Most.subscribe(
    {
      "next": _ => (),
      "error": e => handleDomEventStreamError(e),
      "complete": () => (),
    },
    _,
  )

  let state = state->ManageEventDoService.setDomEventStreamSubscription(domEventStreamSubscription)

  ContainerManager.getState(eventExtensionName)
  ->bindDomEventToTriggerPointEvent(BrowserDoService.getBrowser(state))
  ->ContainerManager.setState(eventExtensionName)

  state
}
