

import * as Curry from "../../../../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as AssembleSpaceStoreType$Frontend from "./assemble_space/AssembleSpaceStoreType.bs.js";

function useDispatch(useDispatchForAssembleSpaceAction) {
  var dispatch = Curry._1(useDispatchForAssembleSpaceAction, undefined);
  return function (apAssembleAction) {
    return Curry._1(dispatch, {
                RE_EXN_ID: AssembleSpaceStoreType$Frontend.ApAssembleAction,
                _1: apAssembleAction
              });
  };
}

function useSelector(useSelectorForAssembleSpaceStore, func) {
  return useSelectorForAssembleSpaceStore(function (param) {
              return Curry._1(func, param.apAssembleState);
            });
}

var ApAssemble = {
  useDispatch: useDispatch,
  useSelector: useSelector
};

function useDispatch$1(useDispatchForAssembleSpaceAction) {
  var dispatch = Curry._1(useDispatchForAssembleSpaceAction, undefined);
  return function (elementAssembleAction) {
    return Curry._1(dispatch, {
                RE_EXN_ID: AssembleSpaceStoreType$Frontend.ElementAssembleAction,
                _1: elementAssembleAction
              });
  };
}

function useSelector$1(useSelectorForAssembleSpaceStore, func) {
  return useSelectorForAssembleSpaceStore(function (param) {
              return Curry._1(func, param.elementAssembleState);
            });
}

var ElementAssemble = {
  useDispatch: useDispatch$1,
  useSelector: useSelector$1
};

function useDispatch$2(useDispatchForAssembleSpaceAction) {
  var dispatch = Curry._1(useDispatchForAssembleSpaceAction, undefined);
  return function (packageAssembleAction) {
    return Curry._1(dispatch, {
                RE_EXN_ID: AssembleSpaceStoreType$Frontend.PackageAssembleAction,
                _1: packageAssembleAction
              });
  };
}

function useSelector$2(useSelectorForAssembleSpaceStore, func) {
  return useSelectorForAssembleSpaceStore(function (param) {
              return Curry._1(func, param.packageAssembleState);
            });
}

var PackageAssemble = {
  useDispatch: useDispatch$2,
  useSelector: useSelector$2
};

export {
  ApAssemble ,
  ElementAssemble ,
  PackageAssemble ,
}
/* No side effect */
