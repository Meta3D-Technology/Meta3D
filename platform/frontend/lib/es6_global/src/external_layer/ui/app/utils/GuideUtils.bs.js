

import * as Antd from "antd";
import * as Curry from "../../../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as React from "react";
import * as Icons from "@ant-design/icons";
import * as StepContent$Frontend from "../step_content/components/StepContent.bs.js";
import * as AppStoreType$Frontend from "./utils/assemble_space/AppStoreType.bs.js";
import * as ArraySt$Meta3dCommonlib from "../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as OptionSt$Meta3dCommonlib from "../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";
import * as LocalStorageUtils$Frontend from "./LocalStorageUtils.bs.js";
import * as NullableSt$Meta3dCommonlib from "../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/NullableSt.bs.js";

function _buildKey(param) {
  return "meta3d_guide_status";
}

function _createDefaultStatus(param) {
  return {
          isFinishFirstLogin: false,
          isFinishCreateFromScratchTour: false,
          isFinishShowInput: false,
          isFinishShowAction: false
        };
}

function _readGuideStatus(param) {
  return OptionSt$Meta3dCommonlib.getWithDefault(OptionSt$Meta3dCommonlib.map(OptionSt$Meta3dCommonlib.fromNullable(LocalStorageUtils$Frontend.get("meta3d_guide_status")), (function (prim) {
                    return JSON.parse(prim);
                  })), {
              isFinishFirstLogin: false,
              isFinishCreateFromScratchTour: false,
              isFinishShowInput: false,
              isFinishShowAction: false
            });
}

function readIsFinishFirstLogin(param) {
  return _readGuideStatus(undefined).isFinishFirstLogin;
}

function markFinishFirstLogin(param) {
  var init = _readGuideStatus(undefined);
  return LocalStorageUtils$Frontend.set("meta3d_guide_status", JSON.stringify({
                  isFinishFirstLogin: true,
                  isFinishCreateFromScratchTour: init.isFinishCreateFromScratchTour,
                  isFinishShowInput: init.isFinishShowInput,
                  isFinishShowAction: init.isFinishShowAction
                }));
}

function readIsFinishCreateFromScratchTour(param) {
  return _readGuideStatus(undefined).isFinishCreateFromScratchTour;
}

function markFinishCreateFromScratchTour(param) {
  var init = _readGuideStatus(undefined);
  return LocalStorageUtils$Frontend.set("meta3d_guide_status", JSON.stringify({
                  isFinishFirstLogin: init.isFinishFirstLogin,
                  isFinishCreateFromScratchTour: true,
                  isFinishShowInput: init.isFinishShowInput,
                  isFinishShowAction: init.isFinishShowAction
                }));
}

function _markStartCreateFromScratchTour(param) {
  var init = _readGuideStatus(undefined);
  return LocalStorageUtils$Frontend.set("meta3d_guide_status", JSON.stringify({
                  isFinishFirstLogin: init.isFinishFirstLogin,
                  isFinishCreateFromScratchTour: false,
                  isFinishShowInput: init.isFinishShowInput,
                  isFinishShowAction: init.isFinishShowAction
                }));
}

function readIsFinishShowInput(param) {
  return _readGuideStatus(undefined).isFinishShowInput;
}

function markIsFinishShowInput(isFinishShowInput) {
  var init = _readGuideStatus(undefined);
  return LocalStorageUtils$Frontend.set("meta3d_guide_status", JSON.stringify({
                  isFinishFirstLogin: init.isFinishFirstLogin,
                  isFinishCreateFromScratchTour: init.isFinishCreateFromScratchTour,
                  isFinishShowInput: isFinishShowInput,
                  isFinishShowAction: init.isFinishShowAction
                }));
}

function readIsFinishShowAction(param) {
  return _readGuideStatus(undefined).isFinishShowAction;
}

function markIsFinishShowAction(isFinishShowAction) {
  var init = _readGuideStatus(undefined);
  return LocalStorageUtils$Frontend.set("meta3d_guide_status", JSON.stringify({
                  isFinishFirstLogin: init.isFinishFirstLogin,
                  isFinishCreateFromScratchTour: init.isFinishCreateFromScratchTour,
                  isFinishShowInput: init.isFinishShowInput,
                  isFinishShowAction: isFinishShowAction
                }));
}

function buildCreateFromScratchStepData(param) {
  return [
          [
            "点击创建按钮",
            "点击创建按钮",
            ""
          ],
          [
            "设置画布大小",
            "设置画布的宽度和高度",
            "在两个输入框中分别输入宽度和高度"
          ],
          [
            "加入UI Control",
            "加入UI Control",
            "加入所有的UI Control，将它们摆放到合适的位置"
          ],
          [
            "加入Input",
            "加入Input脚本",
            "Input提供了UI Control的数据"
          ],
          [
            "加入Action",
            "加入Action脚本",
            "Action负责处理UI Control的事件"
          ],
          [
            "发布",
            "发布",
            "发布编辑器"
          ]
        ];
}

