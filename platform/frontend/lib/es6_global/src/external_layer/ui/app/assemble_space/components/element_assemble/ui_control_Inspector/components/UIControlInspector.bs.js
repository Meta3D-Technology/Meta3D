

import * as Antd from "antd";
import * as Curry from "../../../../../../../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as React from "react";
import * as Icons from "@ant-design/icons";
import * as EventUtils$Frontend from "../../../../../utils/EventUtils.bs.js";
import * as ReduxUtils$Frontend from "../../../../../utils/utils/ReduxUtils.bs.js";
import * as SelectUtils$Frontend from "../../../../../utils/utils/SelectUtils.bs.js";
import * as UploadUtils$Frontend from "../../../utils/UploadUtils.bs.js";
import * as MessageUtils$Frontend from "../../../../../utils/utils/MessageUtils.bs.js";
import * as ListSt$Meta3dCommonlib from "../../../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ListSt.bs.js";
import * as SpecificUtils$Frontend from "../../utils/SpecificUtils.bs.js";
import * as TextareaUtils$Frontend from "../../utils/TextareaUtils.bs.js";
import * as ArraySt$Meta3dCommonlib from "../../../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as ElementMRUtils$Frontend from "../../element_visual/utils/ElementMRUtils.bs.js";
import * as OptionSt$Meta3dCommonlib from "../../../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";
import * as NullableSt$Meta3dCommonlib from "../../../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/NullableSt.bs.js";
import * as SelectedContributesForElementUtils$Frontend from "../../utils/SelectedContributesForElementUtils.bs.js";

import 'antd/dist/reset.css'
;

function setRectX(dispatch, id, rect, x) {
  return Curry._1(dispatch, {
              TAG: /* SetRect */4,
              _0: id,
              _1: {
                x: x,
                y: rect.y,
                width: rect.width,
                height: rect.height
              }
            });
}

function setRectY(dispatch, id, rect, y) {
  return Curry._1(dispatch, {
              TAG: /* SetRect */4,
              _0: id,
              _1: {
                x: rect.x,
                y: y,
                width: rect.width,
                height: rect.height
              }
            });
}

function setRectWidth(dispatch, id, rect, width) {
  return Curry._1(dispatch, {
              TAG: /* SetRect */4,
              _0: id,
              _1: {
                x: rect.x,
                y: rect.y,
                width: width,
                height: rect.height
              }
            });
}

function setRectHeight(dispatch, id, rect, height) {
  return Curry._1(dispatch, {
              TAG: /* SetRect */4,
              _0: id,
              _1: {
                x: rect.x,
                y: rect.y,
                width: rect.width,
                height: height
              }
            });
}

function setIsDraw(dispatch, id, isDraw) {
  return Curry._1(dispatch, {
              TAG: /* SetIsDraw */5,
              _0: id,
              _1: isDraw
            });
}

function buildInputNameSelectValues(service, selectedContributes, uiControlProtocolName) {
  return MessageUtils$Frontend.showCatchedErrorMessageAndReturn((function () {
                return ArraySt$Meta3dCommonlib.map(ListSt$Meta3dCommonlib.toArray(SelectedContributesForElementUtils$Frontend.getInputs(selectedContributes)), (function (param) {
                              return service.meta3d.execGetContributeFunc(param.data.contributeFuncData).inputName;
                            }));
              }), (function () {
                return [];
              }), 5);
}

function setInput(dispatch, id, inputName) {
  return Curry._1(dispatch, {
              TAG: /* SetInput */6,
              _0: id,
              _1: SelectUtils$Frontend.isEmptySelectOptionValue(inputName) ? undefined : inputName
            });
}

function setAction(dispatch, id, eventName, actionName) {
  return Curry._1(dispatch, {
              TAG: /* SetAction */7,
              _0: id,
              _1: [
                eventName,
                SelectUtils$Frontend.isEmptySelectOptionValue(actionName) ? undefined : actionName
              ]
            });
}

function buildActionNameSelectValues(service, actions) {
  return MessageUtils$Frontend.showCatchedErrorMessageAndReturn((function () {
                return ArraySt$Meta3dCommonlib.map(actions, (function (param) {
                              return service.meta3d.execGetContributeFunc(param.data.contributeFuncData).actionName;
                            }));
              }), (function () {
                return [];
              }), 5);
}

