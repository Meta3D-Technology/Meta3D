

import * as Antd from "antd";
import * as Curry from "../../../../../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as React from "react";
import * as AppStore$Frontend from "../../../store/AppStore.bs.js";
import * as GuideUtils$Frontend from "../../../utils/GuideUtils.bs.js";
import * as ReactUtils$Frontend from "../../../utils/ReactUtils.bs.js";
import * as ReduxUtils$Frontend from "../../../utils/utils/ReduxUtils.bs.js";
import * as MessageUtils$Frontend from "../../../utils/utils/MessageUtils.bs.js";
import * as NullableSt$Meta3dCommonlib from "../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/NullableSt.bs.js";

import 'antd/dist/reset.css'
;

function CreateFromScratchGuideInUserCenter(Props) {
  var createFromScratchButtonTarget = Props.createFromScratchButtonTarget;
  var publishedEditorsTarget = Props.publishedEditorsTarget;
  var navTarget = Props.navTarget;
  var guideTarget = Props.guideTarget;
  var dispatch = Curry._1(AppStore$Frontend.useDispatch, undefined);
  ReduxUtils$Frontend.ApAssemble.useDispatch(ReactUtils$Frontend.useDispatchForAssembleSpaceStore);
  var dispatchForElementAssembleStore = ReduxUtils$Frontend.ElementAssemble.useDispatch(ReactUtils$Frontend.useDispatchForAssembleSpaceStore);
  var match = Curry._1(AppStore$Frontend.useSelector, (function (param) {
          return param.userCenterState;
        }));
  var isInCreateFromScratchTourPhase3 = match.isInCreateFromScratchTourPhase3;
  var isInCreateFromScratchTourPhase1 = match.isInCreateFromScratchTourPhase1;
  var match$1 = React.useState(function () {
        return false;
      });
  var setOpenTourPhase1 = match$1[1];
  var match$2 = React.useState(function () {
        return false;
      });
  var setOpenTourPhase3 = match$2[1];
  var _buildCreateFromScratchPhase1TourSteps = function (param) {
    return [{
              title: "点击它",
              description: "",
              cover: NullableSt$Meta3dCommonlib.getEmpty(undefined),
              target: (function (param) {
                  return GuideUtils$Frontend.getRefCurrent(createFromScratchButtonTarget);
                }),
              closeIcon: NullableSt$Meta3dCommonlib.$$return(GuideUtils$Frontend.buildCloseIcon(dispatch, dispatchForElementAssembleStore))
            }];
  };
  var _buildCreateFromScratchPhase3TourSteps = function (publishedEditorsTarget, navTarget, guideTarget) {
    return [
            {
              title: "查看发布的编辑器",
              description: "在这里可以按照编辑器名，找到刚刚发布的编辑器。以后您可以继续编辑它，或者在线运行它。现在请点Next",
              cover: NullableSt$Meta3dCommonlib.getEmpty(undefined),
              target: (function (param) {
                  return GuideUtils$Frontend.getRefCurrent(publishedEditorsTarget);
                }),
              closeIcon: NullableSt$Meta3dCommonlib.$$return(GuideUtils$Frontend.buildCloseIcon(dispatch, dispatchForElementAssembleStore))
            },
            {
              title: "查看所有发布的编辑器",
              description: "第二个导航栏：“发布的编辑器”可以查看所有人发布的编辑器，包括您刚刚发布的编辑器。以后您可以导入它们（也就是导入模板来创建新的编辑器），或者在线运行它们。现在请点Next",
              cover: NullableSt$Meta3dCommonlib.getEmpty(undefined),
              target: (function (param) {
                  return GuideUtils$Frontend.getRefCurrent(navTarget);
                }),
              closeIcon: NullableSt$Meta3dCommonlib.$$return(GuideUtils$Frontend.buildCloseIcon(dispatch, dispatchForElementAssembleStore))
            },
            {
              title: "这里可以打开更多引导。本次引导结束，感谢您的配合~",
              description: "",
              cover: NullableSt$Meta3dCommonlib.getEmpty(undefined),
              target: (function (param) {
                  return GuideUtils$Frontend.getRefCurrent(guideTarget);
                }),
              closeIcon: NullableSt$Meta3dCommonlib.$$return(GuideUtils$Frontend.buildCloseIcon(dispatch, dispatchForElementAssembleStore))
            }
          ];
  };
  React.useEffect((function () {
          MessageUtils$Frontend.showCatchedErrorMessage((function (param) {
                  if (isInCreateFromScratchTourPhase1) {
                    Curry._1(setOpenTourPhase1, (function (param) {
                            return true;
                          }));
                  } else {
                    Curry._1(setOpenTourPhase1, (function (param) {
                            return false;
                          }));
                  }
                  if (isInCreateFromScratchTourPhase3) {
                    return Curry._1(setOpenTourPhase3, (function (param) {
                                  return true;
                                }));
                  } else {
                    return Curry._1(setOpenTourPhase3, (function (param) {
                                  return false;
                                }));
                  }
                }), 5);
        }), []);
  return React.createElement(React.Fragment, undefined, isInCreateFromScratchTourPhase1 ? React.createElement(React.Fragment, undefined, GuideUtils$Frontend.buildSteps(undefined, 0, GuideUtils$Frontend.buildCreateFromScratchStepData(undefined)), React.createElement(Antd.Tour, {
                        open: match$1[0],
                        steps: _buildCreateFromScratchPhase1TourSteps(undefined)
                      })) : (
                isInCreateFromScratchTourPhase3 ? React.createElement(React.Fragment, undefined, GuideUtils$Frontend.buildSteps(undefined, 5, GuideUtils$Frontend.buildCreateFromScratchStepData(undefined)), React.createElement(Antd.Tour, {
                            open: match$2[0],
                            onClose: (function (param) {
                                GuideUtils$Frontend.endCreateFromScratchTour(dispatch, dispatchForElementAssembleStore);
                              }),
                            steps: _buildCreateFromScratchPhase3TourSteps(publishedEditorsTarget, navTarget, guideTarget)
                          })) : null
              ));
}

var make = CreateFromScratchGuideInUserCenter;

export {
  make ,
}
/*  Not a pure module */
