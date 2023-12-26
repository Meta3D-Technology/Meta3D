

import * as Js_array from "../../../../../../../../../../../../node_modules/rescript/lib/es6/js_array.js";
import * as HierachyUtils$Frontend from "../utils/HierachyUtils.bs.js";
import * as ListSt$Meta3dCommonlib from "../../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ListSt.bs.js";
import * as ArraySt$Meta3dCommonlib from "../../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as OptionSt$Meta3dCommonlib from "../../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";

function _buildDefaultUIControlInspectorData(id, specific) {
  return {
          id: id,
          rect: {
            x: /* IntForRectField */{
              _0: 0
            },
            y: /* IntForRectField */{
              _0: 0
            },
            width: /* IntForRectField */{
              _0: 20
            },
            height: /* IntForRectField */{
              _0: 20
            }
          },
          specific: specific,
          isDraw: /* BoolForIsDraw */{
            _0: true
          },
          input: undefined,
          event: [],
          children: /* [] */0
        };
}

function _createState(param) {
  return {
          canvasData: {
            width: 0,
            height: 0
          },
          selectedUIControls: /* [] */0,
          parentUIControlId: undefined,
          inspectorCurrentUIControlId: undefined,
          selectedUIControlInspectorData: /* [] */0,
          elementContribute: undefined,
          customInputs: /* [] */0,
          customActions: /* [] */0,
          currentCustomInputName: undefined,
          currentCustomActionName: undefined,
          isInCreateFromScratchTourPhase2: false
        };
}

function _setUIControlInspectorData(state, setFunc, id) {
  return {
          canvasData: state.canvasData,
          selectedUIControls: state.selectedUIControls,
          parentUIControlId: state.parentUIControlId,
          inspectorCurrentUIControlId: state.inspectorCurrentUIControlId,
          selectedUIControlInspectorData: HierachyUtils$Frontend.mapSelectedUIControlData(setFunc, [
                (function (data) {
                    return data.id;
                  }),
                (function (data) {
                    return data.children;
                  }),
                (function (data, children) {
                    return {
                            id: data.id,
                            rect: data.rect,
                            specific: data.specific,
                            isDraw: data.isDraw,
                            input: data.input,
                            event: data.event,
                            children: children
                          };
                  })
              ], state.selectedUIControlInspectorData, id),
          elementContribute: state.elementContribute,
          customInputs: state.customInputs,
          customActions: state.customActions,
          currentCustomInputName: state.currentCustomInputName,
          currentCustomActionName: state.currentCustomActionName,
          isInCreateFromScratchTourPhase2: state.isInCreateFromScratchTourPhase2
        };
}

function _updateAllUIControlInspectorData(state, setFunc) {
  return {
          canvasData: state.canvasData,
          selectedUIControls: state.selectedUIControls,
          parentUIControlId: state.parentUIControlId,
          inspectorCurrentUIControlId: state.inspectorCurrentUIControlId,
          selectedUIControlInspectorData: HierachyUtils$Frontend.mapAllSelectedUIControlData(setFunc, [
                (function (data) {
                    return data.children;
                  }),
                (function (data, children) {
                    return {
                            id: data.id,
                            rect: data.rect,
                            specific: data.specific,
                            isDraw: data.isDraw,
                            input: data.input,
                            event: data.event,
                            children: children
                          };
                  })
              ], state.selectedUIControlInspectorData),
          elementContribute: state.elementContribute,
          customInputs: state.customInputs,
          customActions: state.customActions,
          currentCustomInputName: state.currentCustomInputName,
          currentCustomActionName: state.currentCustomActionName,
          isInCreateFromScratchTourPhase2: state.isInCreateFromScratchTourPhase2
        };
}

