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

  /* ! refer to:
https://github.com/microsoft/monaco-editor/issues/1839
 */
  let _wrapDTs = dts => {
    {j`declare module "meta3d-type"{
      ${dts}
    }`}
  }

  /* ! refer to:
https://copyprogramming.com/howto/how-to-use-addextralib-in-monaco-with-an-external-type-definition
 */
  let _addMeta3dTypeLib = (editor, monaco) => {
    // let path = "node_modules/meta3d-type/src/Index.ts"
    let path = "static/meta3d-type/src/Index.ts"
    // let url = "meta3d-type"
    // let url = "node_modules/@types/meta3d-type/index.d.ts"
    // let url = "file:///node_modules/@types/meta3d-type/index.d.ts"
    // let url = "file:///node_modules/meta3d-type/index.d.ts"
    // let url = "meta3d-type"
    // let url = "node_modules/meta3d-type/index.d.ts"
    // let url = ""

    // let path =  %raw("require('node_modules/meta3d-type/src/Index.ts')")
    // let path =  %raw("require('/Users/yang/Github/Meta3D/demos/monaco/external/dts/meta3d-type/src/Index.ts')")

    Window.fetchDTs(path)
    ->Js.Promise.then_(({text}: Window.fetchResult) => {
      text(.)->Js.Promise.resolve
    }, _)
    ->Js.Promise.then_(
      dts => {
        // Js.log(dts)

        let dts = dts->_wrapDTs

        monaco["languages"]["typescript"]["typescriptDefaults"]["addExtraLib"](. dts)
      },
      // monaco["languages"]["typescript"]["typescriptDefaults"]["addExtraLib"](. dts, url)

      // monaco["languages"]["typescript"]["typescriptDefaults"]["setCompilerOptions"](. {
      //   "target": monaco["languages"]["typescript"]["ScriptTarget"]["ES6"],
      //   // "module": monaco["languages"]["typescript"]["ModuleKind"]["ES6"],
      //   "module": monaco["languages"]["typescript"]["ModuleKind"]["CommonJs"],
      //   "allowNonTsExtensions": true,
      //   "allowSyntheticDefaultImports": true,
      //   "moduleResolution": monaco["languages"]["typescript"]["ModuleResolutionKind"]["NodeJs"],
      //   // "noLib": true,
      //   // "typeRoots": ["node_modules/@types"],
      // })

      // editor["setModel"](.
      //   monaco["editor"]["createModel"](. dts, "typescript", monaco["Uri"]["parse"](. url)),
      // )

      // monaco["languages"]["typescript"]["javascriptDefaults"]["setCompilerOptions"](. {
      //   "target": monaco["languages"]["typescript"]["ScriptTarget"]["ES6"],
      //   "module": monaco["languages"]["typescript"]["ModuleKind"]["ES6"],
      //   "allowNonTsExtensions": true,
      //   "allowSyntheticDefaultImports": true, // for use of import React from 'react' ranther than import * as React from 'react'
      //   "moduleResolution": monaco["languages"]["typescript"]["ModuleResolutionKind"]["NodeJs"],
      //   // "noEmit": true,
      //   // "types": ["node_modules/@types"],
      //   "include": ["node_modules/@types"],
      // })

      // for use of import React from 'react' ranther than import * as React from 'react'

      // "noEmit": true,
      // "types": ["node_modules/@types"],

      // monaco["languages"]["typescript"]["typescriptDefaults"]["setDiagnosticsOptions"](. {
      //   "noSemanticValidation": true,
      //   "noSyntaxValidation": true,
      // })

      _,
    )
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

    // _addMeta3dTypeLib(monaco)->Js.Promise.then_(_ => {
    //   monaco["languages"]["typescript"]["getTypeScriptWorker"](.)
    // }, _)

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
    Js.log("unmound")

    Js.Promise.resolve()
  }
}

@react.component
let make = () => {
  let code = {
    j`import { api } from "meta3d-type"
    
export let getContribute = (api:api) => {
    return {
        inputName: "RunStopButtonInput",
        func: (meta3dState) => {
            let runState = api.action.getActionState(meta3dState, "Run")

            if (api.nullable.isNullable(runState)) {
                return Promise.resolve(false)
            }

            runState = api.nullable.getExn(runState)

            return Promise.resolve(runState.isRun)
        }
    }
}

  `
  }

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
