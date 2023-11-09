// open Meta3dBsJestCucumber
// open Cucumber
// open Expect
// open Operators

// open Sinon

// let feature = loadFeature("./test/features/elementVisual.feature")

// defineFeature(feature, test => {
//   let sandbox = ref(Obj.magic(1))

//   let _prepare = (given, \"and") => {
//     given("prepare", () => {
//       sandbox := createSandbox()
//       ReactTestTool.prepare()

//       FileTool.buildFakeTextDecoder(FileTool.convertUint8ArrayToBuffer)
//       FileTool.buildFakeTextEncoder(.)
//     })
//   }

//   test(."if not loaded, show loading and canvas", ({given, \"when", \"and", then}) => {
//     _prepare(given, \"and")

//     \"when"(
//       "not loaded and render",
//       () => {
//         ()
//       },
//     )

//     then(
//       "should show loading and canvas",
//       () => {
//         let useSelectorStub = createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
//           (
//             (list{}, list{}, list{}, ApInspectorTool.buildApInspectorData()),
//             (
//               CanvasControllerTool.buildCanvasData(),
//               list{},
//               list{},
//               None,
//               None,
              
//             ),
//           ),
//           // (CanvasControllerTool.buildCanvasData(), list{}, list{}, None),

//           _,
//         )

//         ElementVisualTool.buildUI(
//           ~sandbox,
//           ~service=ServiceTool.build(~sandbox, ~useSelector=useSelectorStub, ()),
//           (),
//         )
//         ->ReactTestRenderer.create
//         ->ReactTestTool.createSnapshotAndMatch
//       },
//     )
//   })

//   test(."if loaded, only show canvas", ({given, \"when", \"and", then}) => {
//     let useSelectorStub = ref(Obj.magic(1))
//     let useStateStub = ref(Obj.magic(1))

//     _prepare(given, \"and")

//     given(
//       "prepare the canvas",
//       () => {
//         ()
//       },
//     )

//     \"and"(
//       "set its width, height",
//       () => {
//         useSelectorStub :=
//           createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
//             (
//               (list{}, list{}, list{}, ApInspectorTool.buildApInspectorData()),
//               (
//                 CanvasControllerTool.buildCanvasData(~width=10, ~height=20, ()),
//                 list{},
//                 list{},
//                 Some(Obj.magic(1)),
//                 None,
                
//               ),
//             ),
//             _,
//           )
//       },
//     )

//     \"when"(
//       "loaded and render",
//       () => {
//         useStateStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

//         useStateStub.contents
//         ->onCall(0, _)
//         ->returns((ElementVisual.Loaded(Obj.magic(1)), _ => ElementVisual.Loaded(Obj.magic(1))), _)
//         ->ignore
//       },
//     )

//     then(
//       "should only show canvas",
//       () => {
//         ElementVisualTool.buildUI(
//           ~sandbox,
//           ~service=ServiceTool.build(
//             ~sandbox,
//             ~useSelector=useSelectorStub.contents->Obj.magic,
//             ~useState=useStateStub.contents->Obj.magic,
//             (),
//           ),
//           (),
//         )
//         ->ReactTestRenderer.create
//         ->ReactTestTool.createSnapshotAndMatch
//       },
//     )
//   })

//   test(."get and set newest visual extension", ({given, \"when", \"and", then}) => {
//     let name = ElementVisualTool.getVisualExtensionName()
//     let v1 = ref(Obj.magic(1))
//     let v2 = ref(Obj.magic(1))
//     let isDebug = true
//     let getAllPublishNewestExtensionsStub = ref(Obj.magic(1))
//     let useSelectorStub = ref(Obj.magic(1))
//     let dispatchStub = ref(Obj.magic(1))

//     _prepare(given, \"and")

//     given(
//       "generate visual extension v1 with old version",
//       () => {
//         v1 :=
//           Meta3dTool.generateExtension(
//             ~name,
//             ~protocol={
//               name: ElementVisualTool.getVisualExtensionProtocolName(),
//               version: FrontendUtils.VersionConfig.getPlatformVersion(),
//             },
//             ~dependentBlockProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
//             (),
//           )
//       },
//     )

