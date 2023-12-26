

import * as Curry from "../../../../../../../../../node_modules/rescript/lib/es6/curry.js";

function openLink(url) {
  Curry._1(window.open(url, "_blank").focus, undefined);
}

export {
  openLink ,
}
/* No side effect */
