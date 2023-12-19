open EventManagerStateType

// open AllBrowserDetectType

open Meta3dEventProtocol.EventType

// let getLocation = (mouseDomEvent, {browserDetectRecord}) => {
let getLocation = (mouseDomEvent, state) => {
  // let {browser} = browserDetectRecord

  // switch browser {
  // | Chrome
  // | Firefox => (mouseDomEvent["pageX"], mouseDomEvent["pageY"])
  // | _ => RecordAllBrowserDetectService.fatalUnknownBrowser("getLocation", browser)
  // }
  (mouseDomEvent["pageX"], mouseDomEvent["pageY"])
}

let getLocationInView = (mouseDomEvent, state) =>
  HandlePointDomEventDoService.getLocationInView(mouseDomEvent, getLocation, state)

let getButton = (mouseDomEvent, state) => {
  // let {browser} = browserDetectRecord

  // switch browser {
  // | Chrome
  // | Firefox =>
  //   switch mouseDomEvent["which"] {
  //   | 0 => NoButton
  //   | 1 => Left
  //   | 2 => Center
  //   | 3 => Right
  //   // | button =>
  //   //   Meta3dLog.Log.fatal(
  //   //     Meta3dLog.Log.buildFatalMessage(
  //   //       ~title="getButton",
  //   //       ~description=j`not support multi mouse button`,
  //   //       ~reason="",
  //   //       ~solution=j``,
  //   //       ~params=j`button: $button`,
  //   //     ),
  //   //   )
  //   }
  // | _ => RecordAllBrowserDetectService.fatalUnknownBrowser("getButton", browser)
  // }

  switch mouseDomEvent["which"] {
  | 0 => NoButton
  | 1 => Left
  | 2 => Center
  | 3 => Right
  // | button =>
  //   Meta3dLog.Log.fatal(
  //     Meta3dLog.Log.buildFatalMessage(
  //       ~title="getButton",
  //       ~description=j`not support multi mouse button`,
  //       ~reason="",
  //       ~solution=j``,
  //       ~params=j`button: $button`,
  //     ),
  //   )
  }
}

let _getFromDeltaY = mouseDomEvent =>
  switch Js.toOption(mouseDomEvent["deltaY"]) {
  | Some(data) => data / -100
  | None => 0
  }

let _getFromWheelDelta = mouseDomEvent =>
  switch Js.toOption(mouseDomEvent["wheelDelta"]) {
  | Some(wheelData) => wheelData / 120
  | None => _getFromDeltaY(mouseDomEvent)
  }

let getWheel = mouseDomEvent =>
  switch Js.toOption(mouseDomEvent["detail"]) {
  | Some(detail) if detail !== 0 => -1 * detail
  | _ => _getFromWheelDelta(mouseDomEvent)
  }

let _isPointerLocked = %raw(`
  function() {
  return !!(
    document.pointerLockElement
    || document.mozPointerLockElement
    || document.webkitPointerLockElement
  );
  }
    `)

let _getMovementDeltaWhenPointerLocked = mouseDomEvent => (
  switch Js.toOption(mouseDomEvent["movementX"]) {
  | Some(movementX) => movementX
  | None =>
    switch Js.toOption(mouseDomEvent["webkitMovementX"]) {
    | Some(webkitMovementX) => webkitMovementX
    | None =>
      switch Js.toOption(mouseDomEvent["mozMovementX"]) {
      | Some(mozMovementX) => mozMovementX
      | None => 0
      }
    }
  },
  switch Js.toOption(mouseDomEvent["movementY"]) {
  | Some(movementY) => movementY
  | None =>
    switch Js.toOption(mouseDomEvent["webkitMovementY"]) {
    | Some(webkitMovementY) => webkitMovementY
    | None =>
      switch Js.toOption(mouseDomEvent["mozMovementY"]) {
      | Some(mozMovementY) => mozMovementY
      | None => 0
      }
    }
  },
)

let getMovementDelta = (mouseDomEvent, {eventData} as state) =>
  _isPointerLocked(.)
    ? _getMovementDeltaWhenPointerLocked(mouseDomEvent)
    : HandlePointDomEventDoService.getMovementDelta(
        getLocation(mouseDomEvent, state),
        MouseEventDoService.getLastXY(eventData),
        state,
      )

let convertMouseDomEventToMouseEvent = (eventName, mouseDomEvent, state): mouseEvent => {
  name: eventName,
  location: getLocation(mouseDomEvent, state),
  locationInView: getLocationInView(mouseDomEvent, state),
  button: getButton(mouseDomEvent, state),
  wheel: getWheel(mouseDomEvent),
  movementDelta: getMovementDelta(mouseDomEvent, state),
  event: mouseDomEvent,
}

let execEventHandle = ({eventData} as state, mouseEvent: mouseEvent) => {
  let {name} = mouseEvent

  let {mouseDomEventDataArrMap} = eventData

  switch mouseDomEventDataArrMap->Meta3dCommonlib.MutableSparseMap.get(name->domEventNameToInt) {
  | None => state
  | Some(arr) =>
    arr->Meta3dCommonlib.ArraySt.reduceOneParam((. state, {handleFunc}: mouseDomEventData) =>
      handleFunc(.
        /* convertMouseDomEventToMouseEvent(
                  eventName,
                  mouseDomEvent,
                  state,
                ), */
        mouseEvent,
        state,
      )
    , state)
  }
}

let setLastXY = ({eventData} as state, lastX, lastY) => {
  ...state,
  eventData: MouseEventDoService.setLastXY(lastX, lastY, eventData),
}

let setLastXYByLocation = ({eventData} as state, mouseEvent) => {
  let {location}: mouseEvent = mouseEvent

  let (x, y) = location

  setLastXY(state, Some(x), Some(y))
}

let getIsDrag = ({eventData} as state) => eventData.mouseEventData.isDrag

let setIsDrag = ({eventData} as state, isDrag) => {
  ...state,
  eventData: {
    ...eventData,
    mouseEventData: {
      ...eventData.mouseEventData,
      isDrag,
    },
  },
}

let setLastXYWhenMouseMove = (state, mouseEvent) =>
  getIsDrag(state) ? state : setLastXYByLocation(state, mouseEvent)