//     given(
//       "generate visual extension v2 with newest version",
//       () => {
//         v2 :=
//           ExtensionTool.generateExtension(
//             ~name,
//             ~protocolName=ElementVisualTool.getVisualExtensionProtocolName(),
//             ~protocolVersion=FrontendUtils.VersionConfig.getPlatformVersion(),
//             ~dependentBlockProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
//             ~fileStr="",
//             (),
//           )
//         // Meta3d.Main.generateExtension(
//         //   (
//         //     {
//         //       name,
//         //       protocol: {
//         //         name: ElementVisualTool.getVisualExtensionProtocolName(),
//         //         version: FrontendUtils.VersionConfig.getPlatformVersion(),
//         //       },
//         //       dependentBlockProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
//         //       dependentContributeProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
//         //     }: Meta3d.ExtensionFileType.extensionPackageData
//         //   ),
//         //   "",
//         // )
//       },
//     )

//     \"and"(
//       "publish v1, v2",
//       () => {
//         getAllPublishNewestExtensionsStub.contents =
//           createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
//             Meta3dBsMost.Most.just([
//               ExtensionTool.buildExtensionImplement(~file=v1.contents, ~version="0.5.0", ()),
//               ExtensionTool.buildExtensionImplement(~file=v2.contents, ~version="0.5.1", ()),
//             ]),
//             _,
//           )
//       },
//     )

//     CucumberAsync.execStep(
//       \"when",
//       "get and set newest visual extension",
//       () => {
//         dispatchStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

//         ElementVisualTool.getAndSetNewestVisualExtension(
//           ServiceTool.build(
//             ~sandbox,
//             ~loadExtension=Meta3d.Main.loadExtension->Obj.magic,
//             ~getAllPublishNewestExtensions=getAllPublishNewestExtensionsStub.contents,
//             (),
//           ),
//           dispatchStub.contents,
//           isDebug,
//         )
//       },
//     )

//     then(
//       "should dispatch SetVisualExtension action with v2",
//       () => {
//         dispatchStub.contents
//         ->Obj.magic
//         ->SinonTool.calledWith(
//           FrontendUtils.ElementAssembleStoreType.SetVisualExtension(
//             SelectedExtensionsTool.buildSelectedExtension(
//               ~name,
//               ~protocolIconBase64="",
//               ~id="",
//               // ~newName=ElementVisualTool.getVisualExtensionName()->Some,
//               ~data={
//                 extensionPackageData: ExtensionTool.buildExtensionPackageData(
//                   ~name,
//                   ~protocol={
//                     name: ElementVisualTool.getVisualExtensionProtocolName(),
//                     version: FrontendUtils.VersionConfig.getPlatformVersion(),
//                   },
//                   (),
//                 ),
//                 extensionFuncData: matchAny,
//               },
//               (),
//             ),
//           ),
//         )
//         ->expect == true
//       },
//     )
//   })

//   let _prepareStartApp = () => {
//     //TODO implement
//     Obj.magic(1)
//   }

//   test(."start app", ({given, \"when", \"and", then}) => {
//     let element1 = ref(Obj.magic(1))
//     let v = ref(Obj.magic(1))
//     let ui = ref(Obj.magic(1))
//     let event = ref(Obj.magic(1))
//     let c1 = ref(Obj.magic(1))
//     let uiState = Obj.magic(11)
//     let selectedExtensions = ref(list{})
//     let selectedContributes = ref(list{})
//     let useSelectorStub = ref(Obj.magic(1))
//     let getExtensionStateStub = ref(Obj.magic(1))
//     let getExtensionServiceStub = ref(Obj.magic(1))
//     let setExtensionStateFake = ref(Obj.magic(1))
//     let execGetContributeFuncStub = ref(Obj.magic(1))

//     let loopFirstFrameID = 2
//     let loopOtherFrameID = 3
//     // let loopFrameIDRef = ref(ElementVisualTool.buildReactRef(1->Some))
//     let loopFrameIDRef = ReactHookTool.buildReactRef(1->Some)
//     // let useRefStub = ref(Obj.magic(1))

//     _prepare(given, \"and")

//     given(
//       "prepare flag",
//       () => {
//         ElementVisualTool.prepareInitFlag()
//         ElementVisualTool.prepareUpdateFlag()
//       },
//     )

//     \"and"(
//       "generate empty element contribute element1",
//       () => {
//         element1 :=
//           ElementVisualTool.generateElementContribute(
//             ~sandbox,
//             ~service=ServiceTool.build(
//               ~sandbox,
//               ~generateContribute=Meta3d.Main.generateContribute->Obj.magic,
//               ~loadContribute=Meta3d.Main.loadContribute->Obj.magic,
//               (),
//             ),
//             ~fileStr=ElementVisualTool.buildEmptyContributeFileStr(),
//             (),
//           )
//       },
//     )

