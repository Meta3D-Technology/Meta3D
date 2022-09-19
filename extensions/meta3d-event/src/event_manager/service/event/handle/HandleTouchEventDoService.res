open EventManagerStateType

open EventType

let _getTouchData = touchDomEvent => {
  let changedTouches = touchDomEvent["changedTouches"]
  let touchDataJsObj = Array.unsafe_get(changedTouches, 0)

  {
    clientX: touchDataJsObj["clientX"],
    clientY: touchDataJsObj["clientY"],
    pageX: touchDataJsObj["pageX"],
    pageY: touchDataJsObj["pageY"],
    identifier: touchDataJsObj["identifier"],
    screenX: touchDataJsObj["screenX"],
    screenY: touchDataJsObj["screenY"],
    radiusX: touchDataJsObj["radiusX"],
    radiusY: touchDataJsObj["radiusY"],
    rotationAngle: touchDataJsObj["rotationAngle"],
    force: touchDataJsObj["force"],
  }
}

let _getLocation = (touchDomEvent, state) => {
  let {pageX, pageY} = _getTouchData(touchDomEvent)

  (pageX, pageY)
}

let _getLocationInView = (touchDomEvent, state) =>
  HandlePointDomEventDoService.getLocationInView(touchDomEvent, _getLocation, state)

let _getMovementDelta = (touchDomEvent, {eventData} as state) =>
  HandlePointDomEventDoService.getMovementDelta(
    _getLocation(touchDomEvent, state),
    TouchEventDoService.getLastXY(eventData),
    state,
  )

let _convertTouchDomEventToTouchEvent = (eventName, touchDomEvent, state): touchEvent => {
  name: eventName,
  location: _getLocation(touchDomEvent, state),
  locationInView: _getLocationInView(touchDomEvent, state),
  touchData: _getTouchData(touchDomEvent),
  movementDelta: _getMovementDelta(touchDomEvent, state),
  event: touchDomEvent,
}

let execEventHandle = ({eventData} as state, eventName, touchDomEvent) => {
  let {touchDomEventDataArrMap} = eventData

  /* HandlePointDomEventDoService.preventDefault(
    touchDomEvent -> touchDomEventToPointDomEvent,
  ); */

  switch touchDomEventDataArrMap->Meta3dCommonlib.MutableSparseMap.get(eventName->domEventNameToInt) {
  | None => state
  | Some(arr) =>
    arr->Meta3dCommonlib.ArraySt.reduceOneParam(
      (. state, {handleFunc}: touchDomEventData) =>
        handleFunc(. _convertTouchDomEventToTouchEvent(eventName, touchDomEvent, state), state),
      state,
    )
  }
}

let setLastXY = ({eventData} as state, lastX, lastY) => {
  ...state,
  eventData: TouchEventDoService.setLastXY(lastX, lastY, eventData),
}

let setLastXYByLocation = ({eventData} as state, eventName, touchDomEvent) => {
  let {location}: touchEvent = _convertTouchDomEventToTouchEvent(eventName, touchDomEvent, state)

  let (x, y) = location

  setLastXY(state, Some(x), Some(y))
}

let getIsDrag = ({eventData} as state) => eventData.touchEventData.isDrag

let setIsDrag = ({eventData} as state, isDrag) => {
  ...state,
  eventData: {
    ...eventData,
    touchEventData: {
      ...eventData.touchEventData,
      isDrag: isDrag,
    },
  },
}

let setLastXYWhenTouchMove = (state, eventName, touchDomEvent) =>
  getIsDrag(state) ? state : setLastXYByLocation(state, eventName, touchDomEvent)
