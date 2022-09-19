open EventManagerStateType;

open EventType

let _addToEventArr = (eventName, eventData, eventArrMap) =>
  BindDomEventDoService.addToEventArr(
    eventName,
    eventData,
    ({priority}: keyboardDomEventData) => priority,
    eventArrMap,
  )

let _removeFromEventArrMapByHandleFunc = (eventName, targetHandleFunc, eventArrMap) =>
  BindDomEventDoService.removeFromEventArrMapByHandleFunc(
    eventName,
    (({handleFunc}: keyboardDomEventData) => handleFunc, targetHandleFunc),
    eventArrMap,
  )

let bind = (eventName, priority, handleFunc, {eventData} as state) => {
  let {keyboardDomEventDataArrMap} = eventData

  {
    ...state,
    eventData: {
      ...eventData,
      keyboardDomEventDataArrMap: _addToEventArr(
        eventName -> domEventNameToInt,
        ({priority: priority, handleFunc: handleFunc}: keyboardDomEventData),
        keyboardDomEventDataArrMap,
      ),
    },
  }
}

let unbindByHandleFunc = (eventName, handleFunc, {eventData} as state) => {
  let {keyboardDomEventDataArrMap} = eventData

  {
    ...state,
    eventData: {
      ...eventData,
      keyboardDomEventDataArrMap: _removeFromEventArrMapByHandleFunc(
        eventName -> domEventNameToInt,
        handleFunc,
        keyboardDomEventDataArrMap,
      ),
    },
  }
}
