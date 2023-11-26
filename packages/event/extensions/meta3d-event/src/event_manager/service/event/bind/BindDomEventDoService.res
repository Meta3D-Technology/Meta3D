let addToEventArr = (eventName, eventData, getPriorityFunc, eventArrMap) =>
  switch eventArrMap->Meta3dCommonlib.MutableSparseMap.get(eventName) {
  | None => eventArrMap->Meta3dCommonlib.MutableSparseMap.set(eventName, [eventData])
  | Some(arr) =>
    eventArrMap->Meta3dCommonlib.MutableSparseMap.set(
      eventName,
      arr
      ->Meta3dCommonlib.ArraySt.push(eventData)
      ->Js.Array.sortInPlaceWith(
        (eventDataA, eventDataB) => getPriorityFunc(eventDataB) - getPriorityFunc(eventDataA),
        _,
      ),
    )
  }

let removeFromEventArrMapByHandleFunc = (
  eventName,
  (getHandleFuncFunc, targetHandleFunc),
  eventArrMap,
) =>
  switch eventArrMap->Meta3dCommonlib.MutableSparseMap.get(eventName) {
  | None => eventArrMap
  | Some(arr) =>
    eventArrMap->Meta3dCommonlib.MutableSparseMap.set(
      eventName,
      arr->Js.Array.filter(domEventData => getHandleFuncFunc(domEventData) !== targetHandleFunc, _),
    )
  }
