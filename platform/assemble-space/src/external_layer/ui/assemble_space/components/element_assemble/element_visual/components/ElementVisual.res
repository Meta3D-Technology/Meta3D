open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

type elementAssembleData =
  | No
  | Loading
  | Loaded(FrontendUtils.BackendCloudbaseType.elementAssembleData)

module Method = {
  let _getVisualExtensionName = () => "meta3d-element-assemble-visual"

  let _getVisualExtensionProtocolName = () => "meta3d-element-assemble-visual-protocol"

  let getAndSetNewestVisualExtension = (service, dispatch, isDebug) => {
    ElementVisualUtils.getAndSetNewestVisualExtension(
      service,
      dispatch,
      extension => FrontendUtils.ElementAssembleStoreType.SetVisualExtension(extension),
      (_getVisualExtensionProtocolName(), _getVisualExtensionName()),
      isDebug,
    )
  }

  let _getInitData = (service: FrontendUtils.AssembleSpaceType.service, isDebug) => {
    {
      "isDebug": isDebug,
      "canvas": service.dom.querySelector("#ui-visual-canvas")->Meta3dCommonlib.OptionSt.getExn,
    }->Obj.magic
  }

  let _getUpdateData = (clearColor, skinName, time) => {
    {
      "clearColor": clearColor,
      "skinName": skinName,
      "time": time,
    }->Obj.magic
  }

  let _updateElementContribute = (meta3dState, service, elementContribute) => {
    let meta3dUIExtensionProtocolName = ElementVisualUtils.getUIExtensionProtocolName()

    let uiState: Meta3dUiProtocol.StateType.state = service.meta3d.getExtensionState(.
      meta3dState,
      meta3dUIExtensionProtocolName,
    )

    // let meta3dState = service.meta3d.registerContribute(meta3dState, elementContribute)

    let uiState = (
      service.meta3d.getExtensionService(.
        meta3dState,
        meta3dUIExtensionProtocolName,
      ): Meta3dUiProtocol.ServiceType.service
    ).registerElement(uiState, elementContribute)

    service.meta3d.setExtensionState(. meta3dState, meta3dUIExtensionProtocolName, uiState)
  }

