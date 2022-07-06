open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open Sinon

open Js.Promise

let feature = loadFeature("./test/features/assemble_space.feature")

defineFeature(feature, test => {
  let sandbox = ref(Obj.magic(1))

  let _prepare = (given, \"and") => {
    given("prepare sandbox", () => {
      sandbox := createSandbox()
    })

    \"and"("prepare snapshot", () => {
      ReactTestTool.prepare()
    })
  }

  test(."show extensions", ({given, \"when", \"and", then}) => {
    let a: FrontendUtils.BackendCloudbaseType.protocol = {
      name: "a",
      version: "0.0.1",
      iconBase64: "i1",
    }
    let allPublishExtensionProtocols = ref([])
    let selectedExtensions = ref(list{})

    _prepare(given, \"and")

    given("publish extension protocol a", () => {
      allPublishExtensionProtocols := [a]
    })

    \"and"("select extension a1 for a", () => {
      selectedExtensions :=
        list{
          AssembleSpaceTool.buildSelectedExtension(
            ~protocolName=a.name,
            ~protocolVersion=a.version,
            (),
          ),
        }
    })

    \"when"("render", () => {
      ()
    })

    CucumberAsync.execStep(then, "should show a's name and icon", () => {
      let {
        result,
        // rerender,
        // waitForValueToChange,
        waitForNextUpdate,
      } = ReactHooks.renderHook(() => {
        AssembleSpaceTool.hook(
          ~sandbox,
          ~service=BackendServiceTool.build(
            ~sandbox,
            ~getAllPublishExtensionProtocols=createEmptyStub(refJsObjToSandbox(sandbox.contents))
            ->returns(Meta3dBsMost.Most.just(allPublishExtensionProtocols.contents), _)
            ->Obj.magic,
            (),
          ),
          ~selectedExtensions=selectedExtensions.contents,
          (),
        )->Obj.magic
      })

      // waitForValueToChange(() =>
      //   ReactHooks.getCurrentData(result, "isLoaded")->Meta3dCommonlib.Log.printForDebug
      // )
      waitForNextUpdate()->then_(() => {
        ReactTestTool.createSnapshotAndMatchForHook(AssembleSpaceTool.render, result)
      }, _)
    })
  })

  test(."has zero implement of extension protocol", ({given, \"when", \"and", then}) => {
    let a: FrontendUtils.BackendCloudbaseType.protocol = {
      name: "a",
      version: "0.0.1",
      iconBase64: "i1",
    }
    let allPublishExtensionProtocols = ref([])
    let selectedExtensions = ref(list{})

    _prepare(given, \"and")

    given("publish extension protocol a", () => {
      allPublishExtensionProtocols := [a]
    })

    \"and"("select extension b1 for protocol b", () => {
      selectedExtensions :=
        list{
          AssembleSpaceTool.buildSelectedExtension(
            ~protocolName="b",
            ~protocolVersion="0.0.1",
            (),
          ),
        }
    })

    \"when"("render", () => {
      ()
    })

    CucumberAsync.execStep(then, "should show empty", () => {
      // let errorStub = createEmptyStub(refJsObjToSandbox(sandbox.contents))

      let {result,waitFor, waitForNextUpdate} = ReactHooks.renderHook(() => {
        AssembleSpaceTool.hook(
          ~sandbox,
          ~service=BackendServiceTool.build(
            ~sandbox,
            // ~error=errorStub,
            ~getAllPublishExtensionProtocols=createEmptyStub(refJsObjToSandbox(sandbox.contents))
            ->returns(Meta3dBsMost.Most.just(allPublishExtensionProtocols.contents), _)
            ->Obj.magic,
            (),
          ),
          ~selectedExtensions=selectedExtensions.contents,
          (),
        )->Obj.magic
      })

//       waitFor(() => errorStub->getCallCount -> Meta3dCommonlib.EqualTool.isEqual(1))->then_(
//         () => {
// errorStub->getCall(0, _)->getArgs-> Meta3dCommonlib.ListSt.head -> Meta3dCommonlib.OptionSt.getExn -> ErrorTool.isMessageMatch("should has one implement of protocol!", expect)->resolve
//         },
//         _,
//       )

      waitForNextUpdate()->then_(() => {
        ReactTestTool.createSnapshotAndMatchForHook(AssembleSpaceTool.render, result)
      }, _)
    })
  })

test(."has multiple implements of extension protocol", ({given, \"when", \"and", then}) => {
    let a: FrontendUtils.BackendCloudbaseType.protocol = {
      name: "a",
      version: "0.0.1",
      iconBase64: "i1",
    }
    let allPublishExtensionProtocols = ref([])
    let selectedExtensions = ref(list{})

    _prepare(given, \"and")

    given("publish extension protocol a", () => {
      allPublishExtensionProtocols := [a]
    })

    \"and"("select extension a1 and a2 for a", () => {
      selectedExtensions :=
        list{
          AssembleSpaceTool.buildSelectedExtension(
  ~id="a1",
            ~protocolName=a.name,
            ~protocolVersion=a.version,
            (),
          ),
          AssembleSpaceTool.buildSelectedExtension(
  ~id="a2",
            ~protocolName=a.name,
            ~protocolVersion=a.version,
            (),
          ),
        }
    })

    \"when"("render", () => {
      ()
    })

    CucumberAsync.execStep(then, "should show empty", () => {
      // let errorStub = createEmptyStub(refJsObjToSandbox(sandbox.contents))

      let {result,waitFor, waitForNextUpdate} = ReactHooks.renderHook(() => {
        AssembleSpaceTool.hook(
          ~sandbox,
          ~service=BackendServiceTool.build(
            ~sandbox,
            // ~error=errorStub,
            ~getAllPublishExtensionProtocols=createEmptyStub(refJsObjToSandbox(sandbox.contents))
            ->returns(Meta3dBsMost.Most.just(allPublishExtensionProtocols.contents), _)
            ->Obj.magic,
            (),
          ),
          ~selectedExtensions=selectedExtensions.contents,
          (),
        )->Obj.magic
      })

//       waitFor(() => errorStub->getCallCount -> Meta3dCommonlib.EqualTool.isEqual(1))->then_(
//         () => {
// errorStub->getCall(0, _)->getArgs-> Meta3dCommonlib.ListSt.head -> Meta3dCommonlib.OptionSt.getExn -> ErrorTool.isMessageMatch("should has one implement of protocol!", expect)->resolve
//         },
//         _,
//       )
      waitForNextUpdate()->then_(() => {
        ReactTestTool.createSnapshotAndMatchForHook(AssembleSpaceTool.render, result)
      }, _)
    })
  })
})
