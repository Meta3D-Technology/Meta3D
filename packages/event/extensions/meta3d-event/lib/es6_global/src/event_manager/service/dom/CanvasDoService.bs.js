

import * as Caml_option from "../../../../../../../../../../node_modules/rescript/lib/es6/caml_option.js";

function getCanvas(state) {
  return state.canvas;
}

function setCanvas(state, canvas) {
  return {
          eventData: state.eventData,
          canvas: Caml_option.some(canvas),
          body: state.body,
          browser: state.browser
        };
}

var getOffset = (function(canvas){
                var offset = [canvas.offsetLeft,  canvas.offsetTop];
                var offsetParent = canvas;

            while (offsetParent = offsetParent.offsetParent) {
                offset[0] += offsetParent.offsetLeft;
                offset[1] += offsetParent.offsetTop;
            }

            return offset;
            });

export {
  getCanvas ,
  setCanvas ,
  getOffset ,
}
/* No side effect */
