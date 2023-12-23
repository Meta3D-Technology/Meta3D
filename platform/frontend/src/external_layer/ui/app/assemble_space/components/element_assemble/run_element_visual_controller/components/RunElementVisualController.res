open Antd
%%raw("import 'antd/dist/reset.css'")
open AssembleSpaceType

module Method = {
  // let _getVisualExtensionProtocolName = () => "meta3d-element-assemble-visual-run-protocol"

  // let _getVisualExtensionName = () => "meta3d-element-assemble-visual-run"

  // let getAndSetNewestVisualExtension = (service, dispatch) => {
  //   ElementVisualUtils.getAndSetNewestVisualExtension(
  //     service,
  //     dispatch,
  //     extension => ElementAssembleStoreType.SetRunVisualExtension(extension),
  //     (_getVisualExtensionProtocolName(), _getVisualExtensionName()),
  //   )
  // }

  let _saveToLocalStorage = (service, appBinaryFile) => {
    service.storage.initForElementVisualApp()->service.storage.setElementVisualApp(.
      _,
      appBinaryFile,
    )
  }

  let _buildURL = (canvasData, apInspectorData) =>
    j`RunElementVisual?canvasData=${canvasData}&&apInspectorData=${apInspectorData}`

  let _openLink = (service, url) => {
    service.tab.openUrl(. url)
  }

  let _checkShouldHasSceneViewAndGameView = (
    // selectedContributes: ApAssembleStoreType.selectedContributes,
    selectedUIControls: ElementAssembleStoreType.selectedUIControls,
  ) => {
    selectedUIControls->Meta3dCommonlib.ListSt.includesByFunc(({data}) => {
      let protocolName = data.contributePackageData.protocol.name

      protocolName->GuideUtils.isSceneViewProtocolName
    }) &&
      selectedUIControls->Meta3dCommonlib.ListSt.includesByFunc(({data}) => {
        let protocolName = data.contributePackageData.protocol.name

        protocolName->GuideUtils.isGameViewProtocolName
      })
      ? ()->Meta3dCommonlib.Result.succeed
      : Meta3dCommonlib.Result.fail({j`请加入这些UI Control: Scene View和Game View`})
  }

  let run = (
    service,
    (canvasData, apInspectorData),
    (
      (selectedPackages, selectedExtensions, selectedContributes, storedPackageIdsInApp),
      elementContribute,
    ),
    (account, selectedUIControls, selectedUIControlInspectorData),
    (customInputs, customActions),
  ) => {
    _checkShouldHasSceneViewAndGameView(selectedUIControls)->Meta3dCommonlib.Result.either(() => {
      ElementVisualUtils.generateApp(
        service,
        (
          AppUtils.splitPackages(selectedPackages, storedPackageIdsInApp),
          selectedExtensions->Meta3dCommonlib.ListSt.toArray,
          ElementVisualUtils.addGeneratedCustoms(
            service,
            selectedContributes,
            account,
            customInputs,
            customActions,
          )
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
        ),
        list{},
        // (list{}, list{}),
        elementContribute,
      )
      ->_saveToLocalStorage(service, _)
      ->Meta3dBsMostDefault.Most.tap(
        _ => {
          _openLink(
            service,
            _buildURL(
              canvasData->Obj.magic->Js.Json.stringify,
              apInspectorData->Obj.magic->Js.Json.stringify,
            ),
          )
        },
        // RescriptReactRouter.push("/RunElementVisual")
        _,
      )
      ->Meta3dBsMostDefault.Most.drain
      ->Js.Promise.catch(e => {
        service.console.errorWithExn(. e->Error.promiseErrorToExn, None)->Obj.magic
      }, _)
      ->ignore
    }, MessageUtils.warn(_, None))
  }

  let useSelector = ({assembleSpaceState, eventEmitter}: AppStoreType.state) => {
    let {apAssembleState, elementAssembleState} = assembleSpaceState

    let {
      apInspectorData,
      selectedPackages,
      selectedExtensions,
      // selectedContributes,
      storedPackageIdsInApp,
    } = apAssembleState
    let {
      canvasData,
      // runVisualExtension,
      elementContribute,
      selectedUIControls,
      selectedUIControlInspectorData,
      customInputs,
      customActions,
    } = elementAssembleState

    (
      (
        (
          apInspectorData,
          selectedPackages,
          selectedExtensions,
          // selectedContributes,
          storedPackageIdsInApp,
        ),
        (
          canvasData,
          // runVisualExtension,
          elementContribute,
          selectedUIControls,
          selectedUIControlInspectorData,
          customInputs,
          customActions,
        ),
      ),
      eventEmitter,
    )
  }
}

@react.component
let make = (
  ~service: service,
  // ~handleWhenRunFunc,
  ~account,
  ~selectedContributes,
  ~runButtonTarget: React.ref<Js.Nullable.t<'a>>,
) => {
  let dispatch = ReduxUtils.ElementAssemble.useDispatch(service.react.useDispatch)

  let (
    (
      (
        apInspectorData,
        selectedPackages,
        selectedExtensions,
        // selectedContributes,
        storedPackageIdsInApp,
      ),
      (
        canvasData,
        // runVisualExtension,
        elementContribute,
        selectedUIControls,
        selectedUIControlInspectorData,
        customInputs,
        customActions,
      ),
    ),
    eventEmitter,
  ) = service.react.useAllSelector(. Method.useSelector)

  // service.react.useEffect1(. () => {
  //   switch runVisualExtension {
  //   | Some(_) => ()
  //   | None =>
  //     Method.getAndSetNewestVisualExtension(service, dispatch, apInspectorData.isDebug)->ignore
  //   }

  //   None
  // }, [])

  {
    switch elementContribute {
    | Some(elementContribute) =>
      <Button
        ref={runButtonTarget}
        onClick={_ => {
          MessageUtils.showCatchedErrorMessage(() => {
            // handleWhenRunFunc()
            eventEmitter.emit(. EventUtils.getRunEventName(), Obj.magic(1))

            Method.run(
              service,
              (canvasData, apInspectorData),
              (
                (selectedPackages, selectedExtensions, selectedContributes, storedPackageIdsInApp),
                elementContribute,
              ),
              (
                account->Meta3dCommonlib.OptionSt.getExn,
                selectedUIControls,
                selectedUIControlInspectorData,
              ),
              (customInputs, customActions),
            )
          }, 5->Some)
        }}>
        {React.string(`运行`)}
      </Button>
    | _ => <Button disabled=true> {React.string(`运行`)} </Button>
    }
  }
}
