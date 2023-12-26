

import * as Antd from "antd";
import * as Curry from "../../../../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as React from "react";
import * as KeyUtils$Frontend from "./KeyUtils.bs.js";
import * as ArraySt$Meta3dCommonlib from "../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";

var _isNotShowSelectForTest = (function (){
return globalThis.isNotShowSelectForTest == true
});

function buildEmptySelectOptionValue(param) {
  return "empty";
}

function isEmptySelectOptionValue(value) {
  if (value === "empty") {
    return true;
  } else {
    return value === undefined;
  }
}

function buildSelect(onChange, defaultValue, values) {
  if (Curry._1(_isNotShowSelectForTest, undefined)) {
    return null;
  } else {
    return React.createElement(Antd.Select, {
                size: "large",
                popupMatchSelectWidth: 200,
                defaultValue: defaultValue,
                onChange: onChange,
                children: null,
                key: KeyUtils$Frontend.generateUniqueKey(function (prim) {
                      return Math.random();
                    })
              }, React.createElement(Antd.Select.Option, {
                    value: "empty",
                    children: "empty",
                    key: "empty"
                  }), ArraySt$Meta3dCommonlib.map(values, (function (value) {
                      return React.createElement(Antd.Select.Option, {
                                  value: value,
                                  children: value,
                                  key: value
                                });
                    })));
  }
}

function buildSelectWithoutEmpty(onChange, defaultValue, values) {
  if (Curry._1(_isNotShowSelectForTest, undefined)) {
    return null;
  } else {
    return React.createElement(Antd.Select, {
                defaultValue: defaultValue,
                onChange: onChange,
                children: ArraySt$Meta3dCommonlib.map(values, (function (value) {
                        return React.createElement(Antd.Select.Option, {
                                    value: value,
                                    children: value,
                                    key: value
                                  });
                      })),
                key: KeyUtils$Frontend.generateUniqueKey(function (prim) {
                      return Math.random();
                    })
              });
  }
}

function buildSelectWithKeysAndWithoutEmpty(onChange, defaultValue, keys, values) {
  if (Curry._1(_isNotShowSelectForTest, undefined)) {
    return null;
  } else {
    return React.createElement(Antd.Select, {
                defaultValue: defaultValue,
                onChange: onChange,
                children: ArraySt$Meta3dCommonlib.mapi(values, (function (value, i) {
                        return React.createElement(Antd.Select.Option, {
                                    value: value,
                                    children: ArraySt$Meta3dCommonlib.getExn(keys, i),
                                    key: ArraySt$Meta3dCommonlib.getExn(keys, i)
                                  });
                      })),
                key: KeyUtils$Frontend.generateUniqueKey(function (prim) {
                      return Math.random();
                    })
              });
  }
}

function buildSelect2(param) {
  return null;
}

export {
  _isNotShowSelectForTest ,
  buildEmptySelectOptionValue ,
  isEmptySelectOptionValue ,
  buildSelect ,
  buildSelectWithoutEmpty ,
  buildSelectWithKeysAndWithoutEmpty ,
  buildSelect2 ,
}
/* antd Not a pure module */
