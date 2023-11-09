open EventManagerStateType

open Meta3dEventProtocol.EventType

let _addToEventArr = (eventName, eventData, eventArrMap) =>
  BindDomEventDoService.addToEventArr(
    eventName,
    eventData,
    ({priority}: mouseDomEventData) => priority,
    eventArrMap,
  )

let _removeFromEventArrMapByHandleFunc = (eventName, targetHandleFunc, eventArrMap) =>
  BindDomEventDoService.removeFromEventArrMapByHandleFunc(
    eventName,
    (({handleFunc}: mouseDomEventData) => handleFunc, targetHandleFunc),
    eventArrMap,
  )

let bind = (eventName, priority, handleFunc, {eventData} as state) => {
  let {mouseDomEventDataArrMap} = eventData

  {
    ...state,
    eventData: {
      ...eventData,
      mouseDomEventDataArrMap: _addToEventArr(
        eventName -> domEventNameToInt,
        {priority: priority, handleFunc: handleFunc},
        mouseDomEventDataArrMap,
      ),
    },
  }
}

let unbindByHandleFunc = (eventName, handleFunc, {eventData} as state) => {
  let {mouseDomEventDataArrMap} = eventData

  {
    ...state,
    eventData: {
      ...eventData,
      mouseDomEventDataArrMap: _removeFromEventArrMapByHandleFunc(
        eventName -> domEventNameToInt,
        handleFunc,
        mouseDomEventDataArrMap,
      ),
    },
  }
}
