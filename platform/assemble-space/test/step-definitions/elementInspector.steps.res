open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open Sinon

let feature = loadFeature("./test/features/elementInspector.feature")

defineFeature(feature, test => {
  let sandbox = ref(Obj.magic(1))
  let selectedContributes = ref(Obj.magic(1))

  let _prepare = given => {
    given("prepare", () => {
      sandbox := createSandbox()
      ReactTestTool.prepare()
    })
  }

  test(."show nothing", ({given, \"when", \"and", then}) => {
    _prepare(given)

    given("mark not show", () => {
      ()
    })

    \"when"("render", () => {
      ()
    })

    then("should show nothing", () => {
      ElementInspectorTool.buildUI(
        ~sandbox,
        ~service=ServiceTool.build(
          ~sandbox,
          ~useSelector=createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
            (false, list{}),
            _,
          ),
          (),
        ),
        (),
      )
      ->ReactTestRenderer.create
      ->ReactTestTool.createSnapshotAndMatch
    })
  })

  test(."show current element state", ({given, \"when", \"and", then}) => {
    let useSelectorStub = ref(Obj.magic(1))

    _prepare(given)

    given("mark show", () => {
      ()
    })

    \"and"("prepare element state e1", () => {
      useSelectorStub :=
        createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
          (
            list{},
            (
              true,
              ElementInspectorTool.buildElementInspectorData(
                list{
                  ElementInspectorTool.buildElementStateFieldData(
                    ~name="a1",
                    ~defaultValue=1,
                    ~type_=#int,
                    (),
                  ),
                },
              ),
            ),
          ),
          _,
        )
    })

    \"when"("render", () => {
      ()
    })

    then("should show e1", () => {
      ElementInspectorTool.buildUI(
        ~sandbox,
        ~service=ServiceTool.build(~sandbox, ~useSelector=useSelectorStub.contents, ()),
        (),
      )
      ->ReactTestRenderer.create
      ->ReactTestTool.createSnapshotAndMatch
    })
  })

  test(."submit element state", ({given, \"when", \"and", then}) => {
    let values = ref(Obj.magic(1))
    let dispatchStub = ref(Obj.magic(1))

    _prepare(given)

    given("prepare element state e1", () => {
      values :=
        {
          "fields": [
            ElementInspectorTool.buildElementStateFieldData(
              ~name="a1",
              ~defaultValue=1,
              ~type_=#int,
              (),
            ),
          ],
        }
    })

    \"when"("submit element state", () => {
      dispatchStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

      ElementInspectorTool.submitElementState(dispatchStub.contents->Obj.magic, values.contents)
    })

    then("should dispatch SetElementStateFields action", () => {
      dispatchStub.contents->SinonTool.getFirstArg(~callIndex=0, ~stub=_, ())->expect ==
        FrontendUtils.ElementAssembleStoreType.SetElementStateFields(
          values.contents["fields"]->Meta3dCommonlib.ListSt.fromArray,
        )
    })
  })

  // let _prepareReducer = (given, \"and") => {
  //   given("mark show", () => {
  //     ()
  //   })

  //   \"and"("select action a1 whose protocol config's actions define role1, role2", () => {
  //     selectedContributes :=
  //       list{
  //         SelectedContributesTool.buildSelectedContribute(
  //           ~id="a1",
  //           ~protocolConfigStr=ActionProtocolConfigTool.buildActionContributeProtocolConfigStr()->Some,
  //           ~data=ContributeTool.buildContributeData(
  //             ~contributePackageData=ContributeTool.buildContributePackageData(
  //               ~protocol=(
  //                 {
  //                   name: "meta3d-action-a1",
  //                   version: "0.0.1",
  //                 }: Meta3d.ExtensionFileType.contributeProtocolData
  //               ),
  //               (),
  //             ),
  //             (),
  //           ),
  //           (),
  //         ),
  //       }
  //   })
  // }

  // test(."show role select", ({given, \"when", \"and", then}) => {
  //   let useSelectorStub = ref(Obj.magic(1))

  //   _prepare(given)

  //   _prepareReducer(given, \"and")

  //   \"when"("render", () => {
  //     ()
  //   })

  //   then("should show role select contain role1, role2", () => {
  //     useSelectorStub :=
  //       createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
  //         (
  //           selectedContributes.contents,
  //           (
  //             true,
  //             ElementInspectorTool.buildElementInspectorData(
  //               list{},
  //               ReducerTool.buildReducers(~role=None, ()),
  //             ),
  //           ),
  //         ),
  //         _,
  //       )

  //     ElementInspectorTool.buildUI(
  //       ~sandbox,
  //       ~service=ServiceTool.build(
  //         ~sandbox,
  //         ~useSelector=useSelectorStub.contents,
  //         ~serializeActionProtocolConfigLib=Meta3d.Main.serializeActionProtocolConfigLib->Obj.magic,
  //         ~getActions=Meta3d.Main.getActions->Obj.magic,
  //         (),
  //       ),
  //       (),
  //     )
  //     ->ReactTestRenderer.create
  //     ->ReactTestTool.createSnapshotAndMatch
  //   })
  // })

  // test(."show handlers", ({given, \"when", \"and", then}) => {
  //   let useSelectorStub = ref(Obj.magic(1))

  //   _prepare(given)

  //   _prepareReducer(given, \"and")

  //   \"and"("prepare reducers with role1 and handler h1", () => {
  //     useSelectorStub :=
  //       createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
  //         (
  //           selectedContributes.contents,
  //           (
  //             true,
  //             ElementInspectorTool.buildElementInspectorData(
  //               list{},
  //               ReducerTool.buildReducers(
  //                 ~role="role1"->Some,
  //                 ~handlers=list{ReducerTool.buildHandler("action1", "x")},
  //                 (),
  //               ),
  //             ),
  //           ),
  //         ),
  //         _,
  //       )
  //   })

  //   \"when"("render", () => {
  //     ()
  //   })

  //   then("should show h1 form", () => {
  //     ElementInspectorTool.buildUI(
  //       ~sandbox,
  //       ~service=ServiceTool.build(
  //         ~sandbox,
  //         ~useSelector=useSelectorStub.contents,
  //         ~serializeActionProtocolConfigLib=Meta3d.Main.serializeActionProtocolConfigLib->Obj.magic,
  //         ~getActions=Meta3d.Main.getActions->Obj.magic,
  //         (),
  //       ),
  //       (),
  //     )
  //     ->ReactTestRenderer.create
  //     ->ReactTestTool.createSnapshotAndMatch
  //   })
  // })

  // test(."set role", ({given, \"when", \"and", then}) => {
  //   let role = ref(Obj.magic(1))
  //   let dispatchStub = ref(Obj.magic(1))

  //   _prepare(given)

  //   given("prepare role", () => {
  //     role := "role1"
  //   })

  //   \"when"("set role", () => {
  //     dispatchStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

  //     ElementInspectorTool.setRole(dispatchStub.contents->Obj.magic, role.contents)
  //   })

  //   then("should dispatch SetRole action", () => {
  //     dispatchStub.contents->SinonTool.getFirstArg(~callIndex=0, ~stub=_, ())->expect ==
  //       FrontendUtils.ElementAssembleStoreType.SetRole(role.contents->Some)
  //   })
  // })

  // test(."submit handlers", ({given, \"when", \"and", then}) => {
  //   let values = ref(Obj.magic(1))
  //   let dispatchStub = ref(Obj.magic(1))

  //   _prepare(given)

  //   given("prepare reducers", () => {
  //     values :=
  //       {
  //         "handlers": [
  //           ReducerTool.buildHandler("action1", "x"),
  //           ReducerTool.buildHandler("action2", "y"),
  //         ],
  //       }
  //   })

  //   \"when"("submit handlers", () => {
  //     dispatchStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

  //     ElementInspectorTool.submitHandlers(dispatchStub.contents->Obj.magic, values.contents)
  //   })

  //   then("should dispatch SetHandlers action", () => {
  //     dispatchStub.contents->SinonTool.getFirstArg(~callIndex=0, ~stub=_, ())->expect ==
  //       FrontendUtils.ElementAssembleStoreType.SetHandlers(
  //         values.contents["handlers"]->Meta3dCommonlib.ListSt.fromArray,
  //       )
  //   })
  // })
})