//     \"and"(
//       "set element1 to space state",
//       () => {
//         ElementVisualTool.setElementContributeToSpaceState(element1.contents->Some)
//       },
//     )

//     \"and"(
//       "get visual extension v",
//       () => {
//         v :=
//           // Meta3d.Main.generateExtension(
//           //   (
//           //     {
//           //       name: ElementVisualTool.getVisualExtensionName(),
//           //       protocol: {
//           //         name: ElementVisualTool.getVisualExtensionProtocolName(),
//           //         version: FrontendUtils.VersionConfig.getPlatformVersion(),
//           //       },
//           //       dependentBlockProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
//           //       dependentContributeProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
//           //     }: Meta3d.ExtensionFileType.extensionPackageData
//           //   ),
//           //   ElementVisualTool.buildEmptyExtensionFileStrWithOnInitAndOnUpdate(1, 11),
//           // )

//           ExtensionTool.generateExtension(
//             ~name=ElementVisualTool.getVisualExtensionName(),
//             ~protocolName=ElementVisualTool.getVisualExtensionProtocolName(),
//             ~protocolVersion=FrontendUtils.VersionConfig.getPlatformVersion(),
//             ~dependentBlockProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
//             ~fileStr=ElementVisualTool.buildEmptyExtensionFileStrWithOnInitAndOnUpdate(1, 11),
//             (),
//           )->ElementVisualTool.loadAndBuildVisualExtension(
//             ServiceTool.build(~sandbox, ~loadExtension=Meta3d.Main.loadExtension->Obj.magic, ()),
//             _,
//           )
//       },
//     )

//     \"and"(
//       "generate extension ui",
//       () => {
//         ui :=
//           ExtensionTool.generateExtension(
//             ~name="meta3d-ui",
//             ~protocolName="meta3d-ui-protocol",
//             ~protocolVersion="^0.6.0",
//             (),
//           )->Meta3d.Main.loadExtension
//       },
//     )

//     \"and"(
//       "generate extension event",
//       () => {
//         event :=
//           ExtensionTool.generateExtension(
//             ~name="meta3d-event",
//             ~protocolName="meta3d-event-protocol",
//             ~protocolVersion="^0.6.0",
//             (),
//           )->Meta3d.Main.loadExtension
//       },
//     )

//     \"and"(
//       "generate contribute c1",
//       () => {
//         c1 := ContributeTool.generateContribute(~name="c1", ())->Meta3d.Main.loadContribute
//       },
//     )

//     \"and"(
//       "select ui",
//       () => {
//         let name = "meta3d-ui"

//         selectedExtensions :=
//           list{
//             SelectedExtensionsTool.buildSelectedExtension(
//               ~name,
//               // ~newName=None,
//               ~id=name,
//               ~data=ui.contents,
//               (),
//             ),
//           }
//       },
//     )

//     \"and"(
//       "select event",
//       () => {
//         let name = "meta3d-event"

//         selectedExtensions :=
//           selectedExtensions.contents->Meta3dCommonlib.ListSt.push(
//             SelectedExtensionsTool.buildSelectedExtension(
//               ~name,
//               // ~newName=None,
//               ~id=name,
//               ~data=event.contents,
//               (),
//             ),
//           )
//       },
//     )

//     \"and"(
//       "select c1",
//       () => {
//         let name = "c1"

//         selectedContributes :=
//           list{
//             SelectedContributesTool.buildSelectedContribute(
//               ~name,
//               // ~newName=None,
//               ~id=name,
//               ~data=c1.contents,
//               (),
//             ),
//           }
//       },
//     )

//     CucumberAsync.execStep(
//       \"when",
//       "start app with ui, c1, v",
//       () => {
//         getExtensionStateStub :=
//           createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(uiState, _)
//         getExtensionServiceStub :=
//           createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
//             {
//               "registerElement": (uiState, _) => uiState,
//             },
//             _,
//           )

//         execGetContributeFuncStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

//         setExtensionStateFake :=
//           ((. meta3dState, meta3dUIExtensionProtocolName, uiState) => meta3dState)

