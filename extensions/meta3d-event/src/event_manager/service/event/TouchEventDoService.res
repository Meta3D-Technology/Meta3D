open EventManagerStateType

open EventType

let getLastXY = ({touchEventData}) => (touchEventData.lastX, touchEventData.lastY)

let setLastXY = (lastX, lastY, {touchEventData} as eventData) => {
  ...eventData,
  touchEventData: {
    ...touchEventData,
    lastX: lastX,
    lastY: lastY,
  },
}
