module Method = {
  let onChange = (
    (
      tsProxyRef: React.ref<option<MonacoEditor.proxy>>,
      editorRef: React.ref<option<MonacoEditor.editor>>,
    ),
    newValue,
    event,
  ) => {
    // Js.log(newValue)

    switch (tsProxyRef.current, editorRef.current) {
    | (Some(tsProxy), Some(editor)) =>
      let tsProxy = tsProxy->Obj.magic
      let editor = editor->Obj.magic

      tsProxy["getEmitOutput"](editor["getModel"](.)["uri"]["toString"](.))->Js.Promise.then_(
        r => {
          Js.log(r["outputFiles"])

          Js.Promise.resolve()
        },
        // Js.log(r["outputFiles"][0]["text"])

        _,
      )

    | _ => Js.Promise.resolve()
    }
  }

  let editorDidMount = (
    (
      tsProxyRef: React.ref<option<MonacoEditor.proxy>>,
      editorRef: React.ref<option<MonacoEditor.editor>>,
    ),
    editor,
    monaco,
  ) => {
    Js.log(("didmount", editor))

    let editor = editor->Obj.magic
    let monaco = monaco->Obj.magic

    // setEditor(_ => editor->Some)
    editorRef.current = editor->Some

    // editor["focus"]()

    //     var editor = monaco.editor.create(...etc...);
    // var tsProxy: ts.IMonacoTypeScriptServiceProxy;

    monaco["languages"]["typescript"]["getTypeScriptWorker"](.)
    ->Js.Promise.then_(worker => {
      worker(. editor["getModel"](.)["uri"])
    }, _)
    ->Js.Promise.then_(
      proxy => {
        tsProxyRef.current = proxy

        Js.Promise.resolve()
      },
      //   setTsProxy(_ => proxy->Some)

      _,
    )
  }

  let editorWillUnmount = (editor, monaco) => {
    Js.log("unmound")

    Js.Promise.resolve()
  }
}

@react.component
let make = () => {
  let code = {j`let a = 1`}

  //   let (tsProxy, setTsProxy) = React.useState(() => None)
  //   let (editor, setEditor) = React.useState(() => None)

  let tsProxy = React.useRef(None)
  let editor = React.useRef(None)

  <MonacoEditor.monacoEditor
    width="800"
    height="600"
    language=#typescript
    theme=#"vs-dark"
    value={code}
    // options={options}
    onChange={Method.onChange((tsProxy, editor))}
    // editorDidMount={Method.editorDidMount((setTsProxy, setEditor))}
    editorDidMount={Method.editorDidMount((tsProxy, editor))}
    editorWillUnmount={Method.editorWillUnmount}
  />
}
