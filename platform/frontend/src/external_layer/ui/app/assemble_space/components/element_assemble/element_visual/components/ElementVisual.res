open Antd
%%raw("import 'antd/dist/antd.css'")
open AssembleSpaceType

type elementAssembleData =
  | No
  | Loading
  | Loaded(BackendCloudbaseType.elementAssembleData)

module Method = {
  // let _getVisualExtensionName = () => "meta3d-element-assemble-visual"

  // let _getVisualExtensionProtocolName = () => "meta3d-element-assemble-visual-protocol"

  // let getAndSetNewestVisualExtension = (service, dispatch, isDebug) => {
  //   ElementVisualUtils.getAndSetNewestVisualExtension(
  //     service,
  //     dispatch,
  //     extension => ElementAssembleStoreType.SetVisualExtension(extension),
  //     (_getVisualExtensionProtocolName(), _getVisualExtensionName()),
  //     isDebug,
  //   )
  // }

  let _getInitData = (service: AssembleSpaceType.service, isDebug) => {
    {
      "target": "visual",
      "isDebug": isDebug,
      "canvas": service.dom.querySelector("#ui-visual-canvas")->Meta3dCommonlib.OptionSt.getExn,
    }->Obj.magic
  }

  let _getUpdateData = (clearColor, skinName, time) => {
    {
      "target": "visual",
      "clearColor": clearColor,
      "skinName": skinName,
      "time": time,
    }->Obj.magic
  }

  let _updateElementContribute = (meta3dState, service, elementContribute) => {
    // let meta3dUIExtensionProtocolName = ElementVisualUtils.getUIExtensionProtocolName()

    // let uiState: Meta3dUiProtocol.StateType.state = service.meta3d.getExtensionState(.
    //   meta3dState,
    //   meta3dUIExtensionProtocolName,
    // )

    // // let meta3dState = service.meta3d.registerContribute(meta3dState, elementContribute)

    // let uiState = (
    //   service.meta3d.getExtensionService(.
    //     meta3dState,
    //     meta3dUIExtensionProtocolName,
    //   ): Meta3dUiProtocol.ServiceType.service
    // ).registerElement(uiState, elementContribute)

    // service.meta3d.setExtensionState(. meta3dState, meta3dUIExtensionProtocolName, uiState)

    let editorWholePackageService: Meta3dEditorWholeProtocol.ServiceType.service =
      service.meta3d.getPackageService(.
        meta3dState,
        ElementVisualUtils.getEditorWholePackageProtocolName(),
      )->Meta3dCommonlib.NullableSt.getExn

    editorWholePackageService.ui(meta3dState).registerElement(meta3dState, elementContribute)
  }

  let rec _loop = (
    service: AssembleSpaceType.service,
    loopFrameID: React.ref<option<int>>,
    {clearColor, skinName} as apInspectorData: ApAssembleStoreType.apInspectorData,
    time,
    meta3dState,
  ) => {
    let meta3dState = switch ElementContributeApService.getElementContribute(
      SpaceStateApService.getState(),
    ) {
    | None => meta3dState
    | Some(elementContribute) =>
      _updateElementContribute(
        meta3dState,
        service,
        service.meta3d.execGetContributeFunc(.
          elementContribute.data.contributeFuncData,
          // Meta3dCommonlib.ImmutableHashMap.createEmpty()
          // ->Meta3dCommonlib.ImmutableHashMap.set(
          //   "meta3dUIExtensionProtocolName",
          //   ElementVisualUtils.getUIExtensionProtocolName(),
          // )
          // ->Meta3dCommonlib.ImmutableHashMap.set(
          //   "meta3dImguiRendererExtensionProtocolName",
          //   "meta3d-imgui-renderer-protocol",
          // ),
          // Meta3dCommonlib.ImmutableHashMap.createEmpty(),
        )->Obj.magic,
      )
    }

    service.meta3d.updateExtension(.
      meta3dState,
      ElementVisualUtils.getEditorWholePackageProtocolName(),
      _getUpdateData(clearColor, skinName, time),
    )
    ->Js.Promise.then_(meta3dState => {
      loopFrameID.current =
        service.other.requestAnimationOtherFrame(time => {
          _loop(service, loopFrameID, apInspectorData, time, meta3dState)
        })->Some

      ()->Js.Promise.resolve
    }, _)
    ->ignore
  }

