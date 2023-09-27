


function getLastXY(param) {
  var mouseEventData = param.mouseEventData;
  return [
          mouseEventData.lastX,
          mouseEventData.lastY
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
          mouseEventData: {
            lastX: lastX,
            lastY: lastY,
            isDrag: eventData.mouseEventData.isDrag
          },
          keyboardEventData: eventData.keyboardEventData,
          touchEventData: eventData.touchEventData
        };
}

export {
  getLastXY ,
  setLastXY ,
}
/* No side effect */