//         ElementVisualTool.startApp(
//           ServiceTool.build(
//             ~sandbox,
//             ~execGetContributeFunc=execGetContributeFuncStub.contents->Obj.magic,
//             ~getExtensionState=getExtensionStateStub.contents->Obj.magic,
//             ~getExtensionService=getExtensionServiceStub.contents->Obj.magic,
//             ~setExtensionState=setExtensionStateFake.contents->Obj.magic,
//             ~generateApp=Meta3d.Main.generateApp->Obj.magic,
//             ~convertAllFileDataForApp=Meta3d.Main.convertAllFileDataForApp->Obj.magic,
//             ~loadApp=Meta3d.Main.loadApp->Obj.magic,
//             ~initExtension=(. meta3dState, extensionName, data) =>
//               Meta3d.Main.initExtension(meta3dState, extensionName, data),
//             ~updateExtension=(. meta3dState, extensionName, data) =>
//               Meta3d.Main.updateExtension(meta3dState, extensionName, data),
//             ~requestAnimationFirstFrame=func => {
//               func(0.)

//               loopFirstFrameID
//             },
//             ~requestAnimationOtherFrame=(. _) => {
//               loopOtherFrameID
//             },
//             ~querySelector=createEmptyStub(refJsObjToSandbox(sandbox.contents))
//             ->returns(Obj.magic(1), _)
//             ->Obj.magic,
//             (),
//           ),
//           loopFrameIDRef,
//           (list{}, selectedExtensions.contents, selectedContributes.contents, list{}),
//           v.contents,
//           ApInspectorTool.buildApInspectorData(),
//         )
//       },
//     )

//     then(
//       "build app with ui, c1, v",
//       () => {
//         ()
//       },
//     )

//     \"and"(
//       "v should be inited",
//       () => {
//         ElementVisualTool.getInitFlag()->expect == 1
//       },
//     )

//     \"and"(
//       "get element1 from space state and update it",
//       () => {
//         (
//           execGetContributeFuncStub.contents
//           ->Obj.magic
//           ->SinonTool.calledWith(
//             matchAny,
//             // Meta3dCommonlib.ImmutableHashMap.createEmpty()
//             // ->Meta3dCommonlib.ImmutableHashMap.set(
//             //   "meta3dUIExtensionProtocolName",
//             //   ElementVisualUtils.getUIExtensionProtocolName(),
//             // )
//             // ->Meta3dCommonlib.ImmutableHashMap.set(
//             //   "meta3dImguiRendererExtensionProtocolName",
//             //   "meta3d-imgui-renderer-protocol",
//             // ),
//             // Meta3dCommonlib.ImmutableHashMap.createEmpty(),
//           ),
//           getExtensionStateStub.contents
//           ->Obj.magic
//           ->SinonTool.calledWithArg2(matchAny, ElementVisualUtils.getUIExtensionProtocolName()),
//           getExtensionStateStub.contents
//           ->Obj.magic
//           ->SinonTool.calledWithArg2(matchAny, ElementVisualUtils.getUIExtensionProtocolName()),
//           getExtensionServiceStub.contents
//           ->Obj.magic
//           ->SinonTool.calledWithArg2(matchAny, ElementVisualUtils.getUIExtensionProtocolName()),
//         )->expect == (true, true, true, true)
//       },
//     )

//     \"and"(
//       "v should be updated",
//       () => {
//         ElementVisualTool.getUpdateFlag()->expect == 11
//       },
//     )

//     \"and"(
//       "store frame id",
//       () => {
//         loopFrameIDRef->ReactHookTool.getReactRefValue->expect == Some(loopOtherFrameID)
//       },
//     )
//   })

//   test(."cancel app loop when unmount", ({given, \"and", \"when", then}) => {
//     let loopFrameIDRef = ref(Obj.magic(1))
//     let cancelAnimationFrameStub = ref(Obj.magic(1))

//     _prepare(given, \"and")

//     given(
//       "set loop frame id to i1",
//       () => {
//         loopFrameIDRef := ReactHookTool.buildReactRef(2->Some)
//       },
//     )

//     \"when"(
//       "cancel loop when unmount",
//       () => {
//         cancelAnimationFrameStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

//         ElementVisualTool.cancelAppLoop(
//           ServiceTool.build(~sandbox, ~cancelAnimationFrame=cancelAnimationFrameStub.contents, ()),
//           loopFrameIDRef.contents,
//         )
//       },
//     )

//     then(
//       "cancel animation frame by i1",
//       () => {
//         cancelAnimationFrameStub.contents
//         ->Obj.magic
//         ->SinonTool.calledWith(loopFrameIDRef.contents->ReactHookTool.getReactRefValue)
//         ->expect == true
//       },
//     )
//   })
// })