  let _generateApp = (service, ((selectPackages, allPackagesStoredInApp), selectedContributes)) => {
    // (account, selectedUIControlInspectorData),

    AppUtils.generateApp(
      service,
      (selectPackages, allPackagesStoredInApp),
      selectedContributes
      // ->ElementUtils.addGeneratedInputContributesForElementAssemble(
      //   (service.meta3d.generateContribute, service.meta3d.loadContribute),
      //   _,
      //   account,
      //   selectedUIControlInspectorData,
      // )
      // ->ElementUtils.addGeneratedActionContributesForElementAssemble(
      //   (service.meta3d.generateContribute, service.meta3d.loadContribute),
      //   _,
      //   account,
      //   selectedUIControlInspectorData,
      // )
      ->Meta3dCommonlib.ListSt.toArray,
      list{},
      // (list{}, list{}),
      Js.Nullable.null,
    )
  }

  let startApp = (
    service,
    loopFrameID: React.ref<option<int>>,
    (selectedPackages, selectedContributes, storedPackageIdsInApp),
    // (account, selectedUIControlInspectorData),
    // visualExtension,
    {isDebug} as apInspectorData: ApAssembleStoreType.apInspectorData,
  ) => {
    let (meta3dState, _, _) = service.meta3d.loadApp(.
      ElementVisualUtils.buildEmptyAddGeneratedContributeFunc(),
      _generateApp(
        service,
        (
          AppUtils.splitPackages(selectedPackages, storedPackageIdsInApp),
          // selectedExtensions->Meta3dCommonlib.ListSt.toArray,
          selectedContributes,
        ),
        // (account, selectedUIControlInspectorData),
        // visualExtension,
      ),
    )

    service.meta3d.initExtension(.
      meta3dState,
      ElementVisualUtils.getEditorWholePackageProtocolName(),
      _getInitData(service, isDebug),
    )
    ->Js.Promise.then_(meta3dState => {
      loopFrameID.current =
        service.other.requestAnimationFirstFrame(time => {
          ErrorUtils.showCatchedErrorMessage(
            () => {
              _loop(service, loopFrameID, apInspectorData, time, meta3dState)
            },
            5->Some,
          )
        })->Some

      ()->Js.Promise.resolve
    }, _)
    ->Meta3dBsMostDefault.Most.fromPromise
    ->Meta3dBsMostDefault.Most.drain
    ->Js.Promise.catch(e => {
      service.console.errorWithExn(. e->Error.promiseErrorToExn, None)->Obj.magic
    }, _)
  }

  // let isLoaded = elementAssembleData => {
  //   switch elementAssembleData {
  //   | Loading => false
  //   | _ => true
  //   }
  // }

  // let _getElementContributeName = () => "meta3d-element-assemble-element"

  // let getElementContributeVersion = () => VersionConfig.getPlatformVersion()

  let buildElementContributeFileStr = ElementContributeUtils.buildElementContributeFileStr
  // let buildElementContributeFileStr = (
  //   service,
  //   selectedUIControls,
  //   selectedUIControlInspectorData,
  // ) =>
  //   // elementStateFields,

  //   ElementContributeUtils.buildElementContributeFileStr(
  //     service,
  //     _getElementContributeName(),
  //     selectedUIControls,
  //     selectedUIControlInspectorData,
  //     // elementStateFields,
  //   )

  // let _buildContribute = (version, data): ApAssembleStoreType.contribute => {
  //   id: "",
  //   version,
  //   protocolIconBase64: "",
  //   protocolConfigStr: None,
  //   // newName: name->Some,
  //   data,
  // }

  // let _generateElementContribute = (
  //   service,
  //   protocolName,
  //   protocolVersion,
  //   elementName,
  //   elementVersion,
  //   account,
  //   displayName,
  //   repoLink,
  //   description,
  //   fileStr,
  // ) => {
  //   ElementVisualUtils.generateElementContributeBinaryFile(
  //     service,
  //     elementName,
  //     elementVersion,
  //     account,
  //     protocolName,
  //     protocolVersion,
  //     displayName,
  //     repoLink,
  //     description,
  //     fileStr,
  //   )
  //   ->service.meta3d.loadContribute(. _)
  //   ->_buildContribute(elementVersion, _)
  // }