  let rec _loop = (
    service: FrontendUtils.AssembleSpaceType.service,
    loopFrameID: React.ref<option<int>>,
    {clearColor, skinName} as apInspectorData: FrontendUtils.ApAssembleStoreType.apInspectorData,
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
          Meta3dCommonlib.ImmutableHashMap.createEmpty()
          ->Meta3dCommonlib.ImmutableHashMap.set(
            "meta3dUIExtensionProtocolName",
            ElementVisualUtils.getUIExtensionProtocolName(),
          )
          ->Meta3dCommonlib.ImmutableHashMap.set(
            "meta3dImguiRendererExtensionProtocolName",
            "meta3d-imgui-renderer2-protocol",
          ),
          Meta3dCommonlib.ImmutableHashMap.createEmpty(),
        )->Obj.magic,
      )
    }

    service.meta3d.updateExtension(.
      meta3dState,
      _getVisualExtensionProtocolName(),
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

  let _generateApp = (
    service,
    (selectedPackages, selectedExtensions, selectedContributes),
    visualExtension,
  ) => {
    AppUtils.generateApp(
      service,
      selectedPackages,
      selectedExtensions->Meta3dCommonlib.ArraySt.push(visualExtension),
      selectedContributes,
      Js.Nullable.null,
    )
  }

  let startApp = (
    service,
    loopFrameID: React.ref<option<int>>,
    (selectedPackages, selectedExtensions, selectedContributes),
    visualExtension,
    {isDebug} as apInspectorData: FrontendUtils.ApAssembleStoreType.apInspectorData,
  ) => {
    let (meta3dState, _, _) = service.meta3d.loadApp(.
      _generateApp(
        service,
        (
          selectedPackages->Meta3dCommonlib.ListSt.toArray,
          selectedExtensions->Meta3dCommonlib.ListSt.toArray,
          selectedContributes->Meta3dCommonlib.ListSt.toArray,
        ),
        visualExtension,
      ),
    )

    service.meta3d.initExtension(.
      meta3dState,
      _getVisualExtensionProtocolName(),
      _getInitData(service, isDebug),
    )
    ->Js.Promise.then_(meta3dState => {
      loopFrameID.current =
        service.other.requestAnimationFirstFrame(time => {
          FrontendUtils.ErrorUtils.showCatchedErrorMessage(
            () => {
              _loop(service, loopFrameID, apInspectorData, time, meta3dState)
            },
            5->Some,
          )
        })->Some

      ()->Js.Promise.resolve
    }, _)
    ->Meta3dBsMost.Most.fromPromise
    ->Meta3dBsMost.Most.drain
    ->Js.Promise.catch(e => {
      service.console.errorWithExn(. e->FrontendUtils.Error.promiseErrorToExn, None)->Obj.magic
    }, _)
  }

  let cancelAppLoop = (service, loopFrameID: React.ref<option<int>>) => {
    switch loopFrameID.current {
    | Some(id) => service.other.cancelAnimationFrame(id)
    | None => ()
    }
  }

  let isLoaded = (visualExtension, elementAssembleData) => {
    visualExtension->Meta3dCommonlib.OptionSt.isSome &&
      switch elementAssembleData {
      | Loading => false
      | _ => true
      }
  }

  let _getElementContributeName = () => "meta3d-element-assemble-element"

  let _getElementContributeVersion = () => FrontendUtils.VersionConfig.getPlatformVersion()

  let buildElementContributeFileStr = (
    service,
    selectedUIControls,
    selectedUIControlInspectorData,
    (elementStateFields, reducers),
  ) =>
    ElementContributeUtils.buildElementContributeFileStr(
      service,
      _getElementContributeName(),
      selectedUIControls,
      selectedUIControlInspectorData,
      (elementStateFields, reducers),
    )

  let _buildContribute = (version, data): FrontendUtils.ApAssembleStoreType.contribute => {
    id: "",
    version,
    protocolIconBase64: "",
    protocolConfigStr: None,
    // newName: name->Some,
    data,
  }

  let _generateElementContribute = (
    service,
    protocolName,
    protocolVersion,
    elementName,
    elementVersion,
    fileStr,
  ) => {
    ElementVisualUtils.generateElementContributeBinaryFile(
      service,
      elementName,
      protocolName,
      protocolVersion,
      fileStr,
    )
    ->service.meta3d.loadContribute(. _)
    ->_buildContribute(elementVersion, _)
  }

  let generateElementContributeData = (service, fileStr) => {
    let protocolName = ElementContributeUtils.getElementContributeProtocolName()
    let protocolVersion = ElementContributeUtils.getElementContributeProtocolVersion()

    _generateElementContribute(
      service,
      protocolName,
      protocolVersion,
      _getElementContributeName(),
      _getElementContributeVersion(),
      fileStr,
    )
  }

  let updateElementContribute = (dispatch, elementContribute) => {
    dispatch(FrontendUtils.ElementAssembleStoreType.SetElementContribute(elementContribute))
  }

  let getAndSetElementAssembleData = (
    service,
    setElementAssembleData,
    selectedContributes,
    account,
  ) => {
    switch selectedContributes->SelectedContributesForElementUtils.getElements {
    | elements if elements->Meta3dCommonlib.ListSt.length > 1 =>
      service.console.error(. {j`should only select 1 element at most`}, None)

      Js.Promise.resolve()
    | elements if elements->Meta3dCommonlib.ListSt.length === 0 =>
      setElementAssembleData(_ => No)

      Js.Promise.resolve()
    | list{element} =>
      let {version, data} = element

      service.backend.getElementAssembleData(.
        account->Meta3dCommonlib.OptionSt.getExn,
        data.contributePackageData.name,
        version,
      )
      ->Meta3dBsMost.Most.tap(elementAssembleData => {
        setElementAssembleData(_ => Loaded(elementAssembleData))
      }, _)
      ->Meta3dBsMost.Most.drain
      ->Js.Promise.catch(e => {
        service.console.errorWithExn(. e->FrontendUtils.Error.promiseErrorToExn, None)->Obj.magic
      }, _)
    }
  }

  let _generateSelectedUIControls = (service, selectedContributes, uiControls) => {
    let selectedUIControls =
      selectedContributes
      ->SelectedContributesForElementUtils.getUIControls
      ->Meta3dCommonlib.ListSt.toArray

    let rec _generate = uiControls => {
      uiControls
      ->Meta3dCommonlib.ArraySt.map((
        {name, children}: FrontendUtils.BackendCloudbaseType.uiControl,
      ) => {
        switch selectedUIControls->Meta3dCommonlib.ArraySt.find(selectedUIControl =>
          selectedUIControl.data.contributePackageData.name === name
        ) {
        | None =>
          Meta3dCommonlib.Exception.throwErr(
            Meta3dCommonlib.Exception.buildErr(
              Meta3dCommonlib.Log.buildErrorMessage(
                ~title={j`${name} not select`},
                ~description={
                  ""
                },
                ~reason="",
                ~solution=j``,
                ~params=j``,
              ),
            ),
          )
        | Some({protocolIconBase64, protocolConfigStr, data}) =>
          (
            {
              id: IdUtils.generateId(service.other.random),
              protocolIconBase64,
              protocolConfigStr: protocolConfigStr->Meta3dCommonlib.OptionSt.getExn,
              name: data.contributePackageData.name,
              data,
              parentId: None,
              children: _generate(children),
            }: FrontendUtils.ElementAssembleStoreType.uiControl
          )
        }
      })
      ->Meta3dCommonlib.ListSt.fromArray
    }

    let rec _addParentId = (uiControls, parentId) => {
      uiControls->Meta3dCommonlib.ListSt.map((
        {id, children} as uiControl: FrontendUtils.ElementAssembleStoreType.uiControl,
      ) => {
        {
          ...uiControl,
          parentId,
          children: _addParentId(children, id->Some),
        }
      })
    }

    uiControls->_generate->_addParentId(None)
  }

  let _generateSelectedUIControlInspectorData = (
    uiControls,
    selectedUIControls: FrontendUtils.ElementAssembleStoreType.selectedUIControls,
  ) => {
    let rec _generate = (
      uiControls,
      selectedUIControls: FrontendUtils.ElementAssembleStoreType.selectedUIControls,
    ) => {
      uiControls
      ->Meta3dCommonlib.ArraySt.mapi((
        {rect, isDraw, event, specific, children}: FrontendUtils.BackendCloudbaseType.uiControl,
        index,
      ): FrontendUtils.ElementAssembleStoreType.uiControlInspectorData => {
        id: (
          selectedUIControls->Meta3dCommonlib.ListSt.nth(index)->Meta3dCommonlib.OptionSt.getExn
        ).id,
        rect,
        isDraw,
        event,
        specific,
        children: _generate(
          children,
          (
            selectedUIControls->Meta3dCommonlib.ListSt.nth(index)->Meta3dCommonlib.OptionSt.getExn
          ).children,
        ),
      })
      ->Meta3dCommonlib.ListSt.fromArray
    }

    uiControls->_generate(selectedUIControls)
  }

  let importElement = (service, dispatch, elementAssembleData, selectedContributes) => {
    switch elementAssembleData {
    | Loaded(elementAssembleData) =>
      let {elementName, elementVersion, inspectorData} = elementAssembleData
      let {element, uiControls} = inspectorData

      let selectedUIControls = _generateSelectedUIControls(service, selectedContributes, uiControls)

      dispatch(
        FrontendUtils.ElementAssembleStoreType.Import(
          selectedUIControls,
          _generateSelectedUIControlInspectorData(uiControls, selectedUIControls),
          element,
        ),
      )

    | _ => ()
    }
  }

  let setElementContributeToSpaceState = elementContribute => {
    SpaceStateApService.getState()
    ->ElementContributeApService.setElementContribute(elementContribute)
    ->SpaceStateApService.setState
  }

  let useSelector = (
    {apAssembleState, elementAssembleState}: FrontendUtils.AssembleSpaceStoreType.state,
  ) => {
    let {
      canvasData,
      selectedPackages,
      selectedExtensions,
      selectedContributes,
      apInspectorData,
    } = apAssembleState
    let {
      selectedUIControls,
      selectedUIControlInspectorData,
      visualExtension,
      elementContribute,
      elementInspectorData,
    } = elementAssembleState

    // let (_, elementContribute) = elementContribute

    (
      (canvasData, selectedPackages, selectedExtensions, selectedContributes, apInspectorData),
      (
        selectedUIControls,
        selectedUIControlInspectorData,
        visualExtension,
        // elementContribute,
        elementContribute,
        elementInspectorData,
      ),
    )
  }
}

