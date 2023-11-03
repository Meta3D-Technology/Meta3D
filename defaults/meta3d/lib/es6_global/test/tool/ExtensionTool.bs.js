

import * as Caml_option from "../../../../../../node_modules/rescript/lib/es6/caml_option.js";

function buildGetServiceFunc(service, api) {
  return service;
}

function buildGetLifeFunc(onRegisterOpt, onStartOpt, onInitOpt, onUpdateOpt, onRestoreOpt, onDeepCopyOpt, param, api, extensionProtocolName) {
  var onRegister = onRegisterOpt !== undefined ? Caml_option.valFromOption(onRegisterOpt) : null;
  var onStart = onStartOpt !== undefined ? Caml_option.valFromOption(onStartOpt) : null;
  var onInit = onInitOpt !== undefined ? Caml_option.valFromOption(onInitOpt) : null;
  var onUpdate = onUpdateOpt !== undefined ? Caml_option.valFromOption(onUpdateOpt) : null;
  var onRestore = onRestoreOpt !== undefined ? Caml_option.valFromOption(onRestoreOpt) : null;
  var onDeepCopy = onDeepCopyOpt !== undefined ? Caml_option.valFromOption(onDeepCopyOpt) : null;
  return {
          onRegister: onRegister,
          onRestore: onRestore,
          onDeepCopy: onDeepCopy,
          onStart: onStart,
          onInit: onInit,
          onUpdate: onUpdate
        };
}

export {
  buildGetServiceFunc ,
  buildGetLifeFunc ,
}
/* No side effect */
