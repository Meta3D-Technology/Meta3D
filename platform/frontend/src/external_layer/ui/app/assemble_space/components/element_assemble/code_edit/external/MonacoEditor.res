type proxy

type editor

type monaco

type language = [#typescript]

type theme = [#"vs-dark"]

type options = {}

@module("meta3d-react-monaco-editor") @react.component
external monacoEditor: (
  ~monaco: 'a=?,
  ~value: string,
  ~width: string=?,
  ~height: string=?,
  ~language: language=?,
  ~theme: theme=?,
  ~options: options=?,
  ~onChange: (string, ReactEvent.Form.t) => Js.Promise.t<unit>=?,
  ~editorDidMount: (editor, monaco) => Js.Promise.t<unit>=?,
  ~editorWillUnmount: (editor, monaco) => Js.Promise.t<unit>=?,
) => React.element = "default"
