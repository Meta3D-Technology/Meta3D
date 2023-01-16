open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open Sinon

open Js.Typed_array

let feature = loadFeature("./test/features/render.feature")

defineFeature(feature, test => {
  let sandbox = ref(Obj.magic(1))

  let _prepare = given => {
    given("prepare sandbox", () => {
      sandbox := createSandbox()
    })
  }

  // test(."set io data", ({given, \"when", \"and", then}) => {
  //   // let newMeta3dState: ref<Meta3dType.Index.state> = ref(Obj.magic(12))
  //   let state: ref<Meta3dUiProtocol.StateType.state> = ref(Obj.magic(1))
  //   let meta3dstate: Meta3dType.Index.state = Obj.magic(22)
  //   let meta3dState2: Meta3dType.Index.state = Obj.magic(23)
  //   let uiExtensionProtocolName = "uiExtensionProtocolName"
  //   // let isDebug = true
  //   // let canvas = Obj.magic(5)
  //   // let imguiRendererService = ref(Obj.magic(1))
  //   // let imguiRendererstate = Obj.magic(12)
  //   // let imguiRendererState2 = Obj.magic(13)
  //   // let getExtensionServiceStub = ref(Obj.magic(1))
  //   let getExtensionStateStub = ref(Obj.magic(1))
  //   let setExtensionStateStub = ref(Obj.magic(1))
  //   let ioData = ref(Obj.magic(1))

  //   _prepare(given)

  //   \"and"("prepare imgui renderer service", () => {
  //     ()
  //   })

  //   \"and"("prepare io data", () => {
  //     ioData := MainTool.buildIOData(~pointUp=true, ())
  //   })

  //   \"and"("prepare api", () => {
  //     state := MainTool.createState()
  //     getExtensionStateStub :=
  //       createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(state.contents, _)

  //     setExtensionStateStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))
  //   })

  //   CucumberAsync.execStep(\"when", "render", () => {
  //     MainTool.render(
  //       ~sandbox,
  //       ~uiExtensionProtocolName,
  //       ~getExtensionState=getExtensionStateStub.contents,
  //       ~setExtensionState=setExtensionStateStub.contents,
  //       ~meta3dState=meta3dstate,
  //       ~ioData=ioData.contents,
  //       (),
  //     )
  //   })

  //   then("set io data", () => {
  //     setExtensionStateStub.contents->getCall(0, _)->getArgs->expect ==
  //       list{
  //         meta3dstate,
  //         uiExtensionProtocolName->Obj.magic,
  //         (
  //           {
  //             ...state.contents,
  //             ioData: ioData.contents,
  //           }: Meta3dUiProtocol.StateType.state
  //         )->Obj.magic,
  //       }
  //   })
  // })

  test(."if not show, not exec", ({given, \"when", \"and", then}) => {
    // let newMeta3dState: ref<Meta3dType.Index.state> = ref(Obj.magic(12))
    let state: ref<Meta3dUiProtocol.StateType.state> = ref(Obj.magic(1))
    let elementName1 = "e1"
    // let meta3dstate: Meta3dType.Index.state = Obj.magic(22)
    // let meta3dState2: Meta3dType.Index.state = Obj.magic(23)
    // let uiExtensionProtocolName = "uiExtensionProtocolName"
    // let isDebug = true
    // let canvas = Obj.magic(5)
    // let imguiRendererService = ref(Obj.magic(1))
    // let imguiRendererstate = Obj.magic(12)
    // let imguiRendererState2 = Obj.magic(13)
    // let getExtensionServiceStub = ref(Obj.magic(1))
    let getExtensionStateStub = ref(Obj.magic(1))
    // let setExtensionStateStub = ref(Obj.magic(1))
    // let ioData = ref(Obj.magic(1))
    let execFunc1Stub = ref(Obj.magic(1))

    _prepare(given)

    \"and"(
      "register element func1",
      () => {
        state := MainTool.createState()

        execFunc1Stub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

        state :=
          MainTool.registerElement(
            ~state=state.contents,
            ~elementName=elementName1,
            ~elementFunc=execFunc1Stub.contents->Obj.magic,
            (),
          )
      },
    )

    \"and"(
      "hide it",
      () => {
        state := MainTool.hide(~state=state.contents, ~elementName=elementName1)
      },
    )

    \"and"(
      "prepare api",
      () => {
        getExtensionStateStub :=
          createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(state.contents, _)

        // setExtensionStateStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))
      },
    )

    CucumberAsync.execStep(
      \"when",
      "render",
      () => {
        MainTool.render(
          ~sandbox,
          // ~uiExtensionProtocolName,
          ~getExtensionState=getExtensionStateStub.contents,
          // ~setExtensionState=setExtensionStateStub.contents,
          // ~meta3dState=meta3dstate,
          (),
        )
      },
    )

    then(
      "not exec func1",
      () => {
        execFunc1Stub.contents->getCallCount->expect == 0
      },
    )
  })

  test(.
    "else, invoke imgui renderer's before exec and exec and mark state not change by ascending order and invoke imgui renderer's after exec",
    ({given, \"when", \"and", then}) => {
      let state: ref<Meta3dUiProtocol.StateType.state> = ref(Obj.magic(1))
      let elementName1 = "e1"
      let elementName2 = "e2"
      let time = 10.0
      // let uiExtensionProtocolName = "uiExtensionProtocolName"
      // let isDebug = true
      // let canvas = Obj.magic(5)
      let imguiRendererService = ref(Obj.magic(1))
      let imguiRendererState1 = Obj.magic(12)
      let imguiRendererState2 = Obj.magic(13)
      let getExtensionServiceStub = ref(Obj.magic(1))
      let getExtensionStateStub = ref(Obj.magic(1))
      let setExtensionStateStub = ref(Obj.magic(1))
      let beforeExecStub = ref(Obj.magic(1))
      let afterExecStub = ref(Obj.magic(1))
      let execFunc1Stub = ref(Obj.magic(1))
      let execFunc2Stub = ref(Obj.magic(1))

      _prepare(given)

      \"and"(
        "prepare imgui renderer service",
        () => {
          beforeExecStub :=
            createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(imguiRendererState2, _)
          afterExecStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

          imguiRendererService :=
            ImguiRendererServiceTool.buildService(
              ~sandbox,
              ~beforeExec=beforeExecStub.contents->Obj.magic,
              ~afterExec=afterExecStub.contents->Obj.magic,
              (),
            )
        },
      )

      \"and"(
        "register element func1 with exec order=1",
        () => {
          state := MainTool.createState()

          execFunc1Stub :=
            createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
              Obj.magic(1)->Js.Promise.resolve,
              _,
            )

          state :=
            MainTool.registerElement(
              ~state=state.contents,
              ~elementName=elementName1,
              ~execOrder=1,
              ~elementFunc=execFunc1Stub.contents->Obj.magic,
              (),
            )
        },
      )

      \"and"(
        "register element func2 with exec order=0",
        () => {
          execFunc2Stub :=
            createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
              Obj.magic(1)->Js.Promise.resolve,
              _,
            )

          state :=
            MainTool.registerElement(
              ~state=state.contents,
              ~elementName=elementName2,
              ~execOrder=0,
              ~elementFunc=execFunc2Stub.contents->Obj.magic,
              (),
            )
        },
      )

      \"and"(
        "mark their states change",
        () => {
          state := MainTool.markStateChange(~state=state.contents, ~elementName=elementName1)
          state := MainTool.markStateChange(~state=state.contents, ~elementName=elementName2)
        },
      )

      \"and"(
        "show them",
        () => {
          state := MainTool.show(~state=state.contents, ~elementName=elementName1)
          state := MainTool.show(~state=state.contents, ~elementName=elementName2)
        },
      )

      \"and"(
        "prepare api",
        () => {
          // getExtensionStateStub :=
          //   createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(state.contents, _)

          // setExtensionStateStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

          getExtensionServiceStub :=
            createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
              imguiRendererService.contents,
              _,
            )

          getExtensionStateStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))
          getExtensionStateStub.contents->returns(state.contents, _)->ignore
          getExtensionStateStub.contents->onCall(1, _)->returns(imguiRendererState1, _)->ignore
          getExtensionStateStub.contents->onCall(3, _)->returns(imguiRendererState2, _)->ignore

          setExtensionStateStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))
          // setExtensionStateStub.contents->returns(meta3dState1, _)->ignore
          // setExtensionStateStub.contents->onCall(2, _)->returns(meta3dState2, _)->ignore
        },
      )

      CucumberAsync.execStep(
        \"when",
        "render",
        () => {
          MainTool.render(
            ~sandbox,
            // ~uiExtensionProtocolName,
            ~getExtensionService=getExtensionServiceStub.contents,
            ~getExtensionState=getExtensionStateStub.contents,
            ~setExtensionState=setExtensionStateStub.contents,
            // ~meta3dState=meta3dstate,
            ~time,
            (),
          )
        },
      )

      then(
        "invoke imgui renderer's before exec with time",
        () => {
          (
            beforeExecStub.contents->getCallCount,
            beforeExecStub.contents->Obj.magic->calledBefore(execFunc2Stub.contents->Obj.magic),
            beforeExecStub.contents
            ->getCall(0, _)
            ->SinonTool.calledWithArg2(imguiRendererState1, time),
          )->expect == (1, true, true)
        },
      )

      \"and"(
        "exec func2 and func1",
        () => {
          (
            execFunc1Stub.contents->getCallCount,
            execFunc2Stub.contents->getCallCount,
            execFunc2Stub.contents->Obj.magic->calledBefore(execFunc1Stub.contents->Obj.magic),
          )->expect == (1, 1, true)
        },
      )

      \"and"(
        "mark their states not change",
        () => {
          let state = SinonTool.getArg(
            ~callIndex=2,
            ~argIndex=2,
            ~stub=setExtensionStateStub.contents,
            (),
          )

          (
            state->MainTool.isStateChange(elementName1),
            state->MainTool.isStateChange(elementName2),
          )->expect == (false, false)
        },
      )

      \"and"(
        "invoke imgui renderer's after exec",
        () => {
          (
            afterExecStub.contents->getCallCount,
            afterExecStub.contents->Obj.magic->calledAfter(execFunc1Stub.contents->Obj.magic),
          )->expect == (1, true)
        },
      )
    },
  )

  test(."render imgui renderer", ({given, \"when", \"and", then}) => {
    // let newMeta3dState: ref<Meta3dType.Index.state> = ref(Obj.magic(12))
    let state: ref<Meta3dUiProtocol.StateType.state> = ref(Obj.magic(1))
    // let meta3dState1: Meta3dType.Index.state = Obj.magic(22)
    // let meta3dState2: Meta3dType.Index.state = Obj.magic(23)
    let imguiRendererExtensionProtocolName = "imguiRendererExtensionProtocolName"
    let imguiRendererService = ref(Obj.magic(1))
    // let imguiRendererState1 = Obj.magic(12)
    // let imguiRendererState2 = Obj.magic(13)
    let renderStub = ref(Obj.magic(1))
    let getExtensionServiceStub = ref(Obj.magic(1))
    let getExtensionStateStub = ref(Obj.magic(1))
    let setExtensionStateStub = ref(Obj.magic(1))

    _prepare(given)

    \"and"(
      "prepare imgui renderer service",
      () => {
        renderStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))
        // ->returns(imguiRendererState2, _)

        imguiRendererService :=
          ImguiRendererServiceTool.buildService(
            ~sandbox,
            ~render=renderStub.contents->Obj.magic,
            (),
          )
      },
    )

    \"and"(
      "prepare api",
      () => {
        getExtensionServiceStub :=
          createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
            imguiRendererService.contents,
            _,
          )

        getExtensionStateStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))
        getExtensionStateStub.contents->returns(MainTool.createState(), _)->ignore
        // getExtensionStateStub.contents->onCall(2, _)->returns(imguiRendererState1, _)->ignore

        setExtensionStateStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))
        // setExtensionStateStub.contents->returns(meta3dState1, _)->ignore
        // setExtensionStateStub.contents->onCall(2, _)->returns(meta3dState2, _)->ignore
      },
    )

    CucumberAsync.execStep(
      \"when",
      "render",
      () => {
        MainTool.render(
          ~sandbox,
          ~imguiRendererExtensionProtocolName,
          ~getExtensionService=getExtensionServiceStub.contents,
          ~getExtensionState=getExtensionStateStub.contents,
          ~setExtensionState=setExtensionStateStub.contents,
          // ~meta3dState=meta3dState1,
          (),
        )->// newMeta3dState := meta3dState

        // newMeta3dState := meta3dState

        Js.Promise.then_(
          meta3dState => {
            meta3dState->Js.Promise.resolve
          },
          // newMeta3dState := meta3dState

          // newMeta3dState := meta3dState

          _,
        )
      },
    )

    then(
      "render imgui renderer",
      () => {
        (
          getExtensionStateStub.contents
          ->withTwoArgs(matchAny, imguiRendererExtensionProtocolName, _)
          ->getCallCount,
          getExtensionServiceStub.contents
          ->withTwoArgs(matchAny, imguiRendererExtensionProtocolName, _)
          ->getCallCount,
          renderStub.contents->getCallCount,
        )->expect == (2, 2, 1)
      },
    )

    \"and"(
      "update imgui renderer state",
      () => {
        setExtensionStateStub.contents
        ->getCall(3, _)
        ->SinonTool.calledWithArg3(matchAny, imguiRendererExtensionProtocolName, matchAny)
        ->expect == true
      },
    )
  })
})