@react.component
let make = (~service: service, ~account: option<string>) => {
  let dispatch = ReduxUtils.ElementAssemble.useDispatch(service.react.useDispatch)

  let (
    (canvasData, selectedPackages, selectedExtensions, selectedContributes, apInspectorData),
    (
      selectedUIControls,
      selectedUIControlInspectorData,
      visualExtension,
      // elementContribute,
      elementContribute,
      elementInspectorData,
    ),
  ) = service.react.useSelector(Method.useSelector)

  let (elementAssembleData, setElementAssembleData) = service.react.useState(_ => Loading)
  let loopFrameID = service.react.useRef(None)

  let {elementStateFields, reducers} = elementInspectorData

  service.react.useEffectOnce(() => {
    switch visualExtension {
    | Some(_) => ()
    | None =>
      Method.getAndSetNewestVisualExtension(service, dispatch, apInspectorData.isDebug)->ignore
    }

    ((), None)
  })

  service.react.useEffect1(. () => {
    Method.getAndSetElementAssembleData(
      service,
      setElementAssembleData,
      selectedContributes,
      account,
    )->ignore

    None
  }, [selectedContributes])

  service.react.useEffect1(. () => {
    FrontendUtils.ErrorUtils.showCatchedErrorMessage(() => {
      Method.importElement(service, dispatch, elementAssembleData, selectedContributes)
    }, 5->Some)

    None
  }, [elementAssembleData])

  service.react.useEffect1(. () => {
    selectedUIControlInspectorData->Meta3dCommonlib.ListSt.length > 0
      ? FrontendUtils.ErrorUtils.showCatchedErrorMessage(() => {
          Method.generateElementContributeData(
            service,
            Method.buildElementContributeFileStr(
              service,
              selectedUIControls,
              selectedUIControlInspectorData,
              (elementStateFields, reducers),
            ),
          )->Method.updateElementContribute(dispatch, _)
        }, 5->Some)
      : ()

    None
  }, [
    selectedUIControls,
    selectedUIControlInspectorData->Obj.magic,
    elementInspectorData->Obj.magic,
  ])

  service.react.useEffect1(. () => {
    Method.setElementContributeToSpaceState(elementContribute)

    None
  }, [elementContribute])

  service.react.useEffect1(. () => {
    switch visualExtension {
    | Some(visualExtension) => FrontendUtils.ErrorUtils.showCatchedErrorMessage(() => {
        Method.startApp(
          service,
          loopFrameID,
          (selectedPackages, selectedExtensions, selectedContributes),
          visualExtension,
          apInspectorData,
        )->ignore
      }, 5->Some)
    | _ => ()
    }

    (
      () => {
        Method.cancelAppLoop(service, loopFrameID)
        // switch loopFrameID.current {
        // | Some(id) => service.other.cancelAnimationFrame(id)
        // | None => ()
        // }
      }
    )->Some
  }, [visualExtension])

  <>
    {!Method.isLoaded(visualExtension, elementAssembleData)
      ? <p> {React.string(`loading...`)} </p>
      : React.null}
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
