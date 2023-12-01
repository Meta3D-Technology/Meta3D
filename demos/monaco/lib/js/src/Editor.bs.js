'use strict';

var React = require("react");
var ReactMonacoEditor = require("react-monaco-editor").default;

function onChange(newValue, $$event) {
  console.log(newValue);
}

function editorDidMount(editor, monaco) {
  console.log([
        "didmount",
        editor
      ]);
}

function editorWillUnmount(editor, monaco) {
  console.log("unmound");
}

var Method = {
  onChange: onChange,
  editorDidMount: editorDidMount,
  editorWillUnmount: editorWillUnmount
};

function Editor(Props) {
  return React.createElement(ReactMonacoEditor, {
              value: "let a = 1",
              width: "800",
              height: "600",
              language: "typescript",
              theme: "vs-dark",
              onChange: onChange,
              editorDidMount: editorDidMount,
              editorWillUnmount: editorWillUnmount
            });
}

var make = Editor;

exports.Method = Method;
exports.make = make;
/* react Not a pure module */
