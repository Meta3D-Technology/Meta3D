

import * as ApAssembleStore$Frontend from "../components/ap_assemble/store/ApAssembleStore.bs.js";
import * as ElementAssembleStore$Frontend from "../components/element_assemble/store/ElementAssembleStore.bs.js";
import * as PackageAssembleStore$Frontend from "../components/package_assemble/store/PackageAssembleStore.bs.js";
import * as AssembleSpaceStoreType$Frontend from "../../utils/utils/assemble_space/AssembleSpaceStoreType.bs.js";

function reducer(state, action) {
  if (action.RE_EXN_ID === AssembleSpaceStoreType$Frontend.ResetWhenEnter) {
    return {
            apAssembleState: ApAssembleStore$Frontend.reducer(state.apAssembleState, /* ResetWhenEnter */0),
            elementAssembleState: ElementAssembleStore$Frontend.reducer(state.elementAssembleState, /* ResetWhenEnter */0),
            packageAssembleState: PackageAssembleStore$Frontend.reducer(state.packageAssembleState, /* ResetWhenEnter */0),
            docDrawerData: state.docDrawerData
          };
  }
  if (action.RE_EXN_ID === AssembleSpaceStoreType$Frontend.ResetWhenSwitch) {
    return {
            apAssembleState: ApAssembleStore$Frontend.reducer(state.apAssembleState, /* ResetWhenSwitch */1),
            elementAssembleState: ElementAssembleStore$Frontend.reducer(state.elementAssembleState, /* ResetWhenSwitch */1),
            packageAssembleState: PackageAssembleStore$Frontend.reducer(state.packageAssembleState, /* ResetWhenSwitch */1),
            docDrawerData: state.docDrawerData
          };
  }
  if (action.RE_EXN_ID === AssembleSpaceStoreType$Frontend.OpenDocDrawer) {
    return {
            apAssembleState: state.apAssembleState,
            elementAssembleState: state.elementAssembleState,
            packageAssembleState: state.packageAssembleState,
            docDrawerData: action._1
          };
  }
  if (action.RE_EXN_ID === AssembleSpaceStoreType$Frontend.CloseDocDrawer) {
    return {
            apAssembleState: state.apAssembleState,
            elementAssembleState: state.elementAssembleState,
            packageAssembleState: state.packageAssembleState,
            docDrawerData: undefined
          };
  }
  if (action.RE_EXN_ID === AssembleSpaceStoreType$Frontend.ApAssembleAction) {
    return {
            apAssembleState: ApAssembleStore$Frontend.reducer(state.apAssembleState, action._1),
            elementAssembleState: state.elementAssembleState,
            packageAssembleState: state.packageAssembleState,
            docDrawerData: state.docDrawerData
          };
  }
  if (action.RE_EXN_ID === AssembleSpaceStoreType$Frontend.ElementAssembleAction) {
    return {
            apAssembleState: state.apAssembleState,
            elementAssembleState: ElementAssembleStore$Frontend.reducer(state.elementAssembleState, action._1),
            packageAssembleState: state.packageAssembleState,
            docDrawerData: state.docDrawerData
          };
  }
  if (action.RE_EXN_ID === AssembleSpaceStoreType$Frontend.PackageAssembleAction) {
    return {
            apAssembleState: state.apAssembleState,
            elementAssembleState: state.elementAssembleState,
            packageAssembleState: PackageAssembleStore$Frontend.reducer(state.packageAssembleState, action._1),
            docDrawerData: state.docDrawerData
          };
  }
  throw {
        RE_EXN_ID: "Match_failure",
        _1: [
          "AssembleSpaceStore.res",
          4,
          2
        ],
        Error: new Error()
      };
}

var initialState = {
  apAssembleState: ApAssembleStore$Frontend.initialState,
  elementAssembleState: ElementAssembleStore$Frontend.initialState,
  packageAssembleState: PackageAssembleStore$Frontend.initialState,
  docDrawerData: undefined
};

export {
  reducer ,
  initialState ,
}
/* ApAssembleStore-Frontend Not a pure module */
