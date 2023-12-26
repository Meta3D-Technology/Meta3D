

import * as Js_string from "../../../../../../../../../../node_modules/rescript/lib/es6/js_string.js";

function isUIControl(protocolName) {
  return Js_string.includes("-ui-control-", protocolName);
}

function isInput(protocolName) {
  if (Js_string.includes("-input-", protocolName)) {
    return !Js_string.includes("-ui-control-", protocolName);
  } else {
    return false;
  }
}

function isAction(protocolName) {
  if (Js_string.includes("-action-", protocolName)) {
    return !Js_string.includes("-ui-control-", protocolName);
  } else {
    return false;
  }
}

function decideContributeType(protocolName) {
  if (Js_string.includes("-ui-control-", protocolName)) {
    return /* UIControl */0;
  } else if (Js_string.includes("-pipeline-", protocolName)) {
    return /* Pipeline */6;
  } else if (isAction(protocolName)) {
    return /* Action */3;
  } else if (Js_string.includes("-component-", protocolName)) {
    return /* Component */4;
  } else if (Js_string.includes("-gameobject-", protocolName)) {
    return /* GameObject */5;
  } else if (Js_string.includes("-element-", protocolName)) {
    return /* Element */2;
  } else if (isInput(protocolName)) {
    return /* Input */7;
  } else if (Js_string.includes("-skin-", protocolName)) {
    return /* Skin */1;
  } else {
    return /* Unknown */8;
  }
}

export {
  isUIControl ,
  isInput ,
  isAction ,
  decideContributeType ,
}
/* No side effect */
