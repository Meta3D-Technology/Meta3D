

import * as Curry from "../../../../../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as GuideUtils$Frontend from "../../../utils/GuideUtils.bs.js";
import * as AssembleSpaceStoreType$Frontend from "../../../utils/utils/assemble_space/AssembleSpaceStoreType.bs.js";

function openDocDrawer(dispatch) {
  Curry._1(dispatch, {
        RE_EXN_ID: AssembleSpaceStoreType$Frontend.OpenDocDrawer,
        _1: {
          hd: [
            "Input的文档",
            "TODO link"
          ],
          tl: /* [] */0
        }
      });
  return GuideUtils$Frontend.markIsFinishShowInput(true);
}

var ShowInput = {
  openDocDrawer: openDocDrawer
};

function openDocDrawer$1(dispatch) {
  Curry._1(dispatch, {
        RE_EXN_ID: AssembleSpaceStoreType$Frontend.OpenDocDrawer,
        _1: {
          hd: [
            "Action的文档",
            "TODO link"
          ],
          tl: /* [] */0
        }
      });
  return GuideUtils$Frontend.markIsFinishShowAction(true);
}

var ShowAction = {
  openDocDrawer: openDocDrawer$1
};

export {
  ShowInput ,
  ShowAction ,
}
/* GuideUtils-Frontend Not a pure module */