  let generateElementContribute = ElementVisualUtils.generateElementContribute

  //  (service, account, fileStr) => {
  //   // _generateElementContribute(
  //   //   service,
  //   //   ElementContributeUtils.getElementContributeProtocolName(),
  //   //   ElementUtils.getElementContributeProtocolVersion(),
  //   //   _getElementContributeName(),
  //   //   getElementContributeVersion(),
  //   //   account,
  //   //   _getElementContributeName(),
  //   //   ElementContributeUtils.getElementContributeRepoLink(),
  //   //   ElementContributeUtils.getElementContributeDescription(),
  //   //   fileStr,
  //   // )

  //   ElementVisualUtils.generateElementContributeBinaryFile(service, account, fileStr)
  //   // ->service.meta3d.loadContribute(. _)
  //   // ->_buildContribute(elementVersion, _)
  // }

  let updateElementContribute = (dispatch, elementContribute) => {
    dispatch(ElementAssembleStoreType.SetElementContribute(elementContribute))
  }

  // let getAndSetElementAssembleData = (
  //   service,
  //   setElementAssembleData,
  //   selectedContributes,
  //   account,
  // ) => {
  //   switch selectedContributes->SelectedContributesForElementUtils.getElements {
  //   | elements if elements->Meta3dCommonlib.ListSt.length > 1 =>
  //     service.console.error(. {j`should only select 1 element at most`}, None)

  //     Js.Promise.resolve()
  //   | elements if elements->Meta3dCommonlib.ListSt.length === 0 =>
  //     setElementAssembleData(_ => No)

  //     Js.Promise.resolve()
  //   | list{element} =>
  //     let {version, data} = element

  //     service.backend.getElementAssembleData(.
  //       account->Meta3dCommonlib.OptionSt.getExn,
  //       data.contributePackageData.name,
  //       version,
  //     )
  //     ->Meta3dBsMostDefault.Most.tap(elementAssembleData => {
  //       Meta3dCommonlib.NullableSt.isNullable(elementAssembleData)
  //         ? setElementAssembleData(_ => No)
  //         : setElementAssembleData(_ => Loaded(
  //             elementAssembleData->Meta3dCommonlib.NullableSt.getExn,
  //           ))
  //     }, _)
  //     ->Meta3dBsMostDefault.Most.drain
  //     ->Js.Promise.catch(e => {
  //       service.console.errorWithExn(. e->Error.promiseErrorToExn, None)->Obj.magic
  //     }, _)
  //   }
  // }

  // let _generateSelectedUIControls = (service, selectedContributes, uiControls) => {
  //   let selectedUIControls =
  //     selectedContributes
  //     ->SelectedContributesForElementUtils.getUIControls
  //     ->Meta3dCommonlib.ListSt.toArray

  //   let rec _generate = uiControls => {
  //     uiControls
  //     ->Meta3dCommonlib.ArraySt.map((
  //       {protocol, displayName, children}: BackendCloudbaseType.uiControl,
  //     ) => {
  //       switch selectedUIControls->Meta3dCommonlib.ArraySt.find(selectedUIControl => {
  //         selectedUIControl.data.contributePackageData.protocol.name == protocol.name &&
  //           Meta3d.Semver.gte(
  //             Meta3d.Semver.minVersion(
  //               selectedUIControl.data.contributePackageData.protocol.version,
  //             ),
  //             Meta3d.Semver.minVersion(protocol.version),
  //           )
  //       }) {
  //       | None =>
  //         Meta3dCommonlib.Exception.throwErr(
  //           Meta3dCommonlib.Exception.buildErr(
  //             Meta3dCommonlib.Log.buildErrorMessage(
  //               ~title={
  //                 j`ui control whose displayName:${displayName}, protocolName: ${protocol.name} not select or protocolVersion: ${protocol.version} not match`
  //               },
  //               ~description={
  //                 ""
  //               },
  //               ~reason="",
  //               ~solution=j``,
  //               ~params=j``,
  //             ),
  //           ),
  //         )
  //       | Some({protocolIconBase64, protocolConfigStr, data}) =>
  //         (
  //           {
  //             id: IdUtils.generateId(service.other.random),
  //             protocolIconBase64,
  //             protocolConfigStr: protocolConfigStr->Meta3dCommonlib.OptionSt.getExn,
  //             displayName: data.contributePackageData.displayName,
  //             data,
  //             parentId: None,
  //             children: _generate(children),
  //           }: ElementAssembleStoreType.uiControl
  //         )
  //       }
  //     })
  //     ->Meta3dCommonlib.ListSt.fromArray
  //   }

