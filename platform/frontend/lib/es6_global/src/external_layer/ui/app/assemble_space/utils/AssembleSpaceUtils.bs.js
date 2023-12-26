

import * as Curry from "../../../../../../../../../../node_modules/rescript/lib/es6/curry.js";

function resetWhenLeave(dispatchForElementAssembleStore) {
  return Curry._1(dispatchForElementAssembleStore, {
              TAG: /* SetCanvasData */10,
              _0: {
                width: 0,
                height: 0
              }
            });
}

export {
  resetWhenLeave ,
}
/* No side effect */
