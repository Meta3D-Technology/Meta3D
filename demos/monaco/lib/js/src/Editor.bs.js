'use strict';

var Curry = require("rescript/lib/js/curry.js");
var React = require("react");
var Js_promise = require("rescript/lib/js/js_promise.js");
var Caml_option = require("rescript/lib/js/caml_option.js");
var ReactMonacoEditor = require("react-monaco-editor").default;

function onChange(param, newValue, $$event) {
  var match = param[0].current;
  var match$1 = param[1].current;
  if (match === undefined) {
    return Promise.resolve(undefined);
  }
  if (match$1 === undefined) {
    return Promise.resolve(undefined);
  }
  var __x = Curry._1(Caml_option.valFromOption(match).getEmitOutput, Caml_option.valFromOption(match$1).getModel().uri.toString());
  return Js_promise.then_((function (r) {
                console.log(r.outputFiles);
                return Promise.resolve(undefined);
              }), __x);
}

function _wrapDTs(dts) {
  return "declare module \"meta3d-type\"{\n      " + dts + "\n    }";
}

function _addMeta3dTypeLib(editor, monaco) {
  var __x = window.fetch("static/meta3d-type/src/Index.ts");
  var __x$1 = Js_promise.then_((function (param) {
          return Promise.resolve(param.text());
        }), __x);
  return Js_promise.then_((function (dts) {
                var dts$1 = _wrapDTs(dts);
                return monaco.languages.typescript.typescriptDefaults.addExtraLib(dts$1);
              }), __x$1);
}

function editorDidMount(param, editor, monaco) {
  var tsProxyRef = param[0];
  console.log([
        "didmount",
        editor
      ]);
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
                return _addMeta3dTypeLib(editor, monaco);
              }), __x$2);
}

function editorWillUnmount(editor, monaco) {
  console.log("unmound");
  return Promise.resolve(undefined);
}

var Method = {
  onChange: onChange,
  _wrapDTs: _wrapDTs,
  _addMeta3dTypeLib: _addMeta3dTypeLib,
  editorDidMount: editorDidMount,
  editorWillUnmount: editorWillUnmount
};

function Editor(Props) {
  var tsProxy = React.useRef(undefined);
  var editor = React.useRef(undefined);
  var partial_arg = [
    tsProxy,
    editor
  ];
  var partial_arg$1 = [
    tsProxy,
    editor
  ];
  return React.createElement(ReactMonacoEditor, {
              value: "import { api } from \"meta3d-type\"\n    \nexport let getContribute = (api:api) => {\n    return {\n        inputName: \"RunStopButtonInput\",\n        func: (meta3dState) => {\n            let runState = api.action.getActionState(meta3dState, \"Run\")\n\n            if (api.nullable.isNullable(runState)) {\n                return Promise.resolve(false)\n            }\n\n            runState = api.nullable.getExn(runState)\n\n            return Promise.resolve(runState.isRun)\n        }\n    }\n}\n\n  ",
              width: "800",
              height: "600",
              language: "typescript",
              theme: "vs-dark",
              onChange: (function (param, param$1) {
                  return onChange(partial_arg, param, param$1);
                }),
              editorDidMount: (function (param, param$1) {
                  return editorDidMount(partial_arg$1, param, param$1);
                }),
              editorWillUnmount: editorWillUnmount
            });
}

var make = Editor;

exports.Method = Method;
exports.make = make;
/* react Not a pure module */
