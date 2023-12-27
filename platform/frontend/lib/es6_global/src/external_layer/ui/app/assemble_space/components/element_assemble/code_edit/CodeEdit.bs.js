

import * as Curry from "../../../../../../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as React from "react";
import * as Caml_array from "../../../../../../../../../../../../node_modules/rescript/lib/es6/caml_array.js";
import * as Js_promise from "../../../../../../../../../../../../node_modules/rescript/lib/es6/js_promise.js";
import * as Caml_option from "../../../../../../../../../../../../node_modules/rescript/lib/es6/caml_option.js";
import * as Loading$Frontend from "../../../../loading/components/Loading.bs.js";
import * as MessageUtils$Frontend from "../../../../utils/utils/MessageUtils.bs.js";
import * as ArraySt$Meta3dCommonlib from "../../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as OptionSt$Meta3dCommonlib from "../../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";
import Meta3dReactMonacoEditor from "meta3d-react-monaco-editor";

import 'antd/dist/reset.css'
;

function onChange(getNewCodeFunc, param, newValue, $$event) {
  var match = param[0].current;
  var match$1 = param[1].current;
  if (match === undefined) {
    return Promise.resolve(undefined);
  }
  if (match$1 === undefined) {
    return Promise.resolve(undefined);
  }
  var editor = Caml_option.valFromOption(match$1);
  var tsProxy = Caml_option.valFromOption(match);
  window.setTimeout((function (param) {
          var __x = Curry._1(tsProxy.getEmitOutput, editor.getModel().uri.toString());
          Js_promise.then_((function (r) {
                  Curry._2(getNewCodeFunc, newValue, Caml_array.get(r.outputFiles, 0).text);
                  return Promise.resolve(undefined);
                }), __x);
        }), 0);
  return Promise.resolve(undefined);
}

function _wrapDTs(dts, moduleName) {
  return "declare module \"" + moduleName + "\"{\n      " + dts + "\n    }";
}

function _addTypeLibs(editor, monaco) {
  var data = [
    [
      "static/dts/immutable/src/immutable.d.ts",
      "immutable"
    ],
    [
      "static/dts/meta3d-type/src/Index.d.ts",
      "meta3d-type"
    ],
    [
      "static/dts/meta3d-editor-whole-protocol/src/service/ServiceType.d.ts",
      "meta3d-editor-whole-protocol/src/service/ServiceType"
    ]
  ];
  return ArraySt$Meta3dCommonlib.traverseReducePromiseM(data, (function (param, param$1) {
                var moduleName = param$1[1];
                var __x = window.fetch(param$1[0]);
                var __x$1 = Js_promise.then_((function (param) {
                        return Promise.resolve(param.text());
                      }), __x);
                return Js_promise.then_((function (dts) {
                              var dts$1 = _wrapDTs(dts, moduleName);
                              monaco.languages.typescript.typescriptDefaults.addExtraLib(dts$1);
                              return Promise.resolve(undefined);
                            }), __x$1);
              }), undefined);
}

function editorDidMount(param, editor, monaco) {
  var tsProxyRef = param[0];
  param[1].current = Caml_option.some(editor);
  var __x = monaco.languages.typescript.getTypeScriptWorker();
  var __x$1 = Js_promise.then_((function (worker) {
          return worker(editor.getModel().uri);
        }), __x);
  var __x$2 = Js_promise.then_((function (proxy) {
          tsProxyRef.current = proxy;
          return Promise.resolve(undefined);
        }), __x$1);
  return Js_promise.then_((function (param) {
                return _addTypeLibs(editor, monaco);
              }), __x$2);
}

function editorWillUnmount(editor, monaco) {
  return Promise.resolve(undefined);
}

var getMonaco = (function (){
return globalThis["meta3d_monaco"]
});

var setMonaco = (function (monaco){
globalThis["meta3d_monaco"] = monaco
});

var deferLoad = (function (){
return import(
    /* webpackPrefetch: true */"monaco-editor/esm/vs/editor/editor.api.js"
  ).then(value =>{
setMonaco(value)

return value
  })
});

var Method = {
  onChange: onChange,
  _wrapDTs: _wrapDTs,
  _addTypeLibs: _addTypeLibs,
  editorDidMount: editorDidMount,
  editorWillUnmount: editorWillUnmount,
  getMonaco: getMonaco,
  setMonaco: setMonaco,
  deferLoad: deferLoad
};

function CodeEdit(Props) {
  var service = Props.service;
  var code = Props.code;
  var getNewCodeFunc = Props.getNewCodeFunc;
  var tsProxy = Curry._1(service.react.useRef, undefined);
  var editor = Curry._1(service.react.useRef, undefined);
  var match = Curry._1(service.react.useState, (function (param) {
          
        }));
  var setMonaco = match[1];
  var monaco = match[0];
  service.react.useEffect1((function (param) {
          MessageUtils$Frontend.showCatchedErrorMessage((function (param) {
                  var value = OptionSt$Meta3dCommonlib.fromNullable(Curry._1(getMonaco, undefined));
                  var __x;
                  if (value !== undefined) {
                    __x = Promise.resolve(Caml_option.valFromOption(value));
                  } else {
                    var __x$1 = Curry._1(deferLoad, undefined);
                    __x = Js_promise.then_((function (value) {
                            return Promise.resolve(value);
                          }), __x$1);
                  }
                  var __x$2 = Js_promise.then_((function (monaco) {
                          Curry._1(setMonaco, (function (param) {
                                  return Caml_option.some(monaco);
                                }));
                          return Promise.resolve(undefined);
                        }), __x);
                  Js_promise.$$catch((function (e) {
                          return service.console.errorWithExn(e, undefined);
                        }), __x$2);
                }), 5);
        }), []);
  if (monaco === undefined) {
    return React.createElement(Loading$Frontend.make, {
                text: "加载中，请稍候"
              });
  }
  var partial_arg = [
    tsProxy,
    editor
  ];
  var partial_arg$1 = [
    tsProxy,
    editor
  ];
  return React.createElement(Meta3dReactMonacoEditor, {
              monaco: Caml_option.valFromOption(monaco),
              value: code,
              width: "100%",
              height: "100%",
              language: "typescript",
              theme: "vs-dark",
              onChange: (function (param, param$1) {
                  return onChange(getNewCodeFunc, partial_arg, param, param$1);
                }),
              editorDidMount: (function (param, param$1) {
                  return editorDidMount(partial_arg$1, param, param$1);
                }),
              editorWillUnmount: editorWillUnmount
            });
}

var make = CodeEdit;

export {
  Method ,
  make ,
}
/*  Not a pure module */
