open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open Sinon

let feature = loadFeature("./test/features/assemble_space.feature")

defineFeature(feature, test => {
  let sandbox = ref(Obj.magic(1))

  let _prepare = ( given, \"and" ) => {
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
          ~backendService=BackendServiceTool.build(
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
      waitForNextUpdate()->Js.Promise.then_(() => {
        ReactTestTool.createSnapshotAndMatchForHook(AssembleSpaceTool.render, result)
      }, _)
    })
  })
})