  //   let rec _addParentId = (uiControls, parentId) => {
  //     uiControls->Meta3dCommonlib.ListSt.map((
  //       {id, children} as uiControl: ElementAssembleStoreType.uiControl,
  //     ) => {
  //       {
  //         ...uiControl,
  //         parentId,
  //         children: _addParentId(children, id->Some),
  //       }
  //     })
  //   }

  //   uiControls->_generate->_addParentId(None)
  // }

  // let _generateSelectedUIControlInspectorData = (
  //   uiControls,
  //   selectedUIControls: ElementAssembleStoreType.selectedUIControls,
  // ) => {
  //   let rec _generate = (
  //     uiControls,
  //     selectedUIControls: ElementAssembleStoreType.selectedUIControls,
  //   ) => {
  //     uiControls
  //     ->Meta3dCommonlib.ArraySt.mapi((
  //       {
  //         rect,
  //         isDraw,
  //         input,
  //         event,
  //         specific,
  //         children,
  //       }: BackendCloudbaseType.uiControl,
  //       index,
  //     ): ElementAssembleStoreType.uiControlInspectorData => {
  //       id: (
  //         selectedUIControls->Meta3dCommonlib.ListSt.nth(index)->Meta3dCommonlib.OptionSt.getExn
  //       ).id,
  //       rect,
  //       isDraw,
  //       input: input->Meta3dCommonlib.OptionSt.fromNullable,
  //       event,
  //       specific,
  //       children: _generate(
  //         children,
  //         (
  //           selectedUIControls->Meta3dCommonlib.ListSt.nth(index)->Meta3dCommonlib.OptionSt.getExn
  //         ).children,
  //       ),
  //     })
  //     ->Meta3dCommonlib.ListSt.fromArray
  //   }

  //   uiControls->_generate(selectedUIControls)
  // }

  // // let _removeNotExistedInputAndEventExceptFileStr = (uiControls, service, selectedContributes) => {
  // //   let selectedActionNames = SelectedContributesForElementUtils.getActions(
  // //     selectedContributes,
  // //   )->Meta3dCommonlib.ListSt.map(({data}) => {
  // //     (service.meta3d.execGetContributeFunc(. data.contributeFuncData)->Obj.magic)["actionName"]
  // //   })
  // //   let selectedInputNames = SelectedContributesForElementUtils.getInputs(
  // //     selectedContributes,
  // //   )->Meta3dCommonlib.ListSt.map(({data}) => {
  // //     (service.meta3d.execGetContributeFunc(. data.contributeFuncData)->Obj.magic)["inputName"]
  // //   })

  // //   let _findCustomInputProtocolName = name => {
  // //     (
  // //       SelectedContributesForElementUtils.getInputs(selectedContributes)
  // //       ->Meta3dCommonlib.Log.printForDebug
  // //       ->Meta3dCommonlib.ListSt.find(({data}) => {
  // //         data.contributePackageData.name == name
  // //       })
  // //       ->Meta3dCommonlib.OptionSt.getExn
  // //     ).data.contributePackageData.protocol.name
  // //   }

  // //   let _findCustomActionProtocolName = name => {
  // //     (
  // //       SelectedContributesForElementUtils.getActions(selectedContributes)
  // //       ->Meta3dCommonlib.ListSt.find(({data}) => {
  // //         data.contributePackageData.name == name
  // //       })
  // //       ->Meta3dCommonlib.OptionSt.getExn
  // //     ).data.contributePackageData.protocol.name
  // //   }

