


function getLastXY(param) {
  var touchEventData = param.touchEventData;
  return [
          touchEventData.lastX,
          touchEventData.lastY
        ];
}

function setLastXY(lastX, lastY, eventData) {
  return {
          domEventStreamSubscription: eventData.domEventStreamSubscription,
          mouseDomEventDataArrMap: eventData.mouseDomEventDataArrMap,
          keyboardDomEventDataArrMap: eventData.keyboardDomEventDataArrMap,
          touchDomEventDataArrMap: eventData.touchDomEventDataArrMap,
          customGlobalEventArrMap: eventData.customGlobalEventArrMap,
          customGlobalEventArrMap2: eventData.customGlobalEventArrMap2,
          customGlobalEventArrMap3: eventData.customGlobalEventArrMap3,
          mouseEventData: eventData.mouseEventData,
          keyboardEventData: eventData.keyboardEventData,
          touchEventData: {
            lastX: lastX,
            lastY: lastY,
            isDrag: eventData.touchEventData.isDrag
          }
        };
}

export {
  getLastXY ,
  setLastXY ,
}
/* No side effect */
