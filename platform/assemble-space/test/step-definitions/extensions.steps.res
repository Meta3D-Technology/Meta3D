open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open Sinon

open Js.Promise

let feature = loadFeature("./test/features/extensions.feature")

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
//         ExtensionsTool.buildUI(~sandbox, ~service=ServiceTool.build(~sandbox, ()), ())
//         ->ReactTestRenderer.create
//         ->ReactTestTool.createSnapshotAndMatch
//       },
//     )
//   })

  test(."show extensions list exclude selected extensions", ({
    given,
    \"when",
    \"and",
    then,
  }) => {
    let extension1Name = "e1"
    let extension2Name = "e2"
    // let useStateStub = ref(Obj.magic(1))
    let useSelectorStub = ref(Obj.magic(1))

    _prepare(given)

    given(
      "prepare extensions",
      () => {
        // useStateStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

        // useStateStub.contents
        // ->onCall(1, _)
        // ->returns(
        //   (
        //     [
        //       (
        //         Obj.magic(1),
        //         Obj.magic(1),
        //         Obj.magic(1),
        //         Obj.magic(1),
        //         Obj.magic(1),
        //         Obj.magic(1),
        //         ExtensionTool.buildSelectedExtension(
        //           ~name=extension1Name,
        //           ~protocolName=Obj.magic(1),
        //           ~protocolVersion=Obj.magic(1),
        //           (),
        //         )->ExtensionTool.getExtension,
        //       ),
        //       (
        //         Obj.magic(1),
        //         Obj.magic(1),
        //         Obj.magic(1),
        //         Obj.magic(1),
        //         Obj.magic(1),
        //         Obj.magic(1),
        //         ExtensionTool.buildSelectedExtension(
        //           ~name=extension2Name,
        //           ~protocolName=Obj.magic(1),
        //           ~protocolVersion=Obj.magic(1),
        //           (),
        //         )->ExtensionTool.getExtension,
        //       ),
        //     ],
        //     _ => [],
        //   ),
        //   _,
        // )
        // ->ignore
        ()
      },
    )

    \"and"(
      "prepare selected extensions",
      () => {
        useSelectorStub :=
          createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
            list{SelectedExtensionsTool.buildSelectedExtension(~name=extension1Name, ())},
            _,
          )
      },
    )

    \"when"(
      "render",
      () => {
        // useStateStub.contents->onCall(0, _)->returns((true, _ => true), _)->ignore
        ()
      },
    )

    then(
      "should show extensions list exclude selected extensions",
      () => {
        ExtensionsTool.buildUI(
          ~sandbox,
          ~service=ServiceTool.build(
            ~sandbox,
            // ~useState=useStateStub.contents->Obj.magic,
            ~useSelector=useSelectorStub.contents->Obj.magic,
            (),
          ),
          (),
        )
        ->ReactTestRenderer.create
        ->ReactTestTool.createSnapshotAndMatch
      },
    )
  })

//   let _setExtensions = extensions => {
//     let setExtensionsStub = createEmptyStub(refJsObjToSandbox(sandbox.contents))

//     ExtensionsTool.useEffectOnceAsync(
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

//   test(."set extensions when select one extension from market", ({
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

//         ExtensionsTool.useEffectOnceAsync(
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

//         ExtensionsTool.useEffectOnceAsync(
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

//   test(."set extensions when select one extension from market of the protocol with low version", ({
//     given,
//     \"when",
//     \"and",
//     then,
//   }) => {
//     let protocolName = "a"
//     let protocolIconBase64 = "i1"
//     let a_low: FrontendUtils.BackendCloudbaseType.protocol = BackendCloubaseTool.buildProtocol(
//       ~name=protocolName,
//       ~version="0.1.0",
//       ~iconBase64=protocolIconBase64,
//       ~displayName="ald1",
//       (),
//     )
//     let a_high: FrontendUtils.BackendCloudbaseType.protocol = BackendCloubaseTool.buildProtocol(
//       ~name=protocolName,
//       ~version="0.1.1",
//       ~iconBase64=protocolIconBase64,
//       (),
//     )
//     let a1DisplayName = "a1"
//     let protocolConfig = ProtocolConfigTool.buildProtocolConfig(~configStr="a_config", ())

