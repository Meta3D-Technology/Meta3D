

import * as Antd from "antd";
import * as Curry from "../../../../../../../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as React from "react";
import * as ReduxUtils$Frontend from "../../../../../utils/utils/ReduxUtils.bs.js";

import 'antd/dist/reset.css'
;

function _dispatchAction(canvasData, dispatch) {
  return Curry._1(dispatch, {
              TAG: /* SetCanvasData */10,
              _0: canvasData
            });
}

function _setData(dispatch, buildCanvasDataFunc, canvasData) {
  var canvasData$1 = Curry._1(buildCanvasDataFunc, canvasData);
  return Curry._1(dispatch, {
              TAG: /* SetCanvasData */10,
              _0: canvasData$1
            });
}

function setWidth(dispatch, canvasData, width) {
  return Curry._1(dispatch, {
              TAG: /* SetCanvasData */10,
              _0: {
                width: width,
                height: canvasData.height
              }
            });
}

function setHeight(dispatch, canvasData, height) {
  return Curry._1(dispatch, {
              TAG: /* SetCanvasData */10,
              _0: {
                width: canvasData.width,
                height: height
              }
            });
}

function useSelector(param) {
  return param.canvasData;
}

var Method = {
  _dispatchAction: _dispatchAction,
  _setData: _setData,
  setWidth: setWidth,
  setHeight: setHeight,
  useSelector: useSelector
};

function CanvasController(Props) {
  var service = Props.service;
  var canvasWidthInputTarget = Props.canvasWidthInputTarget;
  var canvasHeightInputTarget = Props.canvasHeightInputTarget;
  var dispatch = ReduxUtils$Frontend.ElementAssemble.useDispatch(service.react.useDispatch);
  var canvasData = ReduxUtils$Frontend.ElementAssemble.useSelector(service.react.useSelector, useSelector);
  return React.createElement(Antd.Space, {
              direction: "horizontal",
              size: "small",
              children: null
            }, React.createElement(Antd.Typography.Text, {
                  children: "画布大小："
                }), React.createElement(Antd.InputNumber, {
                  ref: canvasWidthInputTarget,
                  onChange: (function (value) {
                      setWidth(dispatch, canvasData, value);
                    }),
                  value: canvasData.width,
                  step: "1"
                }), React.createElement(Antd.InputNumber, {
                  ref: canvasHeightInputTarget,
                  onChange: (function (value) {
                      setHeight(dispatch, canvasData, value);
                    }),
                  value: canvasData.height,
                  step: "1"
                }));
}

var make = CanvasController;

export {
  Method ,
  make ,
}
/*  Not a pure module */