function _getRectFieldIntValue(rectField) {
  return rectField._0;
}

function buildRectField(dispatch, setRectField, id, label, rect, rectField, ref) {
  return React.createElement(Antd.Space, {
              direction: "horizontal",
              children: null
            }, React.createElement("span", undefined, "" + label + ": "), React.createElement(Antd.InputNumber, {
                  ref: ref,
                  onChange: (function (value) {
                      Curry._4(setRectField, dispatch, id, rect, /* IntForRectField */{
                            _0: value
                          });
                    }),
                  value: OptionSt$Meta3dCommonlib.getWithDefault(rectField._0, 0),
                  step: "1"
                }));
}

function getIsDrawBoolValue(isDraw) {
  return isDraw._0;
}

function _setSpecificData(dispatch, specific, id, i, value, type_) {
  return Curry._1(dispatch, {
              TAG: /* SetSpecificData */3,
              _0: id,
              _1: ArraySt$Meta3dCommonlib.mapi(specific, (function (specificData, j) {
                      if (j === i) {
                        return {
                                name: specificData.name,
                                type_: specificData.type_,
                                value: value
                              };
                      } else {
                        return specificData;
                      }
                    }))
            });
}

function buildSpecific(service, dispatch, id, specific) {
  return React.createElement(React.Fragment, undefined, ArraySt$Meta3dCommonlib.mapi(specific, (function (param, i) {
                    var value = param.value;
                    var type_ = param.type_;
                    var name = param.name;
                    return React.createElement(Antd.Card, {
                                title: name,
                                key: name,
                                children: type_ === "menuItems" ? (
                                    TextareaUtils$Frontend.isNotShowTextareaForTest(undefined) ? null : React.createElement(Antd.Space, {
                                            direction: "horizontal",
                                            children: React.createElement(Antd.Input.TextArea, {
                                                  value: SpecificUtils$Frontend.convertValueToString(SpecificUtils$Frontend.getSpecificDataValue(value), type_),
                                                  onChange: (function (e) {
                                                      MessageUtils$Frontend.swallowCatchedError((function (param) {
                                                              _setSpecificData(dispatch, specific, id, i, /* SpecicFieldDataValue */{
                                                                    _0: SpecificUtils$Frontend.convertStringToValue(EventUtils$Frontend.getEventTargetValue(e), type_)
                                                                  }, type_);
                                                            }), "不是有效的json");
                                                    })
                                                })
                                          })
                                  ) : (
                                    type_ === "select" ? SelectUtils$Frontend.buildSelectWithKeysAndWithoutEmpty((function (selectedValue) {
                                              _setSpecificData(dispatch, specific, id, i, /* SpecicFieldDataValue */{
                                                    _0: {
                                                      selected: selectedValue,
                                                      data: SpecificUtils$Frontend.getSpecificDataValue(value).data
                                                    }
                                                  }, type_);
                                            }), SpecificUtils$Frontend.getSpecificDataValue(value).selected, ArraySt$Meta3dCommonlib.map(SpecificUtils$Frontend.getSpecificDataValue(value).data, (function (valueData) {
                                                  return valueData.key;
                                                })), ArraySt$Meta3dCommonlib.map(SpecificUtils$Frontend.getSpecificDataValue(value).data, (function (valueData) {
                                                  return valueData.value;
                                                }))) : (
                                        type_ === "string" ? React.createElement(Antd.Input, {
                                                value: SpecificUtils$Frontend.convertValueToString(SpecificUtils$Frontend.getSpecificDataValue(value), type_),
                                                onChange: (function (e) {
                                                    var value = SpecificUtils$Frontend.convertStringToValue(EventUtils$Frontend.getEventTargetValue(e), type_);
                                                    if (value === "") {
                                                      return MessageUtils$Frontend.warn("不能为空", undefined);
                                                    } else {
                                                      return _setSpecificData(dispatch, specific, id, i, /* SpecicFieldDataValue */{
                                                                  _0: value
                                                                }, type_);
                                                    }
                                                  }),
                                                key: name
                                              }) : (
                                            type_ === "imageBase64" ? React.createElement(Antd.Space, {
                                                    direction: "horizontal",
                                                    children: null
                                                  }, React.createElement(Antd.Upload, {
                                                        showUploadList: false,
                                                        children: React.createElement(Antd.Button, {
                                                              icon: React.createElement(Icons.UploadOutlined, {}),
                                                              children: "上传图片"
                                                            }),
                                                        beforeUpload: (function (file) {
                                                            return UploadUtils$Frontend.handleUploadImage((function (file, imageBase64) {
                                                                          _setSpecificData(dispatch, specific, id, i, /* SpecicFieldDataValue */{
                                                                                _0: imageBase64
                                                                              }, type_);
                                                                        }), (function (param, param$1) {
                                                                          
                                                                        }), (function ($$event, param) {
                                                                          service.console.error("error", undefined);
                                                                        }), file);
                                                          }),
                                                        listType: "pictureCard"
                                                      }), NullableSt$Meta3dCommonlib.isNullable(SpecificUtils$Frontend.getSpecificDataValue(value)) ? null : React.createElement(Antd.Image, {
                                                          preview: true,
                                                          width: 40,
                                                          height: 40,
                                                          src: SpecificUtils$Frontend.convertValueToString(SpecificUtils$Frontend.getSpecificDataValue(value), type_)
                                                        })) : (
                                                type_ === "number" ? React.createElement(Antd.InputNumber, {
                                                        onChange: (function (value) {
                                                            _setSpecificData(dispatch, specific, id, i, /* SpecicFieldDataValue */{
                                                                  _0: value
                                                                }, type_);
                                                          }),
                                                        value: SpecificUtils$Frontend.getSpecificDataValue(value),
                                                        step: "0.0001",
                                                        key: name
                                                      }) : SelectUtils$Frontend.buildSelectWithoutEmpty((function (value) {
                                                          _setSpecificData(dispatch, specific, id, i, /* SpecicFieldDataValue */{
                                                                _0: SpecificUtils$Frontend.convertStringToValue(value, type_)
                                                              }, type_);
                                                        }), SpecificUtils$Frontend.convertValueToString(SpecificUtils$Frontend.getSpecificDataValue(value), type_), [
                                                        "true",
                                                        "false"
                                                      ])
                                              )
                                          )
                                      )
                                  )
                              });
                  })));
}