function _setActionData(state, id, eventName, actionNameOpt) {
  return _setUIControlInspectorData(state, (function (data) {
                var $$event = data.event;
                var tmp;
                if (ArraySt$Meta3dCommonlib.length($$event) === 0 && OptionSt$Meta3dCommonlib.isSome(actionNameOpt)) {
                  tmp = [{
                      eventName: eventName,
                      actionName: OptionSt$Meta3dCommonlib.getExn(actionNameOpt)
                    }];
                } else if (actionNameOpt !== undefined) {
                  if (ArraySt$Meta3dCommonlib.includesByFunc(data.event, (function (eventData) {
                            return eventData.eventName === eventName;
                          }))) {
                    tmp = ArraySt$Meta3dCommonlib.map(data.event, (function (eventData) {
                            if (eventData.eventName === eventName) {
                              return {
                                      eventName: eventName,
                                      actionName: actionNameOpt
                                    };
                            } else {
                              return eventData;
                            }
                          }));
                  } else {
                    var __x = data.event;
                    tmp = Js_array.concat([{
                            eventName: eventName,
                            actionName: actionNameOpt
                          }], __x);
                  }
                } else {
                  tmp = ArraySt$Meta3dCommonlib.filter(data.event, (function (eventData) {
                          return eventData.eventName !== eventName;
                        }));
                }
                return {
                        id: data.id,
                        rect: data.rect,
                        specific: data.specific,
                        isDraw: data.isDraw,
                        input: data.input,
                        event: tmp,
                        children: data.children
                      };
              }), id);
}

function _findParentUIControlId(param, selectedUIControls, id) {
  var match = OptionSt$Meta3dCommonlib.getExn(HierachyUtils$Frontend.findSelectedUIControlData(undefined, [
            (function (data) {
                return data.id;
              }),
            (function (data) {
                return data.children;
              })
          ], selectedUIControls, id));
  if (param[0](param[1](match.protocolConfigStr))) {
    return id;
  } else {
    return match.parentId;
  }
}

function _resetCurrent(state) {
  return {
          canvasData: state.canvasData,
          selectedUIControls: state.selectedUIControls,
          parentUIControlId: state.parentUIControlId,
          inspectorCurrentUIControlId: undefined,
          selectedUIControlInspectorData: state.selectedUIControlInspectorData,
          elementContribute: state.elementContribute,
          customInputs: state.customInputs,
          customActions: state.customActions,
          currentCustomInputName: undefined,
          currentCustomActionName: undefined,
          isInCreateFromScratchTourPhase2: state.isInCreateFromScratchTourPhase2
        };
}

var _resetInspector = _resetCurrent;

function _reset(state) {
  var init = _createState(undefined);
  return {
          canvasData: state.canvasData,
          selectedUIControls: init.selectedUIControls,
          parentUIControlId: init.parentUIControlId,
          inspectorCurrentUIControlId: init.inspectorCurrentUIControlId,
          selectedUIControlInspectorData: init.selectedUIControlInspectorData,
          elementContribute: init.elementContribute,
          customInputs: init.customInputs,
          customActions: init.customActions,
          currentCustomInputName: init.currentCustomInputName,
          currentCustomActionName: init.currentCustomActionName,
          isInCreateFromScratchTourPhase2: state.isInCreateFromScratchTourPhase2
        };
}