//     _prepare(given)

//     given(
//       "publish extension protocol a with low version and high version",
//       () => {
//         allPublishExtensionProtocols := [a_low, a_high]
//       },
//     )

//     \"and"(
//       "select extension a1 for a from market of low version",
//       () => {
//         selectedExtensionsFromMarket :=
//           list{
//             ExtensionTool.buildSelectedExtension(
//               ~displayName=a1DisplayName,
//               ~protocolName,
//               ~protocolVersionRange="^0.1.0",
//               // ~protocolVersion=a_low.version,
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

//     // CucumberAsync.execStep(
//     //   then,
//     //   "should mark loaded",
//     //   () => {
//     //     let setIsLoadedStub = createEmptyStub(refJsObjToSandbox(sandbox.contents))

//     //     ExtensionsTool.useEffectOnceAsync(
//     //       ~sandbox,
//     //       ~setIsLoaded=setIsLoadedStub,
//     //       ~service=ServiceTool.build(
//     //         ~sandbox,
//     //         ~getAllPublishExtensionProtocols=createEmptyStub(
//     //           refJsObjToSandbox(sandbox.contents),
//     //         )->returns(Meta3dBsMostDefault.Most.just(allPublishExtensionProtocols.contents), _),
//     //         (),
//     //       ),
//     //       ~selectedExtensionsFromMarket=selectedExtensionsFromMarket.contents,
//     //       (),
//     //     )
//     //     ->ServiceTool.getUseEffectOncePromise
//     //     ->then_(
//     //       () => {
//     //         (ReactHookTool.getValue(~setLocalValueStub=setIsLoadedStub, ())->expect == true)
//     //           ->resolve
//     //       },
//     //       _,
//     //     )
//     //   },
//     // )

//     CucumberAsync.execStep(
//       \"and",
//       "extensions should has only one a1",
//       () => {
//         _setExtensions([
//           (
//             a1DisplayName,
//             protocolIconBase64,
//             a_low.displayName,
//             a_low.repoLink,
//             a_low.description,
//             protocolConfig.configStr,
//             selectedExtensionsFromMarket.contents->ListTool.getHeadExn->ExtensionTool.getExtension,
//           ),
//           // (
//           //   a2DisplayName,
//           //   a.iconBase64,
//           //   protocolConfig.configStr,
//           //   selectedExtensionsFromMarket.contents->ListTool.getNthExn(1)->ExtensionTool.getExtension,
//           // ),
//         ])
//       },
//     )
//   })

//   // test(."set extensions exclude selected extensions", ({given, \"when", \"and", then}) => {
//   //   let a: FrontendUtils.BackendCloudbaseType.protocol = BackendCloubaseTool.buildProtocol(
//   //     ~name="a",
//   //     ~version="1.0.1",
//   //     (),
//   //   )
//   //   let a1Name = "a1"
//   //   // let a1DisplayName = "a1"
//   //   let protocolConfig = ProtocolConfigTool.buildProtocolConfig(~configStr="a_config", ())

//   //   _prepare(given)

//   //   given(
//   //     "publish extension protocol a",
//   //     () => {
//   //       allPublishExtensionProtocols := [a]
//   //     },
//   //   )

//   //   \"and"(
//   //     "select extension a1 for a from market",
//   //     () => {
//   //       selectedExtensionsFromMarket :=
//   //         list{
//   //           ExtensionTool.buildSelectedExtension(
//   //             // ~displayName=a1DisplayName,
//   //             ~name=a1Name,
//   //             ~protocolName=a.name,
//   //             // ~protocolVersionRange=">= 1.0.0",
//   //             ~protocolVersion=a.version,
//   //             ~protocolConfig=protocolConfig->Some,
//   //             (),
//   //           ),
//   //         }
//   //     },
//   //   )