  // //   let rec _remove = uiControls => {
  // //     uiControls->Meta3dCommonlib.ArraySt.map((
  // //       uiControl: BackendCloudbaseType.uiControl,
  // //     ) => {
  // //       {
  // //         ...uiControl,
  // //         input: uiControl.input->Meta3dCommonlib.NullableSt.bind((. input) => {
  // //           ElementVisualUtils.isCustomInput(
  // //             input.inputName->Meta3dCommonlib.Log.printForDebug->_findCustomInputProtocolName,
  // //           ) ||
  // //           selectedInputNames->Meta3dCommonlib.ListSt.includes(input.inputName)
  // //             ? input->Meta3dCommonlib.NullableSt.return
  // //             : Meta3dCommonlib.NullableSt.getEmpty()
  // //         }),
  // //         event: uiControl.event->Meta3dCommonlib.ArraySt.filter(({eventName, actionName}) => {
  // //           ElementVisualUtils.isCustomAction(
  // //             actionName->_findCustomActionProtocolName,
  // //             eventName->Obj.magic,
  // //           ) ||
  // //           selectedActionNames->Meta3dCommonlib.ListSt.includes(actionName)
  // //         }),
  // //         children: _remove(uiControl.children),
  // //       }
  // //     })
  // //   }

  // //   _remove(uiControls)
  // // }

  // let importElement = (service, dispatch, selectedElementsFromMarket, selectedContributes) => {
  //   let mergedUIControls = selectedElementsFromMarket->Meta3dCommonlib.ListSt.reduce([], (
  //     mergedUIControls,
  //     {inspectorData}: BackendCloudbaseType.elementAssembleData,
  //   ) => {
  //     mergedUIControls->Js.Array.concat(inspectorData.uiControls, _)
  //   })
  //   // ->_removeNotExistedInputAndEventExceptFileStr(service, selectedContributes)

  //   let selectedUIControls = _generateSelectedUIControls(
  //     service,
  //     selectedContributes,
  //     mergedUIControls,
  //   )

  //   // let mergedCustomInputs = _mergeCustoms(selectedElementsFromMarket)

  //   dispatch(
  //     ElementAssembleStoreType.Import(
  //       selectedUIControls,
  //       _generateSelectedUIControlInspectorData(mergedUIControls, selectedUIControls),
  //       // mergedCustomInputs,
  //     ),
  //   )
  // }

  let setElementContributeToSpaceState = elementContribute => {
    SpaceStateApService.getState()
    ->ElementContributeApService.setElementContribute(elementContribute)
    ->SpaceStateApService.setState
  }

  let useSelector = ({apAssembleState, elementAssembleState}: AssembleSpaceStoreType.state) => {
    let {
      selectedPackages,
      // selectedExtensions,
      // selectedContributes,
      // selectedElementsFromMarket,
      apInspectorData,
      isPassDependencyGraphCheck,
      storedPackageIdsInApp,
    } = apAssembleState
    let {
      canvasData,
      selectedUIControls,
      selectedUIControlInspectorData,
      // visualExtension,
      elementContribute,
      // elementInspectorData,
      customInputs,
      customActions,
    } = elementAssembleState

    // let (_, elementContribute) = elementContribute

    (
      (
        selectedPackages,
        // selectedExtensions,
        // selectedContributes,
        // selectedElementsFromMarket,
        apInspectorData,
        isPassDependencyGraphCheck,
        storedPackageIdsInApp,
      ),
      (
        canvasData,
        selectedUIControls,
        selectedUIControlInspectorData,
        // visualExtension,
        // elementContribute,
        elementContribute,
        // elementInspectorData,
        customInputs,
        customActions,
      ),
    )
  }
}