function useSelector(param) {
  return param.eventEmitter;
}

var Method = {
  setRectX: setRectX,
  setRectY: setRectY,
  setRectWidth: setRectWidth,
  setRectHeight: setRectHeight,
  setIsDraw: setIsDraw,
  buildInputNameSelectValues: buildInputNameSelectValues,
  setInput: setInput,
  getActions: SelectedContributesForElementUtils$Frontend.getActions,
  setAction: setAction,
  buildActionNameSelectValues: buildActionNameSelectValues,
  _getRectFieldIntValue: _getRectFieldIntValue,
  buildRectField: buildRectField,
  getIsDrawBoolValue: getIsDrawBoolValue,
  _setSpecificData: _setSpecificData,
  buildSpecific: buildSpecific,
  useSelector: useSelector
};

function UIControlInspector(Props) {
  var service = Props.service;
  var currentSelectedUIControl = Props.currentSelectedUIControl;
  var currentSelectedUIControlInspectorData = Props.currentSelectedUIControlInspectorData;
  var selectedContributes = Props.selectedContributes;
  var rectXInputTarget = Props.rectXInputTarget;
  var rectYInputTarget = Props.rectYInputTarget;
  var rectWidthInputTarget = Props.rectWidthInputTarget;
  var rectHeightInputTarget = Props.rectHeightInputTarget;
  var inputSelectTarget = Props.inputSelectTarget;
  var actionSelectTarget = Props.actionSelectTarget;
  var dispatch = ReduxUtils$Frontend.ElementAssemble.useDispatch(service.react.useDispatch);
  var eventEmitter = service.react.useAllSelector(useSelector);
  var match = Curry._1(service.react.useState, (function (param) {
          return [];
        }));
  var setInputNameSelectValues = match[1];
  var match$1 = Curry._1(service.react.useState, (function (param) {
          return [];
        }));
  var rect = currentSelectedUIControlInspectorData.rect;
  var $$event = currentSelectedUIControlInspectorData.event;
  var id = currentSelectedUIControlInspectorData.id;
  var setActionNameSelectValues = match$1[1];
  var actionNameSelectValues = match$1[0];
  var actions = ListSt$Meta3dCommonlib.toArray(SelectedContributesForElementUtils$Frontend.getActions(selectedContributes));
  var uiControlConfigLib = service.meta3d.serializeUIControlProtocolConfigLib(currentSelectedUIControl.protocolConfigStr);
  var uiControlProtocolName = currentSelectedUIControl.data.contributePackageData.protocol.name;
  service.react.useEffect1((function (param) {
          Curry._1(setInputNameSelectValues, (function (param) {
                  return buildInputNameSelectValues(service, selectedContributes, uiControlProtocolName);
                }));
          Curry._1(setActionNameSelectValues, (function (param) {
                  return buildActionNameSelectValues(service, actions);
                }));
        }), [selectedContributes]);
  return React.createElement(Antd.Space, {
              direction: "vertical",
              size: "middle",
              children: null
            }, service.ui.buildTitle(2, "Rect", undefined), React.createElement(Antd.Space, {
                  direction: "vertical",
                  children: null
                }, buildRectField(dispatch, setRectX, id, "X", rect, rect.x, rectXInputTarget), buildRectField(dispatch, setRectY, id, "Y", rect, rect.y, rectYInputTarget), buildRectField(dispatch, setRectWidth, id, "宽", rect, rect.width, rectWidthInputTarget), buildRectField(dispatch, setRectHeight, id, "高", rect, rect.height, rectHeightInputTarget)), React.createElement(Antd.Space, {
                  direction: "vertical",
                  size: "middle",
                  children: null
                }, service.ui.buildTitle(2, "Input", undefined), React.createElement(React.Fragment, undefined, React.createElement("section", {
                          ref: inputSelectTarget
                        }, SelectUtils$Frontend.buildSelect((function (value) {
                                setInput(dispatch, id, value);
                                eventEmitter.emit(EventUtils$Frontend.getSelectInputInUIControlInspectorEventName(undefined), value);
                              }), OptionSt$Meta3dCommonlib.getWithDefault(OptionSt$Meta3dCommonlib.map(currentSelectedUIControlInspectorData.input, (function (input) {
                                        return input.inputName;
                                      })), SelectUtils$Frontend.buildEmptySelectOptionValue(undefined)), match[0]))), service.ui.buildTitle(2, "Specific", undefined), buildSpecific(service, dispatch, id, currentSelectedUIControlInspectorData.specific), service.ui.buildTitle(2, "Event", undefined), React.createElement(Antd.List, {
                      dataSource: service.meta3d.getUIControlSupportedEventNames(uiControlConfigLib),
                      renderItem: (function (eventName) {
                          var value = NullableSt$Meta3dCommonlib.getWithDefault(ElementMRUtils$Frontend.getActionName($$event, eventName), SelectUtils$Frontend.buildEmptySelectOptionValue(undefined));
                          return React.createElement(Antd.List.Item, {
                                      children: React.createElement(Antd.Space, {
                                            direction: "vertical",
                                            size: "middle",
                                            children: React.createElement(Antd.Space, {
                                                  direction: "horizontal",
                                                  size: "middle",
                                                  children: null
                                                }, React.createElement("span", undefined, "" + eventName + ": "), React.createElement("section", {
                                                      ref: actionSelectTarget
                                                    }, SelectUtils$Frontend.buildSelect((function (value) {
                                                            setAction(dispatch, id, eventName, value);
                                                            eventEmitter.emit(EventUtils$Frontend.getSelectActionInUIControlInspectorEventName(undefined), value);
                                                          }), value, actionNameSelectValues)))
                                          }),
                                      key: eventName
                                    });
                        })
                    })));
}

var make = UIControlInspector;

export {
  Method ,
  make ,
}
/*  Not a pure module */
