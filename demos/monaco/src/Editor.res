module Method = {
  let onChange = (newValue, event) => {
    Js.log(newValue)
  }

  let editorDidMount = (editor, monaco) => {
    Js.log(("didmount", editor))

    let editor = editor->Obj.magic

    // editor["focus"]()
  }

  let editorWillUnmount = (editor, monaco) => {
    Js.log("unmound")
  }
}

@react.component
let make = () => {
  let code = {j`let a = 1`}

  <MonacoEditor.monacoEditor
    width="800"
    height="600"
    language=#typescript
    theme=#"vs-dark"
    value={code}
    // options={options}
    onChange={Method.onChange}
    editorDidMount={Method.editorDidMount}
    editorWillUnmount={Method.editorWillUnmount}
  />
}
