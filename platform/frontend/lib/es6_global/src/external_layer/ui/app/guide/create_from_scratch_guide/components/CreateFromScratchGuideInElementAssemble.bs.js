

import * as Antd from "antd";
import * as Curry from "../../../../../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as React from "react";
import * as Js_string from "../../../../../../../../../../../node_modules/rescript/lib/es6/js_string.js";
import * as EventUtils$Frontend from "../../../utils/EventUtils.bs.js";
import * as GuideUtils$Frontend from "../../../utils/GuideUtils.bs.js";
import * as ReactUtils$Frontend from "../../../utils/ReactUtils.bs.js";
import * as ReduxUtils$Frontend from "../../../utils/utils/ReduxUtils.bs.js";
import * as MessageUtils$Frontend from "../../../utils/utils/MessageUtils.bs.js";
import * as ArraySt$Meta3dCommonlib from "../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as NullableSt$Meta3dCommonlib from "../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/NullableSt.bs.js";

import 'antd/dist/reset.css'
;

function buildCreateFromScratchTourStepAndStepMapData(param) {
  return [
          [
            0,
            1
          ],
          [
            2,
            2
          ],
          [
            20,
            3
          ],
          [
            27,
            4
          ],
          [
            34,
            5
          ]
        ];
}

function buildCreateFromScratchTourSteps(dispatchForAppStore, dispatchForElementAssembleStore, canvasWidthInputTarget, canvasHeightInputTarget, addUIControlButtonTarget, selectSceneViewUIControlTarget, rectWidthInputTarget, rectHeightInputTarget, selectedUIControlTarget, inputSelectTarget, actionSelectTarget, selectGameViewUIControlTarget, selectWindowUIControlTarget, selectButtonUIControlTarget, rectXInputTarget, rectYInputTarget, runButtonTarget, publishButtonTarget, publishModalTarget, assembleSpaceNavTarget, inputCollapseTarget, addInputButtonTarget, inputCodeEditTarget, actionCollapseTarget, addActionButtonTarget, actionCodeEditTarget) {
  return [
          {
            title: "设置画布宽度",
            description: "这里可以设置为1200",
            cover: NullableSt$Meta3dCommonlib.getEmpty(undefined),
            target: (function (param) {
                return GuideUtils$Frontend.getRefCurrent(canvasWidthInputTarget);
              }),
            closeIcon: NullableSt$Meta3dCommonlib.$$return(GuideUtils$Frontend.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore))
          },
          {
            title: "设置画布高度",
            description: "这里可以设置为800",
            cover: NullableSt$Meta3dCommonlib.getEmpty(undefined),
            target: (function (param) {
                return GuideUtils$Frontend.getRefCurrent(canvasHeightInputTarget);
              }),
            closeIcon: NullableSt$Meta3dCommonlib.$$return(GuideUtils$Frontend.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore))
          },
          {
            title: "点击加入UI Control的按钮",
            description: "",
            cover: NullableSt$Meta3dCommonlib.getEmpty(undefined),
            target: (function (param) {
                return GuideUtils$Frontend.getRefCurrent(addUIControlButtonTarget);
              }),
            closeIcon: NullableSt$Meta3dCommonlib.$$return(GuideUtils$Frontend.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore))
          },
          {
            title: "加入Scene View",
            description: "点击它。Scene View负责显示编辑视图",
            cover: NullableSt$Meta3dCommonlib.getEmpty(undefined),
            target: (function (param) {
                return GuideUtils$Frontend.getRefCurrent(selectSceneViewUIControlTarget);
              }),
            closeIcon: NullableSt$Meta3dCommonlib.$$return(GuideUtils$Frontend.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore))
          },
          {
            title: "设置Scene View的宽度",
            description: "这里可以设置为400",
            cover: NullableSt$Meta3dCommonlib.getEmpty(undefined),
            target: (function (param) {
                return GuideUtils$Frontend.getRefCurrent(rectWidthInputTarget);
              }),
            closeIcon: NullableSt$Meta3dCommonlib.$$return(GuideUtils$Frontend.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore))
          },
          {
            title: "设置Scene View的高度",
            description: "这里可以设置为400",
            cover: NullableSt$Meta3dCommonlib.getEmpty(undefined),
            target: (function (param) {
                return GuideUtils$Frontend.getRefCurrent(rectHeightInputTarget);
              }),
            closeIcon: NullableSt$Meta3dCommonlib.$$return(GuideUtils$Frontend.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore))
          },
          {
            title: "点击加入UI Control的按钮",
            description: "",
            cover: NullableSt$Meta3dCommonlib.getEmpty(undefined),
            target: (function (param) {
                return GuideUtils$Frontend.getRefCurrent(addUIControlButtonTarget);
              }),
            closeIcon: NullableSt$Meta3dCommonlib.$$return(GuideUtils$Frontend.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore))
          },
          {
            title: "加入Game View",
            description: "点击它。Game View负责显示运行视图",
            cover: NullableSt$Meta3dCommonlib.getEmpty(undefined),
            target: (function (param) {
                return GuideUtils$Frontend.getRefCurrent(selectGameViewUIControlTarget);
              }),
            closeIcon: NullableSt$Meta3dCommonlib.$$return(GuideUtils$Frontend.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore))
          },
          {
            title: "设置Game View的x坐标",
            description: "这里可以设置为400",
            cover: NullableSt$Meta3dCommonlib.getEmpty(undefined),
            target: (function (param) {
                return GuideUtils$Frontend.getRefCurrent(rectXInputTarget);
              }),
            closeIcon: NullableSt$Meta3dCommonlib.$$return(GuideUtils$Frontend.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore))
          },
          {
            title: "设置Game View的宽度",
            description: "这里可以设置为400",
            cover: NullableSt$Meta3dCommonlib.getEmpty(undefined),
            target: (function (param) {
                return GuideUtils$Frontend.getRefCurrent(rectWidthInputTarget);
              }),
            closeIcon: NullableSt$Meta3dCommonlib.$$return(GuideUtils$Frontend.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore))
          },
          {
            title: "设置Game View的高度",
            description: "这里可以设置为400",
            cover: NullableSt$Meta3dCommonlib.getEmpty(undefined),
            target: (function (param) {
                return GuideUtils$Frontend.getRefCurrent(rectHeightInputTarget);
              }),
            closeIcon: NullableSt$Meta3dCommonlib.$$return(GuideUtils$Frontend.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore))
          },
          {
            title: "运行编辑器",
            description: "点击它，可在新的窗口中实时运行编辑器。您可以在Scene View中通过拖动来转动相机",
            cover: NullableSt$Meta3dCommonlib.getEmpty(undefined),
            target: (function (param) {
                return GuideUtils$Frontend.getRefCurrent(runButtonTarget);
              }),
            closeIcon: NullableSt$Meta3dCommonlib.$$return(GuideUtils$Frontend.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore))
          },
          {
            title: "点击加入UI Control的按钮",
            description: "",
            cover: NullableSt$Meta3dCommonlib.getEmpty(undefined),
            target: (function (param) {
                return GuideUtils$Frontend.getRefCurrent(addUIControlButtonTarget);
              }),
            closeIcon: NullableSt$Meta3dCommonlib.$$return(GuideUtils$Frontend.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore))
          },
          {
            title: "加入窗口",
            description: "点击它。窗口是容器，能加入其它的UI Control到它中",
            cover: NullableSt$Meta3dCommonlib.getEmpty(undefined),
            target: (function (param) {
                return GuideUtils$Frontend.getRefCurrent(selectWindowUIControlTarget);
              }),
            closeIcon: NullableSt$Meta3dCommonlib.$$return(GuideUtils$Frontend.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore))
          },
          {
            title: "设置窗口的y坐标",
            description: "这里可以设置为500",
            cover: NullableSt$Meta3dCommonlib.getEmpty(undefined),
            target: (function (param) {
                return GuideUtils$Frontend.getRefCurrent(rectYInputTarget);
              }),
            closeIcon: NullableSt$Meta3dCommonlib.$$return(GuideUtils$Frontend.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore))
          },
          {
            title: "设置窗口的宽度",
            description: "这里可以设置为200",
            cover: NullableSt$Meta3dCommonlib.getEmpty(undefined),
            target: (function (param) {
                return GuideUtils$Frontend.getRefCurrent(rectWidthInputTarget);
              }),
            closeIcon: NullableSt$Meta3dCommonlib.$$return(GuideUtils$Frontend.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore))
          },
          {
            title: "设置窗口的高度",
            description: "这里可以设置为100",
            cover: NullableSt$Meta3dCommonlib.getEmpty(undefined),
            target: (function (param) {
                return GuideUtils$Frontend.getRefCurrent(rectHeightInputTarget);
              }),
            closeIcon: NullableSt$Meta3dCommonlib.$$return(GuideUtils$Frontend.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore))
          },
          {
            title: "选择窗口",
            description: "这里点击窗口",
            cover: NullableSt$Meta3dCommonlib.getEmpty(undefined),
            target: (function (param) {
                return GuideUtils$Frontend.getRefCurrent(selectedUIControlTarget);
              }),
            closeIcon: NullableSt$Meta3dCommonlib.$$return(GuideUtils$Frontend.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore))
          },
          {
            title: "点击加入UI Control的按钮",
            description: "",
            cover: NullableSt$Meta3dCommonlib.getEmpty(undefined),
            target: (function (param) {
                return GuideUtils$Frontend.getRefCurrent(addUIControlButtonTarget);
              }),
            closeIcon: NullableSt$Meta3dCommonlib.$$return(GuideUtils$Frontend.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore))
          },
          {
            title: "加入按钮",
            description: "点击它，将其加入到窗口中",
            cover: NullableSt$Meta3dCommonlib.getEmpty(undefined),
            target: (function (param) {
                return GuideUtils$Frontend.getRefCurrent(selectButtonUIControlTarget);
              }),
            closeIcon: NullableSt$Meta3dCommonlib.$$return(GuideUtils$Frontend.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore))
          },
          {
            title: "展开Input",
            description: "点击它",
            cover: NullableSt$Meta3dCommonlib.getEmpty(undefined),
            target: (function (param) {
                return GuideUtils$Frontend.getRefCurrent(inputCollapseTarget);
              }),
            closeIcon: NullableSt$Meta3dCommonlib.$$return(GuideUtils$Frontend.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore))
          },
          {
            title: "加入Input",
            description: "点击它",
            cover: NullableSt$Meta3dCommonlib.getEmpty(undefined),
            target: (function (param) {
                return GuideUtils$Frontend.getRefCurrent(addInputButtonTarget);
              }),
            closeIcon: NullableSt$Meta3dCommonlib.$$return(GuideUtils$Frontend.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore))
          },
          {
            title: "选择加入的Input",
            description: "点击Input1",
            cover: NullableSt$Meta3dCommonlib.getEmpty(undefined),
            target: (function (param) {
                return GuideUtils$Frontend.getRefCurrent(inputCollapseTarget);
              }),
            closeIcon: NullableSt$Meta3dCommonlib.$$return(GuideUtils$Frontend.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore))
          },
          {
            title: "更新代码",
            description: "将“Promise.resolve(null)”替换为：“Promise.resolve(true)”",
            cover: NullableSt$Meta3dCommonlib.getEmpty(undefined),
            target: (function (param) {
                return GuideUtils$Frontend.getRefCurrent(inputCodeEditTarget);
              }),
            closeIcon: NullableSt$Meta3dCommonlib.$$return(GuideUtils$Frontend.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore))
          },
          {
            title: "选择窗口",
            description: "这里点击窗口",
            cover: NullableSt$Meta3dCommonlib.getEmpty(undefined),
            target: (function (param) {
                return GuideUtils$Frontend.getRefCurrent(selectedUIControlTarget);
              }),
            closeIcon: NullableSt$Meta3dCommonlib.$$return(GuideUtils$Frontend.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore))
          },
          {
            title: "选择Input1",
            description: "这里选择刚加入的Input1，从而指定要绘制窗口。注：如果将Input1中的true改为false，则会隐藏窗口。",
            cover: NullableSt$Meta3dCommonlib.getEmpty(undefined),
            target: (function (param) {
                return GuideUtils$Frontend.getRefCurrent(inputSelectTarget);
              }),
            closeIcon: NullableSt$Meta3dCommonlib.$$return(GuideUtils$Frontend.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore))
          },
          {
            title: "运行编辑器",
            description: "点击它。您可以在左下方看到绘制的窗口",
            cover: NullableSt$Meta3dCommonlib.getEmpty(undefined),
            target: (function (param) {
                return GuideUtils$Frontend.getRefCurrent(runButtonTarget);
              }),
            closeIcon: NullableSt$Meta3dCommonlib.$$return(GuideUtils$Frontend.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore))
          },
          {
            title: "展开Action",
            description: "点击它",
            cover: NullableSt$Meta3dCommonlib.getEmpty(undefined),
            target: (function (param) {
                return GuideUtils$Frontend.getRefCurrent(actionCollapseTarget);
              }),
            closeIcon: NullableSt$Meta3dCommonlib.$$return(GuideUtils$Frontend.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore))
          },
          {
            title: "加入Action",
            description: "点击它",
            cover: NullableSt$Meta3dCommonlib.getEmpty(undefined),
            target: (function (param) {
                return GuideUtils$Frontend.getRefCurrent(addActionButtonTarget);
              }),
            closeIcon: NullableSt$Meta3dCommonlib.$$return(GuideUtils$Frontend.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore))
          },
          {
            title: "选择加入的Action",
            description: "点击Action1",
            cover: NullableSt$Meta3dCommonlib.getEmpty(undefined),
            target: (function (param) {
                return GuideUtils$Frontend.getRefCurrent(actionCollapseTarget);
              }),
            closeIcon: NullableSt$Meta3dCommonlib.$$return(GuideUtils$Frontend.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore))
          },
          {
            title: "更新代码",
            description: "在第12行代码：“return Promise.resolve(meta3dState)”之前插入一行代码：\nalert(\"触发按钮的click事件\")",
            cover: NullableSt$Meta3dCommonlib.getEmpty(undefined),
            target: (function (param) {
                return GuideUtils$Frontend.getRefCurrent(actionCodeEditTarget);
              }),
            closeIcon: NullableSt$Meta3dCommonlib.$$return(GuideUtils$Frontend.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore))
          },
          {
            title: "选择按钮",
            description: "这里点击按钮",
            cover: NullableSt$Meta3dCommonlib.getEmpty(undefined),
            target: (function (param) {
                return GuideUtils$Frontend.getRefCurrent(selectedUIControlTarget);
              }),
            closeIcon: NullableSt$Meta3dCommonlib.$$return(GuideUtils$Frontend.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore))
          },
          {
            title: "选择Action1",
            description: "这里选择刚加入的Action1，从而指定触发按钮的click事件时，将会执行Action1",
            cover: NullableSt$Meta3dCommonlib.getEmpty(undefined),
            target: (function (param) {
                return GuideUtils$Frontend.getRefCurrent(actionSelectTarget);
              }),
            closeIcon: NullableSt$Meta3dCommonlib.$$return(GuideUtils$Frontend.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore))
          },
          {
            title: "运行编辑器",
            description: "点击它。您可以点击按钮，将会弹一个alert",
            cover: NullableSt$Meta3dCommonlib.getEmpty(undefined),
            target: (function (param) {
                return GuideUtils$Frontend.getRefCurrent(runButtonTarget);
              }),
            closeIcon: NullableSt$Meta3dCommonlib.$$return(GuideUtils$Frontend.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore))
          },
          {
            title: "发布编辑器",
            description: "点击它",
            cover: NullableSt$Meta3dCommonlib.getEmpty(undefined),
            target: (function (param) {
                return GuideUtils$Frontend.getRefCurrent(publishButtonTarget);
              }),
            closeIcon: NullableSt$Meta3dCommonlib.$$return(GuideUtils$Frontend.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore))
          },
          {
            title: "发布编辑器",
            description: "首先输入必要的信息；然后点击发布按钮",
            cover: NullableSt$Meta3dCommonlib.getEmpty(undefined),
            target: (function (param) {
                return GuideUtils$Frontend.getRefCurrent(publishModalTarget);
              }),
            closeIcon: NullableSt$Meta3dCommonlib.$$return(GuideUtils$Frontend.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore))
          },
          {
            title: "返回用户中心",
            description: "点击第一个导航栏：“返回用户中心”，返回到用户中心",
            cover: NullableSt$Meta3dCommonlib.getEmpty(undefined),
            target: (function (param) {
                return GuideUtils$Frontend.getRefCurrent(assembleSpaceNavTarget);
              }),
            closeIcon: NullableSt$Meta3dCommonlib.$$return(GuideUtils$Frontend.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore))
          }
        ];
}