function buildSteps(onStartFunc, current, stepData) {
  var match = ArraySt$Meta3dCommonlib.getExn(stepData, current);
  return React.createElement(React.Fragment, undefined, React.createElement(Antd.Steps, {
                  current: current,
                  items: ArraySt$Meta3dCommonlib.map(stepData, (function (param) {
                          var stepTitle = param[0];
                          return {
                                  key: stepTitle,
                                  title: stepTitle,
                                  description: NullableSt$Meta3dCommonlib.getEmpty(undefined)
                                };
                        }))
                }), React.createElement(StepContent$Frontend.make, {
                  onStartFunc: onStartFunc,
                  title: match[1],
                  description: match[2]
                }));
}

function getRefCurrent(ref) {
  return ref.current;
}

function _getSceneViewProtocolName(param) {
  return "meta3d-ui-control-scene-view-protocol";
}

function _getGameViewProtocolName(param) {
  return "meta3d-ui-control-game-view-protocol";
}

function isSceneViewProtocolName(protocolName) {
  return protocolName === "meta3d-ui-control-scene-view-protocol";
}

function isGameViewProtocolName(protocolName) {
  return protocolName === "meta3d-ui-control-game-view-protocol";
}

function isWindowProtocolName(protocolName) {
  return protocolName === "meta3d-ui-control-window-protocol";
}

function isButtonProtocolName(protocolName) {
  return protocolName === "meta3d-ui-control-button-protocol";
}

function startCreateFromScratchTour(dispatchForAppStore, dispatchForElementAssembleStore) {
  Curry._1(dispatchForAppStore, {
        RE_EXN_ID: AppStoreType$Frontend.UserCenterAction,
        _1: /* StartCreateFromScratchTourPhase1 */2
      });
  Curry._1(dispatchForElementAssembleStore, /* StartCreateFromScratchTourPhase2 */3);
  Curry._1(dispatchForAppStore, {
        RE_EXN_ID: AppStoreType$Frontend.UserCenterAction,
        _1: /* StartCreateFromScratchTourPhase3 */4
      });
  return _markStartCreateFromScratchTour(undefined);
}

function endCreateFromScratchTour(dispatchForAppStore, dispatchForElementAssembleStore) {
  Curry._1(dispatchForAppStore, {
        RE_EXN_ID: AppStoreType$Frontend.UserCenterAction,
        _1: /* EndCreateFromScratchTourPhase1 */3
      });
  Curry._1(dispatchForElementAssembleStore, /* EndCreateFromScratchTourPhase2 */4);
  Curry._1(dispatchForAppStore, {
        RE_EXN_ID: AppStoreType$Frontend.UserCenterAction,
        _1: /* EndCreateFromScratchTourPhase3 */5
      });
  return markFinishCreateFromScratchTour(undefined);
}

function buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore) {
  return React.createElement(Antd.Popconfirm, {
              title: "结束引导",
              description: "您确定结束本次引导吗？",
              onConfirm: (function (param) {
                  endCreateFromScratchTour(dispatchForAppStore, dispatchForElementAssembleStore);
                }),
              onCancel: (function ($$event) {
                  $$event.preventDefault();
                  $$event.stopPropagation();
                }),
              okText: "是",
              cancelText: "否",
              children: React.createElement(Icons.CloseOutlined, {
                    onClick: (function ($$event) {
                        $$event.preventDefault();
                        $$event.stopPropagation();
                      })
                  })
            });
}

function handleCloseCreateFromScratchTour(dispatchForAppStore, dispatchForElementAssembleStore) {
  if (window.confirm("您确定要结束本次引导吗？")) {
    return endCreateFromScratchTour(dispatchForAppStore, dispatchForElementAssembleStore);
  }
  
}

export {
  _buildKey ,
  _createDefaultStatus ,
  _readGuideStatus ,
  readIsFinishFirstLogin ,
  markFinishFirstLogin ,
  readIsFinishCreateFromScratchTour ,
  markFinishCreateFromScratchTour ,
  _markStartCreateFromScratchTour ,
  readIsFinishShowInput ,
  markIsFinishShowInput ,
  readIsFinishShowAction ,
  markIsFinishShowAction ,
  buildCreateFromScratchStepData ,
  buildSteps ,
  getRefCurrent ,
  _getSceneViewProtocolName ,
  _getGameViewProtocolName ,
  isSceneViewProtocolName ,
  isGameViewProtocolName ,
  isWindowProtocolName ,
  isButtonProtocolName ,
  startCreateFromScratchTour ,
  endCreateFromScratchTour ,
  buildCloseIcon ,
  handleCloseCreateFromScratchTour ,
}
/* antd Not a pure module */
