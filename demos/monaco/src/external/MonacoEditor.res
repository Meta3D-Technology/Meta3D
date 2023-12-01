// type monacoEditor

type editor

type monaco

type language = [#typescript]

type theme = [#"vs-dark"]

type options = {}

@module("react-monaco-editor") @react.component
external monacoEditor: (
  ~value: string,
  ~width: string=?,
  ~height: string=?,
  ~language: language=?,
  ~theme: theme=?,
  ~options: options=?,
  ~onChange: (string, ReactEvent.Form.t) => unit=?,
  ~editorDidMount: (editor, monaco) => unit=?,
  ~editorWillUnmount: (editor, monaco) => unit=?,
) => React.element = "default"

