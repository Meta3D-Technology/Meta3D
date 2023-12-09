open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

module Method = {
  let onChange = (
    getNewCodeFunc,
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
          getNewCodeFunc(r["outputFiles"][0]["text"])

          Js.Promise.resolve()
        },
        //   Js.log(r["outputFiles"])

        // Js.log(r["outputFiles"][0]["text"])

        _,
      )

    | _ => Js.Promise.resolve()
    }
  }

  let _wrapDTs = dts => {
    j`declare module "meta3d-type"{
      ${dts}
    }`
  }

  let _addMeta3dTypeLib = (editor, monaco) => {
    let path = "static/meta3d-type/src/Index.ts"

    Window.fetchDTs(path)->Js.Promise.then_(({text}: Window.fetchResult) => {
      text(.)->Js.Promise.resolve
    }, _)->Js.Promise.then_(dts => {
      let dts = dts->_wrapDTs

      monaco["languages"]["typescript"]["typescriptDefaults"]["addExtraLib"](. dts)
    }, _)
  }

  let editorDidMount = (
    (
      tsProxyRef: React.ref<option<MonacoEditor.proxy>>,
      editorRef: React.ref<option<MonacoEditor.editor>>,
    ),
    editor,
    monaco,
  ) => {
    // Js.log(("didmount", editor))

    let editor = editor->Obj.magic
    let monaco = monaco->Obj.magic

    editorRef.current = editor->Some

    monaco["languages"]["typescript"]["getTypeScriptWorker"](.)->Js.Promise.then_(worker => {
      worker(. editor["getModel"](.)["uri"])
    }, _)->Js.Promise.then_(proxy => {
      tsProxyRef.current = proxy

      Js.Promise.resolve()
    }, _)->Js.Promise.then_(_ => {
      _addMeta3dTypeLib(editor, monaco)
    }, _)
  }

  let editorWillUnmount = (editor, monaco) => {
    // Js.log("unmound")

    Js.Promise.resolve()
  }
}

@react.component
let make = (~service: service, ~code, ~getNewCodeFunc) => {
  let tsProxy = React.useRef(None)
  let editor = React.useRef(None)

  <MonacoEditor.monacoEditor
    width="800"
    height="600"
    language=#typescript
    theme=#"vs-dark"
    value={code}
    onChange={Method.onChange(getNewCodeFunc, (tsProxy, editor))}
    editorDidMount={Method.editorDidMount((tsProxy, editor))}
    editorWillUnmount={Method.editorWillUnmount}
  />
}