//   //   \"and"(
//   //     "select extension a1 for a",
//   //     () => {
//   //       selectedExtensions := list{SelectedExtensionsTool.buildSelectedExtension(~name=a1Name, ())}
//   //     },
//   //   )

//   //   \"when"(
//   //     "render after useEffectOnceAsync",
//   //     () => {
//   //       ()
//   //     },
//   //   )

//   //   CucumberAsync.execStep(
//   //     \"and",
//   //     "extensions should has only be empty",
//   //     () => {
//   //       _setExtensions([])
//   //     },
//   //   )
//   // })

//   test(."select extension", ({given, \"when", \"and", then}) => {
//     let a: FrontendUtils.BackendCloudbaseType.protocol = BackendCloubaseTool.buildProtocol(
//       ~name="a",
//       ~version="1.0.1",
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

//         ExtensionsTool.selectExtension(
//           ~dispatch=dispatchStub.contents,
//           ~iconBase64=a.iconBase64,
//           ~extension,
//           ~protocolConfigStr=protocolConfig->ExtensionsTool.getProtocolConfigStr,
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
//           FrontendUtils.ApAssembleStoreType.SelectExtension(
//             a.iconBase64,
//             protocolConfig->ExtensionsTool.getProtocolConfigStr,
//             extension,
//           ),
//         )
//         ->expect == true
//       },
//     )
//   })

//   test(."has zero implement of extension protocol", ({given, \"when", \"and", then}) => {
//     let a: FrontendUtils.BackendCloudbaseType.protocol = BackendCloubaseTool.buildProtocol(
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
//               ~protocolVersionRange="0.0.1",
//               // ~protocolVersion=a.version,
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
//   //   let a: FrontendUtils.BackendCloudbaseType.protocol = {
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
//     let a: FrontendUtils.BackendCloudbaseType.protocol = BackendCloubaseTool.buildProtocol(
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

//   test(."extension's protocol has multiple version with different displayName", ({
//     given,
//     \"when",
//     \"and",
//     then,
//   }) => {
//     let protocolName = "a"
//     let protocolIconBase64 = "i1"
//     let a_low: FrontendUtils.BackendCloudbaseType.protocol = BackendCloubaseTool.buildProtocol(
//       ~name=protocolName,
//       ~version="0.1.0",
//       ~iconBase64=protocolIconBase64,
//       ~displayName="lowD",
//       (),
//     )
//     let a_high: FrontendUtils.BackendCloudbaseType.protocol = BackendCloubaseTool.buildProtocol(
//       ~name=protocolName,
//       ~version="0.1.1",
//       ~iconBase64=protocolIconBase64,
//       ~displayName="highD",
//       (),
//     )
//     let a1DisplayName = "a1"
//     let protocolConfig = ProtocolConfigTool.buildProtocolConfig(~configStr="a_config", ())

//     _prepare(given)

//     given(
//       "publish extension protocol a with low version and high version with different displayName",
//       () => {
//         allPublishExtensionProtocols := [a_low, a_high]
//       },
//     )

//     \"and"(
//       "select extension a1 for a from market with low versionRange",
//       () => {
//         selectedExtensionsFromMarket :=
//           list{
//             ExtensionTool.buildSelectedExtension(
//               ~displayName=a1DisplayName,
//               ~protocolName,
//               ~protocolVersionRange="^0.1.0",
//               // ~protocolVersion="0.1.1",
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
//       \"and",
//       "extensions should has a1 whose protocolDisplay is low version protocol's displayName",
//       () => {
//         _setExtensions([
//           (
//             a1DisplayName,
//             protocolIconBase64,
//             a_low.displayName,
//             a_low.repoLink,
//             a_low.description,
//             protocolConfig.configStr,
//             selectedExtensionsFromMarket.contents->ListTool.getHeadExn->ExtensionTool.getExtension,
//           ),
//         ])
//       },
//     )
//   })
})