@react.component
let make = (
  ~service: service,
  ~account: option<string>,
  // ~selectedElementsFromMarket,
  ~selectedContributes,
) => {
  let dispatch = ReduxUtils.ElementAssemble.useDispatch(service.react.useDispatch)

  let (
    (
      selectedPackages,
      // selectedExtensions,
      // selectedContributes,
      // selectedElementsFromMarket,
      apInspectorData,
      isPassDependencyGraphCheck,
      storedPackageIdsInApp,
    ),
    (
      canvasData,
      selectedUIControls,
      selectedUIControlInspectorData,
      // visualExtension,
      // elementContribute,
      elementContribute,
      // elementInspectorData,

      customInputs,
      customActions,
    ),
  ) = service.react.useSelector(. Method.useSelector)

  // let (elementAssembleData, setElementAssembleData) = service.react.useState(_ => Loading)
  let loopFrameID = service.react.useRef(None)

  // let {elementStateFields} = elementInspectorData

  // service.react.useEffectOnce(() => {
  //   switch visualExtension {
  //   | Some(_) => ()
  //   | None =>
  //     Method.getAndSetNewestVisualExtension(service, dispatch, apInspectorData.isDebug)->ignore
  //   }

  //   ((), None)
  // })

  // service.react.useEffect1(. () => {
  //   Method.getAndSetElementAssembleData(
  //     service,
  //     setElementAssembleData,
  //     selectedContributes,
  //     account,
  //   )->ignore

  //   None
  // }, [selectedContributes])

  // service.react.useEffect1(. () => {
  //   ErrorUtils.showCatchedErrorMessage(() => {
  //     Method.importElement(service, dispatch, elementAssembleData, selectedContributes)
  //   }, 5->Some)

  //   None
  // }, [elementAssembleData])

  // service.react.useEffect1(. () => {
  //   ErrorUtils.showCatchedErrorMessage(() => {
  //     // !isImportElement
  //     //   ? Method.importElement(service, dispatch, selectedElementsFromMarket, selectedContributes)
  //     // : ()

  //     Method.importElement(service, dispatch, selectedElementsFromMarket, selectedContributes)
  //   }, 5->Some)

  //   None
  //   // }, [selectedElementsFromMarket])
  // }, [selectedElementsFromMarket, selectedContributes->Obj.magic])

  service.react.useEffect1(.
    () => {
      ErrorUtils.showCatchedErrorMessage(() => {
        Method.generateElementContribute(
          service,
          account->Meta3dCommonlib.OptionSt.getExn,
          Method.buildElementContributeFileStr(
            service,
            selectedUIControls,
            selectedUIControlInspectorData,
            // elementStateFields,
          ),
        )->Method.updateElementContribute(dispatch, _)
      }, 5->Some)

      None
    },
    [
      selectedUIControls,
      selectedUIControlInspectorData->Obj.magic,
      // elementInspectorData->Obj.magic,
    ],
  )

  service.react.useEffect1(. () => {
    Method.setElementContributeToSpaceState(elementContribute)

    None
  }, [elementContribute])

  service.react.useEffect1(. () => {
    !isPassDependencyGraphCheck
      ? {
          ErrorUtils.error({j`请通过DependencyGraph检查`}, None)

          None
        }
      : {
          // switch visualExtension {
          // | Some(visualExtension) => ErrorUtils.showCatchedErrorMessage(() => {
          //     Method.startApp(
          //       service,
          //       loopFrameID,
          //       (selectedPackages, selectedExtensions, selectedContributes, storedPackageIdsInApp),
          //       visualExtension,
          //       apInspectorData,
          //     )->ignore
          //   }, 5->Some)
          // | _ => ()
          // }
          ErrorUtils.showCatchedErrorMessage(() => {
            Method.startApp(
              service,
              loopFrameID,
              (
                selectedPackages,
                ElementVisualUtils.addGeneratedCustoms(
                  service,
                  selectedContributes,
                  account->Meta3dCommonlib.OptionSt.getExn,
                  customInputs,
                  customActions,
                ),
                storedPackageIdsInApp,
              ),
              // (account->Meta3dCommonlib.OptionSt.getExn, selectedUIControlInspectorData),
              // visualExtension,
              apInspectorData,
            )->ignore
          }, 5->Some)

          (
            () => {
              ElementVisualUtils.cancelAppLoop(service, loopFrameID)
            }
          )->Some
        }

    // }, [visualExtension])
    // }, [])
  }, [selectedContributes, customInputs->Obj.magic, customActions->Obj.magic])

  <>
    // {!Method.isLoaded(elementAssembleData) ? <p> {React.string(`loading...`)} </p> : React.null}
    <canvas
      id="ui-visual-canvas"
      style={ReactDOM.Style.make(
        ~borderStyle="solid",
        ~borderColor="red",
        ~borderWidth="2px",
        ~width={j`${canvasData.width->Js.Int.toString}px`},
        ~height={j`${canvasData.height->Js.Int.toString}px`},
        (),
      )}
      width={j`${canvasData.width->Js.Int.toString}px`}
      height={j`${canvasData.height->Js.Int.toString}px`}
    />
  </>
}
