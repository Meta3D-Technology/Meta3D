open EventManagerStateType

let getLocationInView = (domEvent, getLocationFunc, state) =>
  switch CanvasDoService.getCanvas(state) {
  | None => (0, 0)
  | Some(canvas) =>
    let (offsetX, offsetY) = CanvasDoService.getOffset(canvas)

    let (x, y) = getLocationFunc(domEvent, state)

    (x - offsetX, y - offsetY)
  }

let getMovementDelta = (location, lastXYTuple, {eventData} as state) => {
  let (x, y) = location

  switch lastXYTuple {
  | (None, None) => (0, 0)
  | (Some(lastX), Some(lastY)) => (x - lastX, y - lastY)
  // | _ =>
  //   Meta3dLog.Log.fatal(
  //     Meta3dLog.Log.buildFatalMessage(
  //       ~title="getMovementDelta",
  //       ~description=j`lastX, lastY should all be None or all be Some`,
  //       ~reason="",
  //       ~solution=j``,
  //       ~params=j``,
  //     ),
  //   )
  }
}

let preventDefault = event =>
  HandleDomEventDoService.preventDefault(event->EventType.pointDomEventToDomEvent)
