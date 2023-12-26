

import * as Antd from "antd";
import * as Curry from "../../../../../../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as React from "react";
import * as Publish$Frontend from "../../ap_assemble/publish/components/Publish.bs.js";
import * as UserUtils$Frontend from "../../../../utils/UserUtils.bs.js";
import * as EventUtils$Frontend from "../../../../utils/EventUtils.bs.js";
import * as GuideUtils$Frontend from "../../../../utils/GuideUtils.bs.js";
import * as ReduxUtils$Frontend from "../../../../utils/utils/ReduxUtils.bs.js";
import * as CustomInputs$Frontend from "../custom_inputs/components/CustomInputs.bs.js";
import * as CustomActions$Frontend from "../custom_actions/components/CustomActions.bs.js";
import * as DocGuideUtils$Frontend from "../../../../guide/doc_guide/utils/DocGuideUtils.bs.js";
import * as ElementVisual$Frontend from "../element_visual/components/ElementVisual.bs.js";
import * as ListSt$Meta3dCommonlib from "../../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ListSt.bs.js";
import * as ArraySt$Meta3dCommonlib from "../../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as CanvasController$Frontend from "../../ap_assemble/canvas_controller/components/CanvasController.bs.js";
import * as ElementInspector$Frontend from "../element_inspector/components/ElementInspector.bs.js";
import * as InitPackageUtils$Frontend from "../../../../utils/InitPackageUtils.bs.js";
import * as NullableSt$Meta3dCommonlib from "../../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/NullableSt.bs.js";
import * as SelectedUIControls$Frontend from "../selected_ui_controls/components/SelectedUIControls.bs.js";
import * as CustomInputCodeEdit$Frontend from "../custom_input_code_edit/CustomInputCodeEdit.bs.js";
import * as CustomActionCodeEdit$Frontend from "../custom_action_code_edit/CustomActionCodeEdit.bs.js";
import * as AssembleSpaceStoreType$Frontend from "../../../../utils/utils/assemble_space/AssembleSpaceStoreType.bs.js";
import * as RunElementVisualController$Frontend from "../run_element_visual_controller/components/RunElementVisualController.bs.js";
import * as SelectedContributesConvertUtils$Frontend from "../../utils/SelectedContributesConvertUtils.bs.js";
import * as CreateFromScratchGuideInElementAssemble$Frontend from "../../../../guide/create_from_scratch_guide/components/CreateFromScratchGuideInElementAssemble.bs.js";

import 'antd/dist/reset.css'
;

function resetAllAssemble(dispatch) {
  return Curry._1(dispatch, {
              RE_EXN_ID: AssembleSpaceStoreType$Frontend.ResetWhenSwitch
            });
}

function _initPackage(dispatchForApAssembleStore, selectedPackagesFromMarket) {
  ListSt$Meta3dCommonlib.forEach(selectedPackagesFromMarket, (function (param) {
          var protocol = param.protocol;
          var id = param.id;
          if (protocol.name === InitPackageUtils$Frontend.getEngineWholePackageProtocolName(undefined)) {
            return Curry._1(dispatchForApAssembleStore, {
                        TAG: /* StorePackageInApp */19,
                        _0: id
                      });
          } else if (protocol.name === InitPackageUtils$Frontend.getEditorWholePackageProtocolName(undefined)) {
            return Curry._1(dispatchForApAssembleStore, {
                        TAG: /* StartPackage */3,
                        _0: id
                      });
          } else {
            return ;
          }
        }));
}

function init(dispatchForApAssembleStore, selectedContributesFromMarket, selectedPackagesFromMarket) {
  Curry._1(dispatchForApAssembleStore, {
        TAG: /* SetContributesAndPackages */22,
        _0: SelectedContributesConvertUtils$Frontend.convertSelectedContributesFromAssembleToApAssemble(selectedContributesFromMarket),
        _1: selectedPackagesFromMarket
      });
  _initPackage(dispatchForApAssembleStore, selectedPackagesFromMarket);
  Curry._1(dispatchForApAssembleStore, {
        TAG: /* MarkIsPassDependencyGraphCheck */17,
        _0: true
      });
}

