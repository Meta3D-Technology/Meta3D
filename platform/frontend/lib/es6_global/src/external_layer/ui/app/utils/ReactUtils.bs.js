

import * as Curry from "../../../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as AppStore$Frontend from "../store/AppStore.bs.js";
import * as AppStoreType$Frontend from "./utils/assemble_space/AppStoreType.bs.js";

function useDispatchForAssembleSpaceStore(param) {
  var dispatch = Curry._1(AppStore$Frontend.useDispatch, undefined);
  return function (assembleSpaceAction) {
    Curry._1(dispatch, {
          RE_EXN_ID: AppStoreType$Frontend.AssembleSpaceAction,
          _1: assembleSpaceAction
        });
  };
}

export {
  useDispatchForAssembleSpaceStore ,
}
/* AppStore-Frontend Not a pure module */
