'use strict';


function setChrome(state) {
  return {
          eventData: state.eventData,
          canvas: state.canvas,
          body: state.body,
          browser: /* Chrome */0
        };
}

function setFirefox(state) {
  return {
          eventData: state.eventData,
          canvas: state.canvas,
          body: state.body,
          browser: /* Firefox */1
        };
}

function setAndroid(state) {
  return {
          eventData: state.eventData,
          canvas: state.canvas,
          body: state.body,
          browser: /* Android */2
        };
}

function setIOS(state) {
  return {
          eventData: state.eventData,
          canvas: state.canvas,
          body: state.body,
          browser: /* IOS */3
        };
}

function setUnknown(state) {
  return {
          eventData: state.eventData,
          canvas: state.canvas,
          body: state.body,
          browser: /* Unknown */4
        };
}

exports.setChrome = setChrome;
exports.setFirefox = setFirefox;
exports.setAndroid = setAndroid;
exports.setIOS = setIOS;
exports.setUnknown = setUnknown;
/* No side effect */
