open Antd
%%raw("import 'antd/dist/reset.css'")
open AssembleSpaceType

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

      Window.setTimeout(() => {
        tsProxy["getEmitOutput"](editor["getModel"](.)["uri"]["toString"](.))
        ->Js.Promise.then_(
          r => {
            getNewCodeFunc(newValue, r["outputFiles"][0]["text"])

            Js.Promise.resolve()
          },
          //   Js.log(r["outputFiles"])

          // Js.log(r["outputFiles"][0]["text"])

          _,
        )
        ->ignore
      }, 0)

      Js.Promise.resolve()

    | _ => Js.Promise.resolve()
    }
  }

  let _wrapDTs = (dts, moduleName) => {
    j`declare module "${moduleName}"{
      ${dts}
    }`
  }

  let _addTypeLibs = (editor, monaco) => {
    let data = [
      ("static/dts/immutable/src/immutable.d.ts", "immutable"),
      ("static/dts/meta3d-type/src/Index.d.ts", "meta3d-type"),
      (
        "static/dts/meta3d-editor-whole-protocol/src/service/ServiceType.d.ts",
        "meta3d-editor-whole-protocol/src/service/ServiceType",
      ),
    ]

    data->Meta3dCommonlib.ArraySt.traverseReducePromiseM((. _, (path, moduleName)) => {
      Window.fetchDTs(path)->Js.Promise.then_(({text}: WindowType.fetchResult) => {
        text(.)->Js.Promise.resolve
      }, _)->Js.Promise.then_(dts => {
        let dts = dts->_wrapDTs(moduleName)

        monaco["languages"]["typescript"]["typescriptDefaults"]["addExtraLib"](. dts)

        ()->Js.Promise.resolve
      }, _)
    }, ())
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
      _addTypeLibs(editor, monaco)
    }, _)
  }

  let editorWillUnmount = (eventEmitter: Event.eventEmitter, editor, monaco) => {
    eventEmitter.emit(. EventUtils.getCodeEditUnmountEventName(), Obj.magic(1))
    Js.Promise.resolve()
  }

  let useSelector = ({assembleSpaceState, eventEmitter}: AppStoreType.state) => {
    eventEmitter
  }
}

@react.component
let make = (~service: service, ~code, ~getNewCodeFunc) => {
  let eventEmitter = service.react.useAllSelector(. Method.useSelector)

  let tsProxy = service.react.useRef(None)
  let editor = service.react.useRef(None)

  let (monaco, setMonaco) = service.react.useState(_ => None)

  service.react.useEffect1(. () => {
    MessageUtils.showCatchedErrorMessage(() => {
      switch Meta3dMonacoUtils.Main.getMonaco()->Meta3dCommonlib.OptionSt.fromNullable {
      | None =>
        Meta3dMonacoUtils.Main.deferLoad()->Js.Promise.then_(
          value => {
            value->Js.Promise.resolve
          },
          _,
        )

      | Some(value) => value->Js.Promise.resolve
      }
      ->Js.Promise.then_(
        monaco => {
          setMonaco(_ => monaco->Some)

          ()->Js.Promise.resolve
        },
        _,
      )
      ->Js.Promise.catch(
        e => {
          service.console.errorWithExn(. e->Error.promiseErrorToExn, None)->Obj.magic
        },
        _,
      )
      ->ignore
    }, 5->Some)

    None
  }, [])

  {
    switch monaco {
    | None => <Loading text={j`加载中，请稍候`} />
    | Some(monaco) =>
      <MonacoEditor.monacoEditor
        monaco
        width="100%"
        height="100%"
        language=#typescript
        theme=#"vs-dark"
        value={code}
        onChange={Method.onChange(getNewCodeFunc, (tsProxy, editor))}
        editorDidMount={Method.editorDidMount((tsProxy, editor))}
        editorWillUnmount={Method.editorWillUnmount(eventEmitter)}
      />
    }
  }
}
