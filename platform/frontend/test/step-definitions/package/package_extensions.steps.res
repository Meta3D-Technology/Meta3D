open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open Sinon

open Js.Promise

let feature = loadFeature("./test/features/package/package_extensions.feature")

defineFeature(feature, test => {
  let sandbox = ref(Obj.magic(1))
  let allPublishExtensionProtocols = ref([])
  let selectedExtensionsFromMarket = ref(list{})

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
  //         PackageExtensionsTool.buildUI(~sandbox, ~service=ServiceTool.build(~sandbox, ()), ())
  //         ->ReactTestRenderer.create
  //         ->ReactTestTool.createSnapshotAndMatch
  //       },
  //     )
  //   })

  test(."show extensions list", ({given, \"when", \"and", then}) => {
    _prepare(given)

    \"when"(
      "render",
      () => {
        ()
      },
    )

    then(
      "should show extensions list",
      () => {
        // let useStateStub = createEmptyStub(refJsObjToSandbox(sandbox.contents))
        // useStateStub
        // ->onCall(0, _)
        // ->returns((true, _ => true), _)
        // ->onCall(1, _)
        // ->returns(([], _ => []), _)
        // ->ignore

        PackageExtensionsTool.buildUI(~sandbox, ~service=ServiceTool.build(~sandbox, ()), ())
        ->ReactTestRenderer.create
        ->ReactTestTool.createSnapshotAndMatch
      },
    )
  })

  //   let _setExtensions = extensions => {
  //     let setExtensionsStub = createEmptyStub(refJsObjToSandbox(sandbox.contents))

  //     PackageExtensionsTool.useEffectOnceAsync(
  //       ~sandbox,
  //       ~setExtensions=setExtensionsStub,
  //       ~service=ServiceTool.build(
  //         ~sandbox,
  //         ~getAllPublishExtensionProtocols=createEmptyStub(
  //           refJsObjToSandbox(sandbox.contents),
  //         )->returns(Meta3dBsMostDefault.Most.just(allPublishExtensionProtocols.contents), _),
  //         (),
  //       ),
  //       ~selectedExtensionsFromMarket=selectedExtensionsFromMarket.contents,
  //       (),
  //     )
  //     ->ServiceTool.getUseEffectOncePromise
  //     ->then_(() => {
  //       (ReactHookTool.getValue(~setLocalValueStub=setExtensionsStub, ())->expect == extensions)
  //         ->resolve
  //     }, _)
  //   }

  //   test(."set extensions when select one extension from market", ({given, \"when", \"and", then}) => {
  //     let a: BackendCloudbaseType.protocol = BackendCloubaseTool.buildProtocol(
  //       ~name="a",
  //       ~version="1.0.1",
  //       (),
  //     )
  //     let a1DisplayName = "a1"
  //     let protocolConfig = ProtocolConfigTool.buildProtocolConfig(~configStr="a_config", ())

  //     _prepare(given)

  //     given(
  //       "publish extension protocol a",
  //       () => {
  //         allPublishExtensionProtocols := [a]
  //       },
  //     )

  //     \"and"(
  //       "select extension a1 for a from market",
  //       () => {
  //         selectedExtensionsFromMarket :=
  //           list{
  //             ExtensionTool.buildSelectedExtension(
  //               // ~name=a1DisplayName,
  //               ~displayName=a1DisplayName,
  //               ~protocolName=a.name,
  //               ~protocolVersionRange=">= 1.0.0",
  //               // ~protocolVersion=a.version,
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

  //         PackageExtensionsTool.useEffectOnceAsync(
  //           ~sandbox,
  //           ~setIsLoaded=setIsLoadedStub,
  //           ~service=ServiceTool.build(
  //             ~sandbox,
  //             ~getAllPublishExtensionProtocols=createEmptyStub(
  //               refJsObjToSandbox(sandbox.contents),
  //             )->returns(Meta3dBsMostDefault.Most.just(allPublishExtensionProtocols.contents), _),
  //             (),
  //           ),
  //           ~selectedExtensionsFromMarket=selectedExtensionsFromMarket.contents,
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
  //       "should set a's icon, config str and a1's displayName as extensions",
  //       () => {
  //         _setExtensions([
  //           (
  //             a1DisplayName,
  //             a.iconBase64,
  //             a.displayName,
  //             a.repoLink,
  //             a.description,
  //             protocolConfig.configStr,
  //             selectedExtensionsFromMarket.contents->ListTool.getHeadExn->ExtensionTool.getExtension,
  //           ),
  //         ])
  //       },
  //     )
  //   })

  //   test(."set extensions when select two extensions of the same protocol from market", ({
  //     given,
  //     \"when",
  //     \"and",
  //     then,
  //   }) => {
  //     let a: BackendCloudbaseType.protocol = BackendCloubaseTool.buildProtocol(
  //       ~name="a",
  //       ~version="1.0.1",
  //       (),
  //     )
  //     let a1DisplayName = "a1"
  //     let a2DisplayName = "a2"
  //     let protocolConfig = ProtocolConfigTool.buildProtocolConfig(~configStr="a_config", ())

  //     _prepare(given)

  //     given(
  //       "publish extension protocol a",
  //       () => {
  //         allPublishExtensionProtocols := [a]
  //       },
  //     )

  //     \"and"(
  //       "select extension a1, a2 for a from market",
  //       () => {
  //         selectedExtensionsFromMarket :=
  //           list{
  //             ExtensionTool.buildSelectedExtension(
  //               ~displayName=a1DisplayName,
  //               ~protocolName=a.name,
  //               ~protocolVersionRange=">= 1.0.0",
  //               // ~protocolVersion=a.version,
  //               ~protocolConfig=protocolConfig->Some,
  //               (),
  //             ),
  //             ExtensionTool.buildSelectedExtension(
  //               ~displayName=a2DisplayName,
  //               ~protocolName=a.name,
  //               ~protocolVersionRange=">= 1.0.0",
  //               // ~protocolVersion=a.version,
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

  //         PackageExtensionsTool.useEffectOnceAsync(
  //           ~sandbox,
  //           ~setIsLoaded=setIsLoadedStub,
  //           ~service=ServiceTool.build(
  //             ~sandbox,
  //             ~getAllPublishExtensionProtocols=createEmptyStub(
  //               refJsObjToSandbox(sandbox.contents),
  //             )->returns(Meta3dBsMostDefault.Most.just(allPublishExtensionProtocols.contents), _),
  //             (),
  //           ),
  //           ~selectedExtensionsFromMarket=selectedExtensionsFromMarket.contents,
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
  //       "extensions should contain a1 and a2",
  //       () => {
  //         _setExtensions([
  //           (
  //             a1DisplayName,
  //             a.iconBase64,
  //             a.displayName,
  //             a.repoLink,
  //             a.description,
  //             protocolConfig.configStr,
  //             selectedExtensionsFromMarket.contents->ListTool.getHeadExn->ExtensionTool.getExtension,
  //           ),
  //           (
  //             a2DisplayName,
  //             a.iconBase64,
  //             a.displayName,
  //             a.repoLink,
  //             a.description,
  //             protocolConfig.configStr,
  //             selectedExtensionsFromMarket.contents
  //             ->ListTool.getNthExn(1)
  //             ->ExtensionTool.getExtension,
  //           ),
  //         ])
  //       },
  //     )
  //   })

  //   test(."select extension", ({given, \"when", \"and", then}) => {
  //     let a: BackendCloudbaseType.protocol = BackendCloubaseTool.buildProtocol(
  //       ~name="a",
  //       ~version="1.0.1",
  //       ~displayName="d1",
  //       ~repoLink="l1",
  //       ~description="dp1",
  //       (),
  //     )
  //     let dispatchStub = ref(Obj.magic(1))

  //     _prepare(given)

  //     given(
  //       "publish extension protocol a",
  //       () => {
  //         allPublishExtensionProtocols := [a]
  //       },
  //     )

  //     \"and"(
  //       "select extension a1 for a from market",
  //       () => {
  //         selectedExtensionsFromMarket :=
  //           list{
  //             ExtensionTool.buildSelectedExtension(
  //               ~protocolName=a.name,
  //               ~protocolVersionRange=">= 1.0.0",
  //               // ~protocolVersion=a.version,
  //               (),
  //             ),
  //           }
  //       },
  //     )

  //     \"and"(
  //       "render after useEffectOnceAsync",
  //       () => {
  //         ()
  //       },
  //     )

  //     \"when"(
  //       "select a1",
  //       () => {
  //         dispatchStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

  //         let (extension, protocolConfig) = selectedExtensionsFromMarket.contents->ListTool.getHeadExn

  //         PackageExtensionsTool.selectExtension(
  //           ~dispatch=dispatchStub.contents,
  //           ~iconBase64=a.iconBase64,
  //           ~extension,
  //           ~protocolDisplayName=a.displayName,
  //           ~protocolRepoLink=a.repoLink,
  //           ~protocolDescription=a.description,
  //           ~protocolConfigStr=protocolConfig->PackageExtensionsTool.getProtocolConfigStr,
  //           (),
  //         )
  //       },
  //     )

  //     then(
  //       "should dispatch SelectExtension action",
  //       () => {
  //         let (extension, protocolConfig) = selectedExtensionsFromMarket.contents->ListTool.getHeadExn

  //         dispatchStub.contents
  //         ->Obj.magic
  //         ->SinonTool.calledWith(
  //           PackageAssembleStoreType.SelectExtension(
  //             a.iconBase64,
  //             a.displayName,
  //             a.repoLink,
  //             a.description,
  //             protocolConfig->PackageExtensionsTool.getProtocolConfigStr,
  //             extension,
  //           ),
  //         )
  //         ->expect == true
  //       },
  //     )
  //   })

  //   test(."has zero implement of extension protocol", ({given, \"when", \"and", then}) => {
  //     let a: BackendCloudbaseType.protocol = BackendCloubaseTool.buildProtocol(
  //       ~name="a",
  //       ~version="0.0.1",
  //       (),
  //     )

  //     _prepare(given)

  //     given(
  //       "publish extension protocol a",
  //       () => {
  //         allPublishExtensionProtocols := [a]
  //       },
  //     )

  //     \"and"(
  //       "select extension b1 for protocol b from market",
  //       () => {
  //         selectedExtensionsFromMarket :=
  //           list{
  //             ExtensionTool.buildSelectedExtension(
  //               ~protocolName="b",
  //               ~protocolVersion="0.0.1",
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
  //         _setExtensions([])
  //       },
  //     )
  //   })

  //   // test(."has multiple implements of extension protocol", ({given, \"when", \"and", then}) => {
  //   //   let a: BackendCloudbaseType.protocol = {
  //   //     name: "a",
  //   //     version: "0.0.1",
  //   //     iconBase64: "i1",
  //   //     account: "meta3d",
  //   //   }

  //   //   _prepare(given)

  //   //   given("publish extension protocol a", () => {
  //   //     allPublishExtensionProtocols := [a]
  //   //   })

  //   //   \"and"("select extension a1 and a2 for a", () => {
  //   //     selectedExtensionsFromMarket :=
  //   //       list{
  //   //         ExtensionTool.buildSelectedExtension(
  //   //           ~id="a1",
  //   //           ~protocolName=a.name,
  //   //           ~protocolVersionRange=a.version,
  //   //           (),
  //   //         ),
  //   //         ExtensionTool.buildSelectedExtension(
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
  //   //     _setExtensions([])
  //   //   })
  //   // })

  //   test(."extension's version not match", ({given, \"when", \"and", then}) => {
  //     let a: BackendCloudbaseType.protocol = BackendCloubaseTool.buildProtocol(
  //       ~name="a",
  //       ~version="0.1.1",
  //       (),
  //     )

  //     _prepare(given)

  //     given(
  //       "publish extension protocol a",
  //       () => {
  //         allPublishExtensionProtocols := [a]
  //       },
  //     )

  //     \"and"(
  //       "select extension a1 for a from market with old version",
  //       () => {
  //         selectedExtensionsFromMarket :=
  //           list{
  //             ExtensionTool.buildSelectedExtension(
  //               ~protocolName=a.name,
  //               ~protocolVersionRange=">= 1.0.0",
  //               // ~protocolVersion="1.0.0",
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
  //         _setExtensions([])
  //       },
  //     )
  //   })
})
