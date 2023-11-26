open EventManagerStateType

open Meta3dEventProtocol.EventType

let _addToEventArr = (eventName, eventData, eventArrMap) =>
  BindDomEventDoService.addToEventArr(
    eventName,
    eventData,
    ({priority}: touchDomEventData) => priority,
    eventArrMap,
  )

let _removeFromEventArrMapByHandleFunc = (eventName, targetHandleFunc, eventArrMap) =>
  BindDomEventDoService.removeFromEventArrMapByHandleFunc(
    eventName,
    (({handleFunc}: touchDomEventData) => handleFunc, targetHandleFunc),
    eventArrMap,
  )

let bind = (eventName, priority, handleFunc, {eventData} as state) => {
  let {touchDomEventDataArrMap} = eventData

  {
    ...state,
    eventData: {
      ...eventData,
      touchDomEventDataArrMap: _addToEventArr(
        eventName -> domEventNameToInt,
        {priority: priority, handleFunc: handleFunc},
        touchDomEventDataArrMap,
      ),
    },
  }
}

let unbindByHandleFunc = (eventName, handleFunc, {eventData} as state) => {
  let {touchDomEventDataArrMap} = eventData

  {
    ...state,
    eventData: {
      ...eventData,
      touchDomEventDataArrMap: _removeFromEventArrMapByHandleFunc(
        eventName -> domEventNameToInt,
        handleFunc,
        touchDomEventDataArrMap,
      ),
    },
  }
}