function useSelector(param) {
  return [
          param.assembleSpaceState.elementAssembleState.isInCreateFromScratchTourPhase2,
          param.eventEmitter
        ];
}

var Method = {
  buildCreateFromScratchTourStepAndStepMapData: buildCreateFromScratchTourStepAndStepMapData,
  buildCreateFromScratchTourSteps: buildCreateFromScratchTourSteps,
  useSelector: useSelector
};

function CreateFromScratchGuideInElementAssemble(Props) {
  var service = Props.service;
  var canvasWidthInputTarget = Props.canvasWidthInputTarget;
  var canvasHeightInputTarget = Props.canvasHeightInputTarget;
  var addUIControlButtonTarget = Props.addUIControlButtonTarget;
  var selectSceneViewUIControlTarget = Props.selectSceneViewUIControlTarget;
  var rectWidthInputTarget = Props.rectWidthInputTarget;
  var rectHeightInputTarget = Props.rectHeightInputTarget;
  var selectedUIControlTarget = Props.selectedUIControlTarget;
  var inputSelectTarget = Props.inputSelectTarget;
  var actionSelectTarget = Props.actionSelectTarget;
  var selectGameViewUIControlTarget = Props.selectGameViewUIControlTarget;
  var selectWindowUIControlTarget = Props.selectWindowUIControlTarget;
  var selectButtonUIControlTarget = Props.selectButtonUIControlTarget;
  var rectXInputTarget = Props.rectXInputTarget;
  var rectYInputTarget = Props.rectYInputTarget;
  var runButtonTarget = Props.runButtonTarget;
  var publishButtonTarget = Props.publishButtonTarget;
  var publishModalTarget = Props.publishModalTarget;
  var assembleSpaceNavTarget = Props.assembleSpaceNavTarget;
  var inputCollapseTarget = Props.inputCollapseTarget;
  var addInputButtonTarget = Props.addInputButtonTarget;
  var inputCodeEditTarget = Props.inputCodeEditTarget;
  var actionCollapseTarget = Props.actionCollapseTarget;
  var addActionButtonTarget = Props.addActionButtonTarget;
  var actionCodeEditTarget = Props.actionCodeEditTarget;
  var dispatchForAppStore = Curry._1(service.app.useDispatch, undefined);
  var dispatchForElementAssembleStore = ReduxUtils$Frontend.ElementAssemble.useDispatch(ReactUtils$Frontend.useDispatchForAssembleSpaceStore);
  var match = service.react.useAllSelector(useSelector);
  var eventEmitter = match[1];
  var isInCreateFromScratchTourPhase2 = match[0];
  var match$1 = Curry._1(service.react.useState, (function (param) {
          return 1;
        }));
  var setCurrentStep = match$1[1];
  var match$2 = Curry._1(service.react.useState, (function (param) {
          return 0;
        }));
  var setCurrentTourStep = match$2[1];
  var match$3 = Curry._1(service.react.useState, (function (param) {
          return false;
        }));
  var setOpenTour = match$3[1];
  React.useEffect((function () {
          MessageUtils$Frontend.showCatchedErrorMessage((function (param) {
                  if (isInCreateFromScratchTourPhase2) {
                    Curry._1(setOpenTour, (function (param) {
                            return true;
                          }));
                  } else {
                    Curry._1(setOpenTour, (function (param) {
                            return false;
                          }));
                  }
                  eventEmitter.addListener(EventUtils$Frontend.getShowPublishAppModalEventName(undefined), (function (param) {
                          Curry._1(setCurrentTourStep, (function (current) {
                                  return current + 1 | 0;
                                }));
                        }));
                  eventEmitter.addListener(EventUtils$Frontend.getPublishAppEventName(undefined), (function (param) {
                          Curry._1(setCurrentTourStep, (function (current) {
                                  return current + 1 | 0;
                                }));
                        }));
                  eventEmitter.addListener(EventUtils$Frontend.getAddUIControlsEventName(undefined), (function (param) {
                          window.setTimeout((function (param) {
                                  Curry._1(setCurrentTourStep, (function (current) {
                                          return current + 1 | 0;
                                        }));
                                }), 0);
                        }));
                  eventEmitter.addListener(EventUtils$Frontend.getSelectUIControlEventName(undefined), (function (protocolName) {
                          window.setTimeout((function (param) {
                                  Curry._1(setCurrentTourStep, (function (current) {
                                          return current + 1 | 0;
                                        }));
                                }), 0);
                        }));
                  eventEmitter.addListener(EventUtils$Frontend.getSelectTreeNodeEventName(undefined), (function (title) {
                          if (title === "root" || Js_string.includes("Window", title) || Js_string.includes("窗口", title) || Js_string.includes("Button", title) || Js_string.includes("按钮", title)) {
                            return Curry._1(setCurrentTourStep, (function (current) {
                                          return current + 1 | 0;
                                        }));
                          }
                          
                        }));
                  eventEmitter.addListener(EventUtils$Frontend.getExpandInputCollapseEventName(undefined), (function (param) {
                          Curry._1(setCurrentTourStep, (function (current) {
                                  return current + 1 | 0;
                                }));
                        }));
                  eventEmitter.addListener(EventUtils$Frontend.getSelectInputInUIControlInspectorEventName(undefined), (function (inputName) {
                          if (inputName === "Input1") {
                            return Curry._1(setCurrentTourStep, (function (current) {
                                          return current + 1 | 0;
                                        }));
                          }
                          
                        }));
                  eventEmitter.addListener(EventUtils$Frontend.getAddInputEventName(undefined), (function (param) {
                          Curry._1(setCurrentTourStep, (function (current) {
                                  return current + 1 | 0;
                                }));
                        }));
                  eventEmitter.addListener(EventUtils$Frontend.getSelectInputInInputsEventName(undefined), (function (inputName) {
                          Curry._1(setCurrentTourStep, (function (current) {
                                  return current + 1 | 0;
                                }));
                        }));
                  eventEmitter.addListener(EventUtils$Frontend.getExpandActionCollapseEventName(undefined), (function (param) {
                          Curry._1(setCurrentTourStep, (function (current) {
                                  return current + 1 | 0;
                                }));
                        }));
                  eventEmitter.addListener(EventUtils$Frontend.getSelectActionInUIControlInspectorEventName(undefined), (function (inputName) {
                          if (inputName === "Action1") {
                            return Curry._1(setCurrentTourStep, (function (current) {
                                          return current + 1 | 0;
                                        }));
                          }
                          
                        }));
                  eventEmitter.addListener(EventUtils$Frontend.getAddActionEventName(undefined), (function (param) {
                          Curry._1(setCurrentTourStep, (function (current) {
                                  return current + 1 | 0;
                                }));
                        }));
                  eventEmitter.addListener(EventUtils$Frontend.getSelectActionInActionsEventName(undefined), (function (inputName) {
                          Curry._1(setCurrentTourStep, (function (current) {
                                  return current + 1 | 0;
                                }));
                        }));
                }), 5);
        }), []);
  if (isInCreateFromScratchTourPhase2) {
    return React.createElement(React.Fragment, undefined, GuideUtils$Frontend.buildSteps(undefined, match$1[0], GuideUtils$Frontend.buildCreateFromScratchStepData(undefined)), React.createElement(Antd.Tour, {
                    open: match$3[0],
                    current: match$2[0],
                    onClose: (function (param) {
                        Curry._1(setOpenTour, (function (param) {
                                return false;
                              }));
                        Curry._1(dispatchForElementAssembleStore, /* EndCreateFromScratchTourPhase2 */4);
                      }),
                    onChange: (function (current) {
                        var match = ArraySt$Meta3dCommonlib.find(buildCreateFromScratchTourStepAndStepMapData(undefined), (function (param) {
                                return param[0] === current;
                              }));
                        if (match !== undefined) {
                          var currentStep = match[1];
                          Curry._1(setCurrentStep, (function (param) {
                                  return currentStep;
                                }));
                        }
                        Curry._1(setCurrentTourStep, (function (param) {
                                return current;
                              }));
                      }),
                    steps: buildCreateFromScratchTourSteps(dispatchForAppStore, dispatchForElementAssembleStore, canvasWidthInputTarget, canvasHeightInputTarget, addUIControlButtonTarget, selectSceneViewUIControlTarget, rectWidthInputTarget, rectHeightInputTarget, selectedUIControlTarget, inputSelectTarget, actionSelectTarget, selectGameViewUIControlTarget, selectWindowUIControlTarget, selectButtonUIControlTarget, rectXInputTarget, rectYInputTarget, runButtonTarget, publishButtonTarget, publishModalTarget, assembleSpaceNavTarget, inputCollapseTarget, addInputButtonTarget, inputCodeEditTarget, actionCollapseTarget, addActionButtonTarget, actionCodeEditTarget)
                  }));
  } else {
    return null;
  }
}

var make = CreateFromScratchGuideInElementAssemble;

export {
  Method ,
  make ,
}
/*  Not a pure module */
