open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open Sinon

open Js.Promise

let feature = loadFeature("./test/features/package/package_contributes.feature")

defineFeature(feature, test => {
  let sandbox = ref(Obj.magic(1))
  let allPublishContributeProtocols = ref([])
  let selectedContributesFromMarket = ref(list{})

  let _prepare = given => {
    given("prepare", () => {
      sandbox := createSandbox()
    })
  }

  //   test(."if not loaded, show loading", ({given, \"when", \"and", then}) => {
  //     _prepare(given)

  //     \"when"(
  //       "not loaded and render",
  //       () => {
  //         ()
  //       },
  //     )

  //     then(
  //       "should show loading",
  //       () => {
  //         PackageContributesTool.buildUI(~sandbox, ~service=ServiceTool.build(~sandbox, ()), ())
  //         ->ReactTestRenderer.create
  //         ->ReactTestTool.createSnapshotAndMatch
  //       },
  //     )
  //   })

  test(."show contributes list", ({given, \"when", \"and", then}) => {
    _prepare(given)

    \"when"(
      "render",
      () => {
        ()
      },
    )

    then(
      "should show contributes list",
      () => {
        // let useStateStub = createEmptyStub(refJsObjToSandbox(sandbox.contents))
        // useStateStub
        // ->onCall(0, _)
        // ->returns((true, _ => true), _)
        // ->onCall(1, _)
        // ->returns(([], _ => []), _)
        // ->ignore

        PackageContributesTool.buildUI(~sandbox, ~service=ServiceTool.build(~sandbox, ()), ())
        ->ReactTestRenderer.create
        ->ReactTestTool.createSnapshotAndMatch
      },
    )
  })

  test(."select contribute", ({given, \"when", \"and", then}) => {
    let a: FrontendUtils.BackendCloudbaseType.protocol = BackendCloubaseTool.buildProtocol(
      ~name="a",
      ~version="1.0.1",
      (),
    )
    let dispatchStub = ref(Obj.magic(1))

    _prepare(given)

    // given(
    //   "publish contribute protocol a",
    //   () => {
    //     allPublishContributeProtocols := [a]
    //   },
    // )

    given(
      "select contribute a1 for a",
      () => {
        selectedContributesFromMarket :=
          list{
            ContributeTool.buildSelectedContribute(
              ~protocolName=a.name,
              ~protocolVersionRange=">= 1.0.0",
              (),
            ),
          }
      },
    )

    \"and"(
      "render after useEffectOnceAsync",
      () => {
        ()
      },
    )

    \"when"(
      "select a1",
      () => {
        dispatchStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

        let (contribute, protocolConfig) =
          selectedContributesFromMarket.contents->ListTool.getHeadExn

        PackageContributesTool.selectContribute(
          ~dispatch=dispatchStub.contents,
          ~iconBase64=a.iconBase64,
          ~contribute,
          ~protocolConfigStr=protocolConfig->PackageContributesTool.getProtocolConfigStr,
        )
      },
    )

    then(
      "should dispatch SelectContribute action",
      () => {
        let (contribute, protocolConfig) =
          selectedContributesFromMarket.contents->ListTool.getHeadExn

        dispatchStub.contents
        ->Obj.magic
        ->SinonTool.calledWith(
          FrontendUtils.PackageAssembleStoreType.SelectContribute(
            a.iconBase64,
            protocolConfig->PackageContributesTool.getProtocolConfigStr,
            contribute,
          ),
        )
        ->expect == true
      },
    )
  })

  //   let _setContributes = contributes => {
  //     let setContributesStub = createEmptyStub(refJsObjToSandbox(sandbox.contents))

  //     PackageContributesTool.useEffectOnceAsync(
  //       ~sandbox,
  //       ~setContributes=setContributesStub,
  //       ~service=ServiceTool.build(
  //         ~sandbox,
  //         ~getAllPublishContributeProtocols=createEmptyStub(
  //           refJsObjToSandbox(sandbox.contents),
  //         )->returns(Meta3dBsMost.Most.just(allPublishContributeProtocols.contents), _),
  //         (),
  //       ),
  //       ~selectedContributesFromMarket=selectedContributesFromMarket.contents,
  //       (),
  //     )
  //     ->ServiceTool.getUseEffectOncePromise
  //     ->then_(() => {
  //       (ReactHookTool.getValue(~setLocalValueStub=setContributesStub, ())->expect == contributes)
  //         ->resolve
  //     }, _)
  //   }

  //   test(."set contributes when select one contribute", ({given, \"when", \"and", then}) => {
  //     let a: FrontendUtils.BackendCloudbaseType.protocol = BackendCloubaseTool.buildProtocol(
  //       ~name="a",
  //       ~version="1.0.1",
  //       (),
  //     )
  //     let a1DisplayName = "a1"
  //     // let protocolConfig:FrontendUtils.CommonType.protocolConfig = { "a_config" }
  //     let protocolConfig = ProtocolConfigTool.buildProtocolConfig(~configStr="a_config", ())

  //     _prepare(given)

  //     given(
  //       "publish contribute protocol a",
  //       () => {
  //         allPublishContributeProtocols := [a]
  //       },
  //     )

  //     \"and"(
  //       "select contribute a1 for a",
  //       () => {
  //         selectedContributesFromMarket :=
  //           list{
  //             ContributeTool.buildSelectedContribute(
  //               ~displayName=a1DisplayName,
  //               ~protocolName=a.name,
  //               ~protocolVersionRange=">= 1.0.0",
  //               ~protocolConfig=protocolConfig->Some,
  //               (),
  //             ),
  //           }
  //       },
  //     )

  //     \"when"(
  //       "render after useEffectOnceAsync",
  //       () => {
  //         ()
  //       },
  //     )

  //     CucumberAsync.execStep(
  //       then,
  //       "should mark loaded",
  //       () => {
  //         let setIsLoadedStub = createEmptyStub(refJsObjToSandbox(sandbox.contents))

  //         PackageContributesTool.useEffectOnceAsync(
  //           ~sandbox,
  //           ~setIsLoaded=setIsLoadedStub,
  //           ~service=ServiceTool.build(
  //             ~sandbox,
  //             ~getAllPublishContributeProtocols=createEmptyStub(
  //               refJsObjToSandbox(sandbox.contents),
  //             )->returns(Meta3dBsMost.Most.just(allPublishContributeProtocols.contents), _),
  //             (),
  //           ),
  //           ~selectedContributesFromMarket=selectedContributesFromMarket.contents,
  //           (),
  //         )
  //         ->ServiceTool.getUseEffectOncePromise
  //         ->then_(
  //           () => {
  //             (ReactHookTool.getValue(~setLocalValueStub=setIsLoadedStub, ())->expect == true)
  //               ->resolve
  //           },
  //           _,
  //         )
  //       },
  //     )

  //     CucumberAsync.execStep(
  //       \"and",
  //       "should set a's icon, config str and a1's displayName as contributes",
  //       () => {
  //         _setContributes([
  //           (
  //             a1DisplayName,
  //             a.iconBase64,
  //             protocolConfig.configStr,
  //             selectedContributesFromMarket.contents
  //             ->ListTool.getHeadExn
  //             ->ContributeTool.getContribute,
  //           ),
  //         ])
  //       },
  //     )
  //   })

  //   test(."set contributes when select two contributes of the same protocol", ({
  //     given,
  //     \"when",
  //     \"and",
  //     then,
  //   }) => {
  //     let a: FrontendUtils.BackendCloudbaseType.protocol = BackendCloubaseTool.buildProtocol(
  //       ~name="a",
  //       ~version="1.0.1",
  //       (),
  //     )
  //     let a1DisplayName = "a1"
  //     let a2DisplayName = "a2"
  //     let protocolConfig = ProtocolConfigTool.buildProtocolConfig(~configStr="a_config", ())

  //     _prepare(given)

  //     given(
  //       "publish contribute protocol a",
  //       () => {
  //         allPublishContributeProtocols := [a]
  //       },
  //     )

  //     \"and"(
  //       "select contribute a1, a2 for a",
  //       () => {
  //         selectedContributesFromMarket :=
  //           list{
  //             ContributeTool.buildSelectedContribute(
  //               ~displayName=a1DisplayName,
  //               ~protocolName=a.name,
  //               ~protocolVersionRange=">= 1.0.0",
  //               ~protocolConfig=protocolConfig->Some,
  //               (),
  //             ),
  //             ContributeTool.buildSelectedContribute(
  //               ~displayName=a2DisplayName,
  //               ~protocolName=a.name,
  //               ~protocolVersionRange=">= 1.0.0",
  //               ~protocolConfig=protocolConfig->Some,
  //               (),
  //             ),
  //           }
  //       },
  //     )

  //     \"when"(
  //       "render after useEffectOnceAsync",
  //       () => {
  //         ()
  //       },
  //     )

  //     CucumberAsync.execStep(
  //       then,
  //       "should mark loaded",
  //       () => {
  //         let setIsLoadedStub = createEmptyStub(refJsObjToSandbox(sandbox.contents))

  //         PackageContributesTool.useEffectOnceAsync(
  //           ~sandbox,
  //           ~setIsLoaded=setIsLoadedStub,
  //           ~service=ServiceTool.build(
  //             ~sandbox,
  //             ~getAllPublishContributeProtocols=createEmptyStub(
  //               refJsObjToSandbox(sandbox.contents),
  //             )->returns(Meta3dBsMost.Most.just(allPublishContributeProtocols.contents), _),
  //             (),
  //           ),
  //           ~selectedContributesFromMarket=selectedContributesFromMarket.contents,
  //           (),
  //         )
  //         ->ServiceTool.getUseEffectOncePromise
  //         ->then_(
  //           () => {
  //             (ReactHookTool.getValue(~setLocalValueStub=setIsLoadedStub, ())->expect == true)
  //               ->resolve
  //           },
  //           _,
  //         )
  //       },
  //     )

  //     CucumberAsync.execStep(
  //       \"and",
  //       "contributes should contain a1 and a2",
  //       () => {
  //         _setContributes([
  //           (
  //             a1DisplayName,
  //             a.iconBase64,
  //             protocolConfig.configStr,
  //             selectedContributesFromMarket.contents
  //             ->ListTool.getHeadExn
  //             ->ContributeTool.getContribute,
  //           ),
  //           (
  //             a2DisplayName,
  //             a.iconBase64,
  //             protocolConfig.configStr,
  //             selectedContributesFromMarket.contents
  //             ->ListTool.getNthExn(1)
  //             ->ContributeTool.getContribute,
  //           ),
  //         ])
  //       },
  //     )
  //   })

  //   test(."has zero implement of contribute protocol", ({given, \"when", \"and", then}) => {
  //     let a: FrontendUtils.BackendCloudbaseType.protocol = BackendCloubaseTool.buildProtocol(
  //       ~name="a",
  //       ~version="0.0.1",
  //       (),
  //     )

  //     _prepare(given)

  //     given(
  //       "publish contribute protocol a",
  //       () => {
  //         allPublishContributeProtocols := [a]
  //       },
  //     )

  //     \"and"(
  //       "select contribute b1 for protocol b",
  //       () => {
  //         selectedContributesFromMarket :=
  //           list{
  //             ContributeTool.buildSelectedContribute(
  //               ~protocolName="b",
  //               ~protocolVersionRange="0.0.1",
  //               (),
  //             ),
  //           }
  //       },
  //     )

  //     \"when"(
  //       "render after useEffectOnceAsync",
  //       () => {
  //         ()
  //       },
  //     )

  //     CucumberAsync.execStep(
  //       then,
  //       "should set empty",
  //       () => {
  //         _setContributes([])
  //       },
  //     )
  //   })

  //   // test(."has multiple implements of contribute protocol", ({given, \"when", \"and", then}) => {
  //   //   let a: FrontendUtils.BackendCloudbaseType.protocol = {
  //   //     name: "a",
  //   //     version: "0.0.1",
  //   //     iconBase64: "i1",
  //   //     account: "meta3d",
  //   //   }

  //   //   _prepare(given)

  //   //   given("publish contribute protocol a", () => {
  //   //     allPublishContributeProtocols := [a]
  //   //   })

  //   //   \"and"("select contribute a1 and a2 for a", () => {
  //   //     selectedContributesFromMarket :=
  //   //       list{
  //   //         ContributeTool.buildSelectedContribute(
  //   //           ~id="a1",
  //   //           ~protocolName=a.name,
  //   //           ~protocolVersionRange=a.version,
  //   //           (),
  //   //         ),
  //   //         ContributeTool.buildSelectedContribute(
  //   //           ~id="a2",
  //   //           ~protocolName=a.name,
  //   //           ~protocolVersionRange=a.version,
  //   //           (),
  //   //         ),
  //   //       }
  //   //   })

  //   //   \"when"("render after useEffectOnceAsync", () => {
  //   //     ()
  //   //   })

  //   //   CucumberAsync.execStep(then, "should set empty", () => {
  //   //     _setContributes([])
  //   //   })
  //   // })

  //   test(."contribute's version not match", ({given, \"when", \"and", then}) => {
  //     let a: FrontendUtils.BackendCloudbaseType.protocol = BackendCloubaseTool.buildProtocol(
  //       ~name="a",
  //       ~version="0.1.1",
  //       (),
  //     )

  //     _prepare(given)

  //     given(
  //       "publish contribute protocol a",
  //       () => {
  //         allPublishContributeProtocols := [a]
  //       },
  //     )

  //     \"and"(
  //       "select contribute a1 for a with old version",
  //       () => {
  //         selectedContributesFromMarket :=
  //           list{
  //             ContributeTool.buildSelectedContribute(
  //               ~protocolName=a.name,
  //               ~protocolVersionRange=">= 1.0.0",
  //               (),
  //             ),
  //           }
  //       },
  //     )

  //     \"when"(
  //       "render after useEffectOnceAsync",
  //       () => {
  //         ()
  //       },
  //     )

  //     CucumberAsync.execStep(
  //       then,
  //       "should set empty",
  //       () => {
  //         _setContributes([])
  //       },
  //     )
  //   })
})
