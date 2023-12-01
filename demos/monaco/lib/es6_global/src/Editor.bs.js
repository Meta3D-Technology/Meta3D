

import * as Curry from "../../../../../node_modules/rescript/lib/es6/curry.js";
import * as React from "react";
import * as Js_promise from "../../../../../node_modules/rescript/lib/es6/js_promise.js";
import * as Caml_option from "../../../../../node_modules/rescript/lib/es6/caml_option.js";
import ReactMonacoEditor from "react-monaco-editor";

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
  return Js_promise.then_((function (proxy) {
                tsProxyRef.current = proxy;
                return Promise.resolve(undefined);
              }), __x$1);
}

function editorWillUnmount(editor, monaco) {
  console.log("unmound");
  return Promise.resolve(undefined);
}

var Method = {
  onChange: onChange,
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
              value: "let a = 1",
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

export {
  Method ,
  make ,
}
/* react Not a pure module */
