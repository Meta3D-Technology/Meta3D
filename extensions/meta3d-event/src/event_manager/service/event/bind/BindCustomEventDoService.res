open EventManagerStateType

open Meta3dEventProtocol.EventType

let _addEventDataByPriority = (eventData, arr) =>
  arr
  ->Meta3dCommonlib.ArraySt.push(eventData)
  ->Js.Array.sortInPlaceWith(
    (eventDataA, eventDataB) => eventDataB.priority - eventDataA.priority,
    _,
  )

let _addToEventArr = (eventName, eventData, eventArrMap) =>
  switch eventArrMap->Meta3dCommonlib.MutableHashMap.get(eventName) {
  | None => eventArrMap->Meta3dCommonlib.MutableHashMap.set(eventName, [eventData])
  | Some(arr) => eventArrMap->Meta3dCommonlib.MutableHashMap.set(eventName, _addEventDataByPriority(eventData, arr))
  }

let bindGlobalEvent = (eventName, priority, handleFunc, {eventData} as state) => {
  let {customGlobalEventArrMap} = eventData

  {
    ...state,
    eventData: {
      ...eventData,
      customGlobalEventArrMap: _addToEventArr(
        eventName,
        {priority: priority, handleFunc: handleFunc},
        customGlobalEventArrMap,
      ),
    },
  }
}

let _removeFromEventArrByHandleFunc = (arr, targetHandleFunc) =>
  arr->Js.Array.filter(({handleFunc}) => handleFunc !== targetHandleFunc, _)

let _removeFromEventArrMapByHandleFunc = (eventName, handleFunc, eventArrMap) =>
  switch eventArrMap->Meta3dCommonlib.MutableHashMap.get(eventName) {
  | None => eventArrMap
  | Some(arr) =>
    eventArrMap->Meta3dCommonlib.MutableHashMap.set(eventName, _removeFromEventArrByHandleFunc(arr, handleFunc))
  }

let unbindGlobalEventByHandleFunc = (eventName, handleFunc, {eventData} as state) => {
  let {customGlobalEventArrMap} = eventData

  {
    ...state,
    eventData: {
      ...eventData,
      customGlobalEventArrMap: _removeFromEventArrMapByHandleFunc(
        eventName,
        handleFunc,
        customGlobalEventArrMap,
      ),
    },
  }
}

let _removeFromEventListMapByEventName = (eventName, eventArrMap) =>
  eventArrMap->Obj.magic->Meta3dCommonlib.MutableHashMap.deleteVal(eventName)->Obj.magic

let unbindGlobalEventByEventName = (eventName, {eventData} as state) => {
  let {customGlobalEventArrMap} = eventData

  {
    ...state,
    eventData: {
      ...eventData,
      customGlobalEventArrMap: _removeFromEventListMapByEventName(
        eventName,
        customGlobalEventArrMap,
      ),
    },
  }
}

// let bindGameObjectEvent = ((eventName, priority, target), handleFunc, {eventData} as state) => {
//   let {customGameObjectEventArrMap} = eventData

//   let eventData = {priority: priority, handleFunc: handleFunc}

//   {
//     ...state,
//     eventData: {
//       ...eventData,
//       customGameObjectEventArrMap: switch customGameObjectEventArrMap->Meta3dCommonlib.MutableHashMap.get(
//         eventName,
//       ) {
//       | None =>
//         customGameObjectEventArrMap->Meta3dCommonlib.MutableHashMap.set(
//           eventName,
//           Meta3dCommonlib.MutableSparseMap.createEmpty()->Meta3dCommonlib.MutableSparseMap.set(target, [eventData]),
//         )
//       | Some(targetEventArrMap) =>
//         switch targetEventArrMap->Meta3dCommonlib.MutableSparseMap.get(target) {
//         | None =>
//           customGameObjectEventArrMap->Meta3dCommonlib.MutableHashMap.set(
//             eventName,
//             targetEventArrMap->Meta3dCommonlib.MutableSparseMap.set(target, [eventData]),
//           )
//         | Some(arr) =>
//           customGameObjectEventArrMap->Meta3dCommonlib.MutableHashMap.set(
//             eventName,
//             targetEventArrMap->Meta3dCommonlib.MutableSparseMap.set(
//               target,
//               _addEventDataByPriority(eventData, arr),
//             ),
//           )
//         }
//       },
//     },
//   }
// }

// let unbindGameObjectEventByTarget = ((eventName, target), {eventData} as state) => {
//   let {customGameObjectEventArrMap} = eventData

//   {
//     ...state,
//     eventData: {
//       ...eventData,
//       customGameObjectEventArrMap: switch customGameObjectEventArrMap->Meta3dCommonlib.MutableHashMap.get(
//         eventName,
//       ) {
//       | None => customGameObjectEventArrMap
//       | Some(targetEventArrMap) =>
//         customGameObjectEventArrMap->Meta3dCommonlib.MutableHashMap.set(
//           eventName,
//           targetEventArrMap->Meta3dCommonlib.MutableSparseMap.deleteVal(target),
//         )
//       },
//     },
//   }
// }

// let unbindGameObjectEventByHandleFunc = ((eventName, target), handleFunc, {eventData} as state) => {
//   let {customGameObjectEventArrMap} = eventData

//   {
//     ...state,
//     eventData: {
//       ...eventData,
//       customGameObjectEventArrMap: switch customGameObjectEventArrMap->Meta3dCommonlib.MutableHashMap.get(
//         eventName,
//       ) {
//       | None => customGameObjectEventArrMap
//       | Some(targetEventArrMap) =>
//         switch targetEventArrMap->Meta3dCommonlib.MutableSparseMap.get(target) {
//         | None => customGameObjectEventArrMap
//         | Some(arr) =>
//           customGameObjectEventArrMap->Meta3dCommonlib.MutableHashMap.set(
//             eventName,
//             targetEventArrMap->Meta3dCommonlib.MutableSparseMap.set(
//               target,
//               _removeFromEventArrByHandleFunc(arr, handleFunc),
//             ),
//           )
//         }
//       },
//     },
//   }
// }