function reducer(state, action) {
  if (typeof action === "number") {
    switch (action) {
      case /* ResetWhenEnter */0 :
          return _reset(state);
      case /* ResetWhenSwitch */1 :
          return _resetCurrent(state);
      case /* SelectRootUIControl */2 :
          var init = _resetCurrent(state);
          return {
                  canvasData: init.canvasData,
                  selectedUIControls: init.selectedUIControls,
                  parentUIControlId: undefined,
                  inspectorCurrentUIControlId: undefined,
                  selectedUIControlInspectorData: init.selectedUIControlInspectorData,
                  elementContribute: init.elementContribute,
                  customInputs: init.customInputs,
                  customActions: init.customActions,
                  currentCustomInputName: init.currentCustomInputName,
                  currentCustomActionName: init.currentCustomActionName,
                  isInCreateFromScratchTourPhase2: init.isInCreateFromScratchTourPhase2
                };
      case /* StartCreateFromScratchTourPhase2 */3 :
          return {
                  canvasData: state.canvasData,
                  selectedUIControls: state.selectedUIControls,
                  parentUIControlId: state.parentUIControlId,
                  inspectorCurrentUIControlId: state.inspectorCurrentUIControlId,
                  selectedUIControlInspectorData: state.selectedUIControlInspectorData,
                  elementContribute: state.elementContribute,
                  customInputs: state.customInputs,
                  customActions: state.customActions,
                  currentCustomInputName: state.currentCustomInputName,
                  currentCustomActionName: state.currentCustomActionName,
                  isInCreateFromScratchTourPhase2: true
                };
      case /* EndCreateFromScratchTourPhase2 */4 :
          return {
                  canvasData: state.canvasData,
                  selectedUIControls: state.selectedUIControls,
                  parentUIControlId: state.parentUIControlId,
                  inspectorCurrentUIControlId: state.inspectorCurrentUIControlId,
                  selectedUIControlInspectorData: state.selectedUIControlInspectorData,
                  elementContribute: state.elementContribute,
                  customInputs: state.customInputs,
                  customActions: state.customActions,
                  currentCustomInputName: state.currentCustomInputName,
                  currentCustomActionName: state.currentCustomActionName,
                  isInCreateFromScratchTourPhase2: false
                };
      
    }
  } else {
    switch (action.TAG | 0) {
      case /* SelectUIControl */0 :
          var parentId = action._5;
          var id = action._0;
          var childUIControl_protocolIconBase64 = action._1;
          var childUIControl_protocolConfigStr = action._2;
          var childUIControl_displayName = action._3;
          var childUIControl_data = action._4;
          var childUIControl = {
            id: id,
            parentId: parentId,
            children: /* [] */0,
            protocolIconBase64: childUIControl_protocolIconBase64,
            protocolConfigStr: childUIControl_protocolConfigStr,
            displayName: childUIControl_displayName,
            data: childUIControl_data
          };
          var childUIControlInspector = _buildDefaultUIControlInspectorData(id, action._6);
          var init$1 = _resetCurrent(state);
          return {
                  canvasData: init$1.canvasData,
                  selectedUIControls: HierachyUtils$Frontend.addChildUIControlData([
                        (function (data) {
                            return data.id;
                          }),
                        (function (data) {
                            return data.children;
                          }),
                        (function (data, children) {
                            return {
                                    id: data.id,
                                    parentId: data.parentId,
                                    children: children,
                                    protocolIconBase64: data.protocolIconBase64,
                                    protocolConfigStr: data.protocolConfigStr,
                                    displayName: data.displayName,
                                    data: data.data
                                  };
                          })
                      ], state.selectedUIControls, childUIControl, parentId),
                  parentUIControlId: init$1.parentUIControlId,
                  inspectorCurrentUIControlId: init$1.inspectorCurrentUIControlId,
                  selectedUIControlInspectorData: HierachyUtils$Frontend.addChildUIControlData([
                        (function (data) {
                            return data.id;
                          }),
                        (function (data) {
                            return data.children;
                          }),
                        (function (data, children) {
                            return {
                                    id: data.id,
                                    rect: data.rect,
                                    specific: data.specific,
                                    isDraw: data.isDraw,
                                    input: data.input,
                                    event: data.event,
                                    children: children
                                  };
                          })
                      ], state.selectedUIControlInspectorData, childUIControlInspector, parentId),
                  elementContribute: init$1.elementContribute,
                  customInputs: init$1.customInputs,
                  customActions: init$1.customActions,
                  currentCustomInputName: init$1.currentCustomInputName,
                  currentCustomActionName: init$1.currentCustomActionName,
                  isInCreateFromScratchTourPhase2: init$1.isInCreateFromScratchTourPhase2
                };
      case /* UnSelectUIControlAndChildren */1 :
          var id$1 = action._0;
          return {
                  canvasData: state.canvasData,
                  selectedUIControls: HierachyUtils$Frontend.removeUIControlData([
                        (function (data) {
                            return data.id;
                          }),
                        (function (data) {
                            return data.children;
                          }),
                        (function (data, children) {
                            return {
                                    id: data.id,
                                    parentId: data.parentId,
                                    children: children,
                                    protocolIconBase64: data.protocolIconBase64,
                                    protocolConfigStr: data.protocolConfigStr,
                                    displayName: data.displayName,
                                    data: data.data
                                  };
                          })
                      ], state.selectedUIControls, id$1),
                  parentUIControlId: state.parentUIControlId,
                  inspectorCurrentUIControlId: state.inspectorCurrentUIControlId,
                  selectedUIControlInspectorData: HierachyUtils$Frontend.removeUIControlData([
                        (function (data) {
                            return data.id;
                          }),
                        (function (data) {
                            return data.children;
                          }),
                        (function (data, children) {
                            return {
                                    id: data.id,
                                    rect: data.rect,
                                    specific: data.specific,
                                    isDraw: data.isDraw,
                                    input: data.input,
                                    event: data.event,
                                    children: children
                                  };
                          })
                      ], state.selectedUIControlInspectorData, id$1),
                  elementContribute: state.elementContribute,
                  customInputs: state.customInputs,
                  customActions: state.customActions,
                  currentCustomInputName: state.currentCustomInputName,
                  currentCustomActionName: state.currentCustomActionName,
                  isInCreateFromScratchTourPhase2: state.isInCreateFromScratchTourPhase2
                };
      case /* SelectSelectedUIControl */2 :
          var id$2 = action._1;
          var init$2 = _resetCurrent(state);
          return {
                  canvasData: init$2.canvasData,
                  selectedUIControls: init$2.selectedUIControls,
                  parentUIControlId: _findParentUIControlId(action._0, state.selectedUIControls, id$2),
                  inspectorCurrentUIControlId: id$2,
                  selectedUIControlInspectorData: init$2.selectedUIControlInspectorData,
                  elementContribute: init$2.elementContribute,
                  customInputs: init$2.customInputs,
                  customActions: init$2.customActions,
                  currentCustomInputName: init$2.currentCustomInputName,
                  currentCustomActionName: init$2.currentCustomActionName,
                  isInCreateFromScratchTourPhase2: init$2.isInCreateFromScratchTourPhase2
                };
      case /* SetSpecificData */3 :
          var specific = action._1;
          return _setUIControlInspectorData(state, (function (data) {
                        return {
                                id: data.id,
                                rect: data.rect,
                                specific: specific,
                                isDraw: data.isDraw,
                                input: data.input,
                                event: data.event,
                                children: data.children
                              };
                      }), action._0);
      case /* SetRect */4 :
          var rect = action._1;
          return _setUIControlInspectorData(state, (function (data) {
                        return {
                                id: data.id,
                                rect: rect,
                                specific: data.specific,
                                isDraw: data.isDraw,
                                input: data.input,
                                event: data.event,
                                children: data.children
                              };
                      }), action._0);
      case /* SetIsDraw */5 :
          var isDraw = action._1;
          return _setUIControlInspectorData(state, (function (data) {
                        return {
                                id: data.id,
                                rect: data.rect,
                                specific: data.specific,
                                isDraw: isDraw,
                                input: data.input,
                                event: data.event,
                                children: data.children
                              };
                      }), action._0);
      case /* SetInput */6 :
          var inputNameOpt = action._1;
          return _setUIControlInspectorData(state, (function (data) {
                        return {
                                id: data.id,
                                rect: data.rect,
                                specific: data.specific,
                                isDraw: data.isDraw,
                                input: OptionSt$Meta3dCommonlib.map(inputNameOpt, (function (inputName) {
                                        return {
                                                inputName: inputName
                                              };
                                      })),
                                event: data.event,
                                children: data.children
                              };
                      }), action._0);
      case /* SetAction */7 :
          var match = action._1;
          return _setActionData(state, action._0, match[0], match[1]);
      case /* SetElementContribute */8 :
          return {
                  canvasData: state.canvasData,
                  selectedUIControls: state.selectedUIControls,
                  parentUIControlId: state.parentUIControlId,
                  inspectorCurrentUIControlId: state.inspectorCurrentUIControlId,
                  selectedUIControlInspectorData: state.selectedUIControlInspectorData,
                  elementContribute: action._0,
                  customInputs: state.customInputs,
                  customActions: state.customActions,
                  currentCustomInputName: state.currentCustomInputName,
                  currentCustomActionName: state.currentCustomActionName,
                  isInCreateFromScratchTourPhase2: state.isInCreateFromScratchTourPhase2
                };
      case /* Import */9 :
          return {
                  canvasData: state.canvasData,
                  selectedUIControls: action._0,
                  parentUIControlId: state.parentUIControlId,
                  inspectorCurrentUIControlId: state.inspectorCurrentUIControlId,
                  selectedUIControlInspectorData: action._1,
                  elementContribute: state.elementContribute,
                  customInputs: state.customInputs,
                  customActions: state.customActions,
                  currentCustomInputName: state.currentCustomInputName,
                  currentCustomActionName: state.currentCustomActionName,
                  isInCreateFromScratchTourPhase2: state.isInCreateFromScratchTourPhase2
                };
      case /* SetCanvasData */10 :
          return {
                  canvasData: action._0,
                  selectedUIControls: state.selectedUIControls,
                  parentUIControlId: state.parentUIControlId,
                  inspectorCurrentUIControlId: state.inspectorCurrentUIControlId,
                  selectedUIControlInspectorData: state.selectedUIControlInspectorData,
                  elementContribute: state.elementContribute,
                  customInputs: state.customInputs,
                  customActions: state.customActions,
                  currentCustomInputName: state.currentCustomInputName,
                  currentCustomActionName: state.currentCustomActionName,
                  isInCreateFromScratchTourPhase2: state.isInCreateFromScratchTourPhase2
                };
      case /* AddCustomInput */11 :
          return {
                  canvasData: state.canvasData,
                  selectedUIControls: state.selectedUIControls,
                  parentUIControlId: state.parentUIControlId,
                  inspectorCurrentUIControlId: state.inspectorCurrentUIControlId,
                  selectedUIControlInspectorData: state.selectedUIControlInspectorData,
                  elementContribute: state.elementContribute,
                  customInputs: ListSt$Meta3dCommonlib.push(state.customInputs, action._0),
                  customActions: state.customActions,
                  currentCustomInputName: state.currentCustomInputName,
                  currentCustomActionName: state.currentCustomActionName,
                  isInCreateFromScratchTourPhase2: state.isInCreateFromScratchTourPhase2
                };
      case /* AddCustomAction */12 :
          return {
                  canvasData: state.canvasData,
                  selectedUIControls: state.selectedUIControls,
                  parentUIControlId: state.parentUIControlId,
                  inspectorCurrentUIControlId: state.inspectorCurrentUIControlId,
                  selectedUIControlInspectorData: state.selectedUIControlInspectorData,
                  elementContribute: state.elementContribute,
                  customInputs: state.customInputs,
                  customActions: ListSt$Meta3dCommonlib.push(state.customActions, action._0),
                  currentCustomInputName: state.currentCustomInputName,
                  currentCustomActionName: state.currentCustomActionName,
                  isInCreateFromScratchTourPhase2: state.isInCreateFromScratchTourPhase2
                };
      case /* RemoveCustomInput */13 :
          var inputName = action._0;
          var state_canvasData = state.canvasData;
          var state_selectedUIControls = state.selectedUIControls;
          var state_parentUIControlId = state.parentUIControlId;
          var state_inspectorCurrentUIControlId = state.inspectorCurrentUIControlId;
          var state_selectedUIControlInspectorData = state.selectedUIControlInspectorData;
          var state_elementContribute = state.elementContribute;
          var state_customInputs = ListSt$Meta3dCommonlib.filter(state.customInputs, (function (param) {
                  return param.name !== inputName;
                }));
          var state_customActions = state.customActions;
          var state_currentCustomInputName = state.currentCustomInputName;
          var state_currentCustomActionName = state.currentCustomActionName;
          var state_isInCreateFromScratchTourPhase2 = state.isInCreateFromScratchTourPhase2;
          var state$1 = {
            canvasData: state_canvasData,
            selectedUIControls: state_selectedUIControls,
            parentUIControlId: state_parentUIControlId,
            inspectorCurrentUIControlId: state_inspectorCurrentUIControlId,
            selectedUIControlInspectorData: state_selectedUIControlInspectorData,
            elementContribute: state_elementContribute,
            customInputs: state_customInputs,
            customActions: state_customActions,
            currentCustomInputName: state_currentCustomInputName,
            currentCustomActionName: state_currentCustomActionName,
            isInCreateFromScratchTourPhase2: state_isInCreateFromScratchTourPhase2
          };
          return _updateAllUIControlInspectorData(state$1, (function (data) {
                        return {
                                id: data.id,
                                rect: data.rect,
                                specific: data.specific,
                                isDraw: data.isDraw,
                                input: OptionSt$Meta3dCommonlib.bind(data.input, (function (input) {
                                        if (input.inputName === inputName) {
                                          return ;
                                        } else {
                                          return input;
                                        }
                                      })),
                                event: data.event,
                                children: data.children
                              };
                      }));
      case /* RemoveCustomAction */14 :
          var actionName = action._0;
          var state_canvasData$1 = state.canvasData;
          var state_selectedUIControls$1 = state.selectedUIControls;
          var state_parentUIControlId$1 = state.parentUIControlId;
          var state_inspectorCurrentUIControlId$1 = state.inspectorCurrentUIControlId;
          var state_selectedUIControlInspectorData$1 = state.selectedUIControlInspectorData;
          var state_elementContribute$1 = state.elementContribute;
          var state_customInputs$1 = state.customInputs;
          var state_customActions$1 = ListSt$Meta3dCommonlib.filter(state.customActions, (function (param) {
                  return param.name !== actionName;
                }));
          var state_currentCustomInputName$1 = state.currentCustomInputName;
          var state_currentCustomActionName$1 = state.currentCustomActionName;
          var state_isInCreateFromScratchTourPhase2$1 = state.isInCreateFromScratchTourPhase2;
          var state$2 = {
            canvasData: state_canvasData$1,
            selectedUIControls: state_selectedUIControls$1,
            parentUIControlId: state_parentUIControlId$1,
            inspectorCurrentUIControlId: state_inspectorCurrentUIControlId$1,
            selectedUIControlInspectorData: state_selectedUIControlInspectorData$1,
            elementContribute: state_elementContribute$1,
            customInputs: state_customInputs$1,
            customActions: state_customActions$1,
            currentCustomInputName: state_currentCustomInputName$1,
            currentCustomActionName: state_currentCustomActionName$1,
            isInCreateFromScratchTourPhase2: state_isInCreateFromScratchTourPhase2$1
          };
          return _updateAllUIControlInspectorData(state$2, (function (data) {
                        return {
                                id: data.id,
                                rect: data.rect,
                                specific: data.specific,
                                isDraw: data.isDraw,
                                input: data.input,
                                event: ArraySt$Meta3dCommonlib.filter(data.event, (function ($$event) {
                                        return $$event.actionName !== actionName;
                                      })),
                                children: data.children
                              };
                      }));
      case /* UpdateCustomInputFileStr */15 :
          var newTranspiledCode = action._3;
          var newOriginCode = action._2;
          var newInputName = action._1;
          var oldInputName = action._0;
          var state_canvasData$2 = state.canvasData;
          var state_selectedUIControls$2 = state.selectedUIControls;
          var state_parentUIControlId$2 = state.parentUIControlId;
          var state_inspectorCurrentUIControlId$2 = state.inspectorCurrentUIControlId;
          var state_selectedUIControlInspectorData$2 = state.selectedUIControlInspectorData;
          var state_elementContribute$2 = state.elementContribute;
          var state_customInputs$2 = ListSt$Meta3dCommonlib.map(state.customInputs, (function (customInput) {
                  if (customInput.name === oldInputName) {
                    return {
                            name: newInputName,
                            originFileStr: newOriginCode,
                            transpiledFileStr: newTranspiledCode
                          };
                  } else {
                    return customInput;
                  }
                }));
          var state_customActions$2 = state.customActions;
          var state_currentCustomInputName$2 = state.currentCustomInputName;
          var state_currentCustomActionName$2 = state.currentCustomActionName;
          var state_isInCreateFromScratchTourPhase2$2 = state.isInCreateFromScratchTourPhase2;
          var state$3 = {
            canvasData: state_canvasData$2,
            selectedUIControls: state_selectedUIControls$2,
            parentUIControlId: state_parentUIControlId$2,
            inspectorCurrentUIControlId: state_inspectorCurrentUIControlId$2,
            selectedUIControlInspectorData: state_selectedUIControlInspectorData$2,
            elementContribute: state_elementContribute$2,
            customInputs: state_customInputs$2,
            customActions: state_customActions$2,
            currentCustomInputName: state_currentCustomInputName$2,
            currentCustomActionName: state_currentCustomActionName$2,
            isInCreateFromScratchTourPhase2: state_isInCreateFromScratchTourPhase2$2
          };
          return _updateAllUIControlInspectorData(state$3, (function (data) {
                        return {
                                id: data.id,
                                rect: data.rect,
                                specific: data.specific,
                                isDraw: data.isDraw,
                                input: OptionSt$Meta3dCommonlib.map(data.input, (function (param) {
                                        var inputName = param.inputName;
                                        return {
                                                inputName: inputName === oldInputName ? newInputName : inputName
                                              };
                                      })),
                                event: data.event,
                                children: data.children
                              };
                      }));
      case /* UpdateCustomActionFileStr */16 :
          var newTranspiledCode$1 = action._3;
          var newOriginCode$1 = action._2;
          var newActionName = action._1;
          var oldActionName = action._0;
          var state_canvasData$3 = state.canvasData;
          var state_selectedUIControls$3 = state.selectedUIControls;
          var state_parentUIControlId$3 = state.parentUIControlId;
          var state_inspectorCurrentUIControlId$3 = state.inspectorCurrentUIControlId;
          var state_selectedUIControlInspectorData$3 = state.selectedUIControlInspectorData;
          var state_elementContribute$3 = state.elementContribute;
          var state_customInputs$3 = state.customInputs;
          var state_customActions$3 = ListSt$Meta3dCommonlib.map(state.customActions, (function (customAction) {
                  if (customAction.name === oldActionName) {
                    return {
                            name: newActionName,
                            originFileStr: newOriginCode$1,
                            transpiledFileStr: newTranspiledCode$1
                          };
                  } else {
                    return customAction;
                  }
                }));
          var state_currentCustomInputName$3 = state.currentCustomInputName;
          var state_currentCustomActionName$3 = state.currentCustomActionName;
          var state_isInCreateFromScratchTourPhase2$3 = state.isInCreateFromScratchTourPhase2;
          var state$4 = {
            canvasData: state_canvasData$3,
            selectedUIControls: state_selectedUIControls$3,
            parentUIControlId: state_parentUIControlId$3,
            inspectorCurrentUIControlId: state_inspectorCurrentUIControlId$3,
            selectedUIControlInspectorData: state_selectedUIControlInspectorData$3,
            elementContribute: state_elementContribute$3,
            customInputs: state_customInputs$3,
            customActions: state_customActions$3,
            currentCustomInputName: state_currentCustomInputName$3,
            currentCustomActionName: state_currentCustomActionName$3,
            isInCreateFromScratchTourPhase2: state_isInCreateFromScratchTourPhase2$3
          };
          return _updateAllUIControlInspectorData(state$4, (function (data) {
                        return {
                                id: data.id,
                                rect: data.rect,
                                specific: data.specific,
                                isDraw: data.isDraw,
                                input: data.input,
                                event: ArraySt$Meta3dCommonlib.map(data.event, (function (action) {
                                        return {
                                                eventName: action.eventName,
                                                actionName: action.actionName === oldActionName ? newActionName : action.actionName
                                              };
                                      })),
                                children: data.children
                              };
                      }));
      case /* SelectCustomInput */17 :
          var init$3 = _resetCurrent(state);
          return {
                  canvasData: init$3.canvasData,
                  selectedUIControls: init$3.selectedUIControls,
                  parentUIControlId: init$3.parentUIControlId,
                  inspectorCurrentUIControlId: init$3.inspectorCurrentUIControlId,
                  selectedUIControlInspectorData: init$3.selectedUIControlInspectorData,
                  elementContribute: init$3.elementContribute,
                  customInputs: init$3.customInputs,
                  customActions: init$3.customActions,
                  currentCustomInputName: action._0,
                  currentCustomActionName: init$3.currentCustomActionName,
                  isInCreateFromScratchTourPhase2: init$3.isInCreateFromScratchTourPhase2
                };
      case /* SelectCustomAction */18 :
          var init$4 = _resetCurrent(state);
          return {
                  canvasData: init$4.canvasData,
                  selectedUIControls: init$4.selectedUIControls,
                  parentUIControlId: init$4.parentUIControlId,
                  inspectorCurrentUIControlId: init$4.inspectorCurrentUIControlId,
                  selectedUIControlInspectorData: init$4.selectedUIControlInspectorData,
                  elementContribute: init$4.elementContribute,
                  customInputs: init$4.customInputs,
                  customActions: init$4.customActions,
                  currentCustomInputName: init$4.currentCustomInputName,
                  currentCustomActionName: action._0,
                  isInCreateFromScratchTourPhase2: init$4.isInCreateFromScratchTourPhase2
                };
      case /* SetCustom */19 :
          return {
                  canvasData: state.canvasData,
                  selectedUIControls: state.selectedUIControls,
                  parentUIControlId: state.parentUIControlId,
                  inspectorCurrentUIControlId: state.inspectorCurrentUIControlId,
                  selectedUIControlInspectorData: state.selectedUIControlInspectorData,
                  elementContribute: state.elementContribute,
                  customInputs: action._0,
                  customActions: action._1,
                  currentCustomInputName: state.currentCustomInputName,
                  currentCustomActionName: state.currentCustomActionName,
                  isInCreateFromScratchTourPhase2: state.isInCreateFromScratchTourPhase2
                };
      
    }
  }
}

var initialState = _createState(undefined);

export {
  _buildDefaultUIControlInspectorData ,
  _createState ,
  _setUIControlInspectorData ,
  _updateAllUIControlInspectorData ,
  _setActionData ,
  _findParentUIControlId ,
  _resetCurrent ,
  _resetInspector ,
  _reset ,
  reducer ,
  initialState ,
}
/* initialState Not a pure module */