function useSelector(param) {
  var assembleSpaceState = param.assembleSpaceState;
  var elementAssembleState = assembleSpaceState.elementAssembleState;
  return [
          [
            assembleSpaceState.apAssembleState.selectedContributes,
            elementAssembleState.currentCustomInputName,
            elementAssembleState.currentCustomActionName,
            elementAssembleState.isInCreateFromScratchTourPhase2
          ],
          param.eventEmitter
        ];
}

var Method = {
  resetAllAssemble: resetAllAssemble,
  _initPackage: _initPackage,
  init: init,
  useSelector: useSelector
};

function ElementAssemble(Props) {
  var service = Props.service;
  var account = Props.account;
  var selectedContributesFromMarket = Props.selectedContributesFromMarket;
  var selectedPackagesFromMarket = Props.selectedPackagesFromMarket;
  var assembleSpaceNavTarget = Props.assembleSpaceNavTarget;
  var dispatch = Curry._1(service.react.useDispatch, undefined);
  Curry._1(service.app.useDispatch, undefined);
  var dispatchForApAssembleStore = ReduxUtils$Frontend.ApAssemble.useDispatch(service.react.useDispatch);
  ReduxUtils$Frontend.ElementAssemble.useDispatch(service.react.useDispatch);
  var match = service.react.useAllSelector(useSelector);
  var eventEmitter = match[1];
  var match$1 = match[0];
  var isInCreateFromScratchTourPhase2 = match$1[3];
  var currentCustomActionName = match$1[2];
  var currentCustomInputName = match$1[1];
  var selectedContributes = match$1[0];
  var match$2 = Curry._1(service.react.useState, (function (param) {
          return false;
        }));
  var setIsInit = match$2[1];
  var canvasWidthInputTarget = React.useRef(NullableSt$Meta3dCommonlib.getEmpty(undefined));
  var canvasHeightInputTarget = React.useRef(NullableSt$Meta3dCommonlib.getEmpty(undefined));
  var addUIControlButtonTarget = React.useRef(NullableSt$Meta3dCommonlib.getEmpty(undefined));
  var selectSceneViewUIControlTarget = React.useRef(NullableSt$Meta3dCommonlib.getEmpty(undefined));
  var rectWidthInputTarget = React.useRef(NullableSt$Meta3dCommonlib.getEmpty(undefined));
  var rectHeightInputTarget = React.useRef(NullableSt$Meta3dCommonlib.getEmpty(undefined));
  var selectedUIControlTarget = React.useRef(NullableSt$Meta3dCommonlib.getEmpty(undefined));
  var inputSelectTarget = React.useRef(NullableSt$Meta3dCommonlib.getEmpty(undefined));
  var actionSelectTarget = React.useRef(NullableSt$Meta3dCommonlib.getEmpty(undefined));
  var selectGameViewUIControlTarget = React.useRef(NullableSt$Meta3dCommonlib.getEmpty(undefined));
  var selectWindowUIControlTarget = React.useRef(NullableSt$Meta3dCommonlib.getEmpty(undefined));
  var selectButtonUIControlTarget = React.useRef(NullableSt$Meta3dCommonlib.getEmpty(undefined));
  var rectXInputTarget = React.useRef(NullableSt$Meta3dCommonlib.getEmpty(undefined));
  var rectYInputTarget = React.useRef(NullableSt$Meta3dCommonlib.getEmpty(undefined));
  var runButtonTarget = React.useRef(NullableSt$Meta3dCommonlib.getEmpty(undefined));
  var publishButtonTarget = React.useRef(NullableSt$Meta3dCommonlib.getEmpty(undefined));
  var publishModalTarget = React.useRef(NullableSt$Meta3dCommonlib.getEmpty(undefined));
  var inputCollapseTarget = React.useRef(NullableSt$Meta3dCommonlib.getEmpty(undefined));
  var addInputButtonTarget = React.useRef(NullableSt$Meta3dCommonlib.getEmpty(undefined));
  var inputCodeEditTarget = React.useRef(NullableSt$Meta3dCommonlib.getEmpty(undefined));
  var actionCollapseTarget = React.useRef(NullableSt$Meta3dCommonlib.getEmpty(undefined));
  var addActionButtonTarget = React.useRef(NullableSt$Meta3dCommonlib.getEmpty(undefined));
  var actionCodeEditTarget = React.useRef(NullableSt$Meta3dCommonlib.getEmpty(undefined));
  Curry._1(service.react.useEffectOnce, (function (param) {
          Curry._1(dispatch, {
                RE_EXN_ID: AssembleSpaceStoreType$Frontend.ResetWhenSwitch
              });
          return [
                  undefined,
                  undefined
                ];
        }));
  Curry._1(service.react.useEffectOnce, (function (param) {
          if (!UserUtils$Frontend.isAdmin(account)) {
            init(dispatchForApAssembleStore, selectedContributesFromMarket, selectedPackagesFromMarket);
          }
          Curry._1(setIsInit, (function (param) {
                  return true;
                }));
          return [
                  undefined,
                  undefined
                ];
        }));
  if (!match$2[0]) {
    return "初始化...";
  }
  var tmp;
  var exit = 0;
  if (currentCustomInputName !== undefined) {
    if (currentCustomActionName !== undefined) {
      exit = 1;
    } else {
      tmp = React.createElement(Antd.Layout.Content, {
            ref: inputCodeEditTarget,
            children: React.createElement(CustomInputCodeEdit$Frontend.make, {
                  service: service,
                  currentCustomInputName: currentCustomInputName
                }),
            style: {
              height: "100%",
              minHeight: "600px",
              width: "100%"
            }
          });
    }
  } else if (currentCustomActionName !== undefined) {
    tmp = React.createElement(Antd.Layout.Content, {
          ref: actionCodeEditTarget,
          children: React.createElement(CustomActionCodeEdit$Frontend.make, {
                service: service,
                currentCustomActionName: currentCustomActionName
              }),
          style: {
            height: "100%",
            minHeight: "600px",
            width: "100%"
          }
        });
  } else {
    exit = 1;
  }
  if (exit === 1) {
    tmp = React.createElement(Antd.Layout, {
          children: null
        }, React.createElement(Antd.Layout.Content, {
              children: React.createElement(ElementVisual$Frontend.make, {
                    service: service,
                    account: account,
                    selectedContributes: selectedContributes
                  })
            }), React.createElement(Antd.Layout.Sider, {
              theme: "light",
              children: React.createElement(ElementInspector$Frontend.make, {
                    service: service,
                    account: account,
                    selectedContributes: selectedContributes,
                    rectXInputTarget: rectXInputTarget,
                    rectYInputTarget: rectYInputTarget,
                    rectWidthInputTarget: rectWidthInputTarget,
                    rectHeightInputTarget: rectHeightInputTarget,
                    inputSelectTarget: inputSelectTarget,
                    actionSelectTarget: actionSelectTarget
                  })
            }));
  }
  return React.createElement(Antd.Layout, {
              children: null
            }, React.createElement(Antd.Layout.Content, {
                  children: null
                }, React.createElement(CreateFromScratchGuideInElementAssemble$Frontend.make, {
                      service: service,
                      canvasWidthInputTarget: canvasWidthInputTarget,
                      canvasHeightInputTarget: canvasHeightInputTarget,
                      addUIControlButtonTarget: addUIControlButtonTarget,
                      selectSceneViewUIControlTarget: selectSceneViewUIControlTarget,
                      rectWidthInputTarget: rectWidthInputTarget,
                      rectHeightInputTarget: rectHeightInputTarget,
                      selectedUIControlTarget: selectedUIControlTarget,
                      inputSelectTarget: inputSelectTarget,
                      actionSelectTarget: actionSelectTarget,
                      selectGameViewUIControlTarget: selectGameViewUIControlTarget,
                      selectWindowUIControlTarget: selectWindowUIControlTarget,
                      selectButtonUIControlTarget: selectButtonUIControlTarget,
                      rectXInputTarget: rectXInputTarget,
                      rectYInputTarget: rectYInputTarget,
                      runButtonTarget: runButtonTarget,
                      publishButtonTarget: publishButtonTarget,
                      publishModalTarget: publishModalTarget,
                      assembleSpaceNavTarget: assembleSpaceNavTarget,
                      inputCollapseTarget: inputCollapseTarget,
                      addInputButtonTarget: addInputButtonTarget,
                      inputCodeEditTarget: inputCodeEditTarget,
                      actionCollapseTarget: actionCollapseTarget,
                      addActionButtonTarget: addActionButtonTarget,
                      actionCodeEditTarget: actionCodeEditTarget
                    }), React.createElement(Antd.Space, {
                      direction: "horizontal",
                      size: "small",
                      children: null
                    }, UserUtils$Frontend.isAdmin(account) ? null : React.createElement(Publish$Frontend.make, {
                            service: service,
                            account: account,
                            publishButtonTarget: publishButtonTarget,
                            publishModalTarget: publishModalTarget
                          }), React.createElement(RunElementVisualController$Frontend.make, {
                          service: service,
                          account: account,
                          selectedContributes: selectedContributes,
                          runButtonTarget: runButtonTarget
                        }), React.createElement(CanvasController$Frontend.make, {
                          service: service,
                          canvasWidthInputTarget: canvasWidthInputTarget,
                          canvasHeightInputTarget: canvasHeightInputTarget
                        }))), React.createElement(Antd.Layout, {
                  children: null
                }, React.createElement(Antd.Layout.Sider, {
                      theme: "light",
                      children: React.createElement(Antd.Collapse, {
                            defaultActiveKey: ["1"],
                            onChange: (function (key) {
                                if (isInCreateFromScratchTourPhase2) {
                                  if (ArraySt$Meta3dCommonlib.includes(key, "2")) {
                                    return eventEmitter.emit(EventUtils$Frontend.getExpandInputCollapseEventName(undefined), 1);
                                  } else if (ArraySt$Meta3dCommonlib.includes(key, "3")) {
                                    return eventEmitter.emit(EventUtils$Frontend.getExpandActionCollapseEventName(undefined), 1);
                                  } else {
                                    return ;
                                  }
                                } else if (ArraySt$Meta3dCommonlib.includes(key, "2") && !GuideUtils$Frontend.readIsFinishShowInput(undefined)) {
                                  return DocGuideUtils$Frontend.ShowInput.openDocDrawer(dispatch);
                                } else if (ArraySt$Meta3dCommonlib.includes(key, "3") && !GuideUtils$Frontend.readIsFinishShowAction(undefined)) {
                                  return DocGuideUtils$Frontend.ShowAction.openDocDrawer(dispatch);
                                } else {
                                  return ;
                                }
                              }),
                            children: null
                          }, React.createElement(Antd.Collapse.Panel, {
                                header: "Selected UI Controls",
                                key: "1",
                                children: React.createElement(SelectedUIControls$Frontend.make, {
                                      service: service,
                                      selectedContributes: selectedContributes,
                                      addUIControlButtonTarget: addUIControlButtonTarget,
                                      selectSceneViewUIControlTarget: selectSceneViewUIControlTarget,
                                      selectedUIControlTarget: selectedUIControlTarget,
                                      selectGameViewUIControlTarget: selectGameViewUIControlTarget,
                                      selectWindowUIControlTarget: selectWindowUIControlTarget,
                                      selectButtonUIControlTarget: selectButtonUIControlTarget
                                    })
                              }), React.createElement(Antd.Collapse.Panel, {
                                ref: inputCollapseTarget,
                                header: "Inputs",
                                key: "2",
                                children: React.createElement(CustomInputs$Frontend.make, {
                                      service: service,
                                      addInputButtonTarget: addInputButtonTarget
                                    })
                              }), React.createElement(Antd.Collapse.Panel, {
                                ref: actionCollapseTarget,
                                header: "Actions",
                                key: "3",
                                children: React.createElement(CustomActions$Frontend.make, {
                                      service: service,
                                      addActionButtonTarget: addActionButtonTarget
                                    })
                              }))
                    }), React.createElement(Antd.Layout.Content, {
                      children: tmp
                    })));
}

var make = ElementAssemble;

export {
  Method ,
  make ,
}
/*  Not a pure module */
