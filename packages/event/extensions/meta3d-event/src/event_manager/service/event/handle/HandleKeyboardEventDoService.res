open EventManagerStateType

open Meta3dEventProtocol.EventType

let _getKeyCode = keyboardDomEvent => keyboardDomEvent["keyCode"]

let _getShiftKey = keyboardDomEvent => keyboardDomEvent["shiftKey"]

let _getKeyFromSpecialKeyMap = (keyCode, char, specialKeyMap) =>
  switch specialKeyMap->Meta3dCommonlib.MutableSparseMap.get(keyCode) {
  | None => char
  | Some(key) => key
  }

let _handleShiftKey = (
  keyCode,
  char,
  (shiftKeyByKeyCodeMap, shiftKeyByCharCodeMap, specialKeyMap),
) =>
  switch shiftKeyByKeyCodeMap->Meta3dCommonlib.MutableSparseMap.get(keyCode) {
  | None =>
    switch shiftKeyByCharCodeMap->Meta3dCommonlib.MutableHashMap.get(char) {
    | None => _getKeyFromSpecialKeyMap(keyCode, char, specialKeyMap)
    | Some(upperCaseChar) => upperCaseChar
    }

  | Some(upperCaseChar) => upperCaseChar
  }

let _getKey = (keyboardDomEvent, {eventData}) => {
  let {keyboardEventData} = eventData
  let {specialKeyMap, shiftKeyByKeyCodeMap, shiftKeyByCharCodeMap} = keyboardEventData
  let keyCode = _getKeyCode(keyboardDomEvent)

  let char = Js.String.fromCharCode(keyCode)->Js.String.toLowerCase

  _getShiftKey(keyboardDomEvent)
    ? _handleShiftKey(keyCode, char, (shiftKeyByKeyCodeMap, shiftKeyByCharCodeMap, specialKeyMap))
    : _getKeyFromSpecialKeyMap(keyCode, char, specialKeyMap)
}

let _convertKeyboardDomEventToKeyboardEvent = (eventName, keyboardDomEvent, state): keyboardEvent => {
  name: eventName,
  ctrlKey: keyboardDomEvent["ctrlKey"],
  altKey: keyboardDomEvent["altKey"],
  shiftKey: _getShiftKey(keyboardDomEvent),
  metaKey: keyboardDomEvent["metaKey"],
  keyCode: _getKeyCode(keyboardDomEvent),
  key: _getKey(keyboardDomEvent, state),
  event: keyboardDomEvent,
}

let execEventHandle = ({eventData} as state, eventName, keyboardDomEvent) => {
  let {keyboardDomEventDataArrMap} = eventData

  switch keyboardDomEventDataArrMap->Meta3dCommonlib.MutableSparseMap.get(eventName->domEventNameToInt) {
  | None => state
  | Some(arr) =>
    arr->Meta3dCommonlib.ArraySt.reduceOneParam(
      (. state, {handleFunc}: keyboardDomEventData) =>
        handleFunc(. _convertKeyboardDomEventToKeyboardEvent(eventName, keyboardDomEvent, state), state),
      state,
    )
  }
}
