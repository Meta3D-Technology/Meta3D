open Antd
%%raw("import 'antd/dist/reset.css'")
open AssembleSpaceType

module Method = {
  let resetAllAssemble = dispatch => {
    dispatch(AssembleSpaceStoreType.ResetWhenSwitch)
  }

  let _initPackage = (
    dispatchForApAssembleStore,
    selectedPackagesFromMarket: selectedPackagesFromMarket,
  ) => {
    selectedPackagesFromMarket->Meta3dCommonlib.ListSt.forEach(({id, protocol}) => {
      protocol.name == InitPackageUtils.getEngineWholePackageProtocolName()
        ? {
            dispatchForApAssembleStore(ApAssembleStoreType.StorePackageInApp(id))
          }
        : protocol.name == InitPackageUtils.getEditorWholePackageProtocolName()
        ? dispatchForApAssembleStore(ApAssembleStoreType.StartPackage(id))
        : ()
    })
  }

  let init = (
    dispatchForApAssembleStore,
    selectedContributesFromMarket,
    selectedPackagesFromMarket,
  ) => {
    dispatchForApAssembleStore(
      ApAssembleStoreType.SetContributesAndPackages(
        selectedContributesFromMarket->SelectedContributesConvertUtils.convertSelectedContributesFromAssembleToApAssemble,
        selectedPackagesFromMarket,
      ),
    )

    _initPackage(dispatchForApAssembleStore, selectedPackagesFromMarket)

    dispatchForApAssembleStore(ApAssembleStoreType.MarkIsPassDependencyGraphCheck(true))
  }

  //   /* ! TODO handle same name:
  // now just remove duplicate one, but need handle more:

  // compare equal(first length, then all)?{
  // use local input
  // } :{
  // remain one custom input;
  // rename another custom input's name to add post fix:"_copy";
  // }
  //  */
  //   let _mergeCustoms = selectedElementsFromMarket => {
  //     selectedElementsFromMarket
  //     ->Meta3dCommonlib.ListSt.reduce([], (
  //       mergedCustomInputs,
  //       {customInputs}: BackendCloudbaseType.elementAssembleData,
  //     ) => {
  //       mergedCustomInputs
  //       ->Js.Array.concat(customInputs, _)
  //       ->Meta3dCommonlib.ArraySt.removeDuplicateItemsWithBuildKeyFunc((. {name}) => {
  //         name
  //       })
  //     })
  //     ->Meta3dCommonlib.ListSt.fromArray
  //   }

  // let importElementCustom = (dispatchForElementAssembleStore, selectedElementsFromMarket) => {
  //   let mergedCustomInputs = _mergeCustoms(selectedElementsFromMarket)

  //   dispatchForElementAssembleStore(
  //     ElementAssembleStoreType.ImportElementCustom(mergedCustomInputs),
  //   )
  // }

  // let addGeneratedCustoms = (
  //   service,
  //   selectedContributes,
  //   account,
  //   customInputs,
  //   customActions,
  // ) => {
  //   selectedContributes
  //   ->ElementUtils.addGeneratedInputContributesForElementAssemble(
  //     (service.meta3d.generateContribute, service.meta3d.loadContribute),
  //     _,
  //     account,
  //     customInputs,
  //   )
  //   ->ElementUtils.addGeneratedActionContributesForElementAssemble(
  //     (service.meta3d.generateContribute, service.meta3d.loadContribute),
  //     _,
  //     account,
  //     customActions,
  //   )
  // }

  let useSelector = ({apAssembleState, elementAssembleState}: AssembleSpaceStoreType.state) => {
    let {selectedContributes} = apAssembleState
    let {
      currentCustomInputName,
      currentCustomActionName,
      // isInCreateFromScratchTourPhase2,
      // isJumpToCreateFromScratchTourPhase2Guide,
    } = elementAssembleState

    (
      selectedContributes,
      currentCustomInputName,
      currentCustomActionName,
      // isInCreateFromScratchTourPhase2,
      // isJumpToCreateFromScratchTourPhase2Guide,
    )
  }
}

@react.component
let make = (
  ~service: service,
  ~account,
  ~selectedContributesFromMarket: selectedContributesFromMarket,
  ~selectedPackagesFromMarket: selectedPackagesFromMarket,
  ~assembleSpaceNavTarget: React.ref<Js.Nullable.t<'a>>,
) => {
  let dispatch = service.react.useDispatch()
  let dispatchForAppStore = service.app.useDispatch()
  let dispatchForApAssembleStore = ReduxUtils.ApAssemble.useDispatch(service.react.useDispatch)
  let dispatchForElementAssembleStore = ReduxUtils.ElementAssemble.useDispatch(
    service.react.useDispatch,
  )

  let (
    selectedContributes,
    currentCustomInputName,
    currentCustomActionName,
    // isInCreateFromScratchTourPhase2,
    // isJumpToCreateFromScratchTourPhase2Guide,
  ) = service.react.useSelector(. Method.useSelector)

  // let (
  //   selectedContributesAfterGeneratedCustoms,
  //   setSelectedContributesAfterGeneratedCustoms,
  // ) = service.react.useState(_ => None)

  let (isInit, setIsInit) = service.react.useState(_ => false)
  // let (currentStep, setCurrentStep) = service.react.useState(_ => 1)
  // let (currentTourStep, setCurrentTourStep) = service.react.useState(_ => 0)
  // let (openTour, setOpenTour) = service.react.useState(_ => false)

  // let beginGuideTarget = React.useRef(Meta3dCommonlib.NullableSt.getEmpty())
  let canvasWidthInputTarget = React.useRef(Meta3dCommonlib.NullableSt.getEmpty())
  let canvasHeightInputTarget = React.useRef(Meta3dCommonlib.NullableSt.getEmpty())
  let addUIControlButtonTarget = React.useRef(Meta3dCommonlib.NullableSt.getEmpty())
  let selectSceneViewUIControlTarget = React.useRef(Meta3dCommonlib.NullableSt.getEmpty())
  let rectWidthInputTarget = React.useRef(Meta3dCommonlib.NullableSt.getEmpty())
  let rectHeightInputTarget = React.useRef(Meta3dCommonlib.NullableSt.getEmpty())
  let rootTarget = React.useRef(Meta3dCommonlib.NullableSt.getEmpty())
  let selectGameViewUIControlTarget = React.useRef(Meta3dCommonlib.NullableSt.getEmpty())
  let rectXInputTarget = React.useRef(Meta3dCommonlib.NullableSt.getEmpty())
  let runButtonTarget = React.useRef(Meta3dCommonlib.NullableSt.getEmpty())
  let publishButtonTarget = React.useRef(Meta3dCommonlib.NullableSt.getEmpty())
  let publishModalTarget = React.useRef(Meta3dCommonlib.NullableSt.getEmpty())
  // let assembleSpaceNavTarget = React.useRef(Meta3dCommonlib.NullableSt.getEmpty())

  service.react.useEffectOnce(() => {
    Method.resetAllAssemble(dispatch)

    ((), None)
  })

  service.react.useEffectOnce(() => {
    !UserUtils.isAdmin(account)
      ? Method.init(
          dispatchForApAssembleStore,
          selectedContributesFromMarket,
          selectedPackagesFromMarket,
        )
      : ()

    setIsInit(_ => true)

    ((), None)
  })

  // service.react.useEffect1(. () => {
  //   Method.importElementCustom(dispatchForElementAssembleStore, selectedElementsFromMarket)

  //   None
  // }, [selectedElementsFromMarket])

  // service.react.useEffect1(. () => {
  //   setSelectedContributesAfterGeneratedCustoms(_ =>
  //     Method.addGeneratedCustoms(
  //       service,
  //       selectedContributes,
  //       account->Meta3dCommonlib.OptionSt.getExn,
  //       customInputs,
  //       customActions,
  //     )->Some
  //   )

  //   None
  // }, [selectedContributes, customInputs->Obj.magic, customActions->Obj.magic])

  // {
  //   switch selectedContributesAfterGeneratedCustoms {
  //   | None => <p> {React.string(`处理中...`)} </p>
  //   | Some(selectedContributesAfterGeneratedCustoms) =>
  //   }
  // }

  {
    !isInit
      ? {React.string(`初始化...`)}
      : <Layout>
          <Layout.Content>
            <CreateFromScratchGuideInElementAssemble
              service
              canvasWidthInputTarget
              canvasHeightInputTarget
              addUIControlButtonTarget
              selectSceneViewUIControlTarget
              rectWidthInputTarget
              rectHeightInputTarget
              rootTarget
              selectGameViewUIControlTarget
              rectXInputTarget
              runButtonTarget
              publishButtonTarget
              publishModalTarget
              assembleSpaceNavTarget
            />
            <Space direction=#horizontal size=#small>
              // <PublishElement service account />
              // <ElementController service />
              {!UserUtils.isAdmin(account)
                ? <Publish
                    service
                    account
                    publishButtonTarget
                    publishModalTarget
                    //   handleWhenShowModalFunc={() => {
                    //     currentTourStep == 13 ? setCurrentTourStep(current => current->succ) : ()
                    //   }}
                    //   handleWhenPublishFunc={() => {
                    //     currentTourStep == 14 ? setCurrentTourStep(current => current->succ) : ()
                    //   }}
                  />
                : React.null}
              <RunElementVisualController
                service
                // handleWhenRunFunc={() => {
                //   currentTourStep == 12 ? setCurrentTourStep(current => current->succ) : ()
                // }}
                account
                selectedContributes
                runButtonTarget
              />
              <CanvasController service canvasWidthInputTarget canvasHeightInputTarget />
            </Space>
          </Layout.Content>
          <Layout>
            <Layout.Sider theme=#light>
              <Collapse
                onChange={key => {
                  switch key {
                  | key
                    if key->Meta3dCommonlib.ArraySt.includes("2") &&
                      !GuideUtils.readIsFinishShowInput() =>
                    DocGuideUtils.ShowInput.openDocDrawer(dispatch)
                  | key
                    if key->Meta3dCommonlib.ArraySt.includes("3") &&
                      !GuideUtils.readIsFinishShowAction() =>
                    DocGuideUtils.ShowAction.openDocDrawer(dispatch)
                  | _ => ()
                  }
                }}
                defaultActiveKey={["1"]}>
                // <Collapse.Panel header="UI Controls" key="1">
                //   <UIControls service selectedContributes />
                // </Collapse.Panel>
                <Collapse.Panel header="Selected UI Controls" key="1">
                  <SelectedUIControls
                    service
                    // handleWhenShowUIControlsFunc={() => {
                    //   currentTourStep == 2 || currentTourStep == 7
                    //     ? setCurrentTourStep(current => current->succ)
                    //     : ()
                    // }}
                    // handleWhenSelectUIControlFunc={protocolName => {
                    //   (GuideUtils.isSceneViewProtocolName(protocolName) && currentTourStep == 3) ||
                    //     (GuideUtils.isGameViewProtocolName(protocolName) && currentTourStep == 8)
                    //     ? setCurrentTourStep(current => current->succ)
                    //     : ()
                    // }}
                    // handleWhenSelectTreeNodeFunc={title => {
                    //   title == "root" && currentTourStep == 6
                    //     ? setCurrentTourStep(current => current->succ)
                    //     : ()
                    // }}
                    selectedContributes
                    addUIControlButtonTarget
                    rootTarget
                    selectSceneViewUIControlTarget
                    selectGameViewUIControlTarget
                  />
                </Collapse.Panel>
                <Collapse.Panel header="Inputs" key="2">
                  <CustomInputs service />
                </Collapse.Panel>
                <Collapse.Panel header="Actions" key="3">
                  <CustomActions service />
                </Collapse.Panel>
              </Collapse>
            </Layout.Sider>
            <Layout.Content>
              {switch (currentCustomInputName, currentCustomActionName) {
              | (Some(currentCustomInputName), None) =>
                <Layout.Content
                  style={ReactDOM.Style.make(
                    ~width={j`100%`},
                    ~height={j`100%`},
                    ~minHeight="600px",
                    (),
                  )}>
                  <CustomInputCodeEdit service currentCustomInputName />
                </Layout.Content>
              | (None, Some(currentCustomActionName)) =>
                <Layout.Content
                  style={ReactDOM.Style.make(
                    ~width={j`100%`},
                    ~height={j`100%`},
                    ~minHeight="600px",
                    (),
                  )}>
                  <CustomActionCodeEdit service currentCustomActionName />
                </Layout.Content>
              | _ =>
                <Layout>
                  <Layout.Content>
                    <ElementVisual service account selectedContributes />
                  </Layout.Content>
                  <Layout.Sider theme=#light>
                    <ElementInspector
                      service
                      account
                      selectedContributes
                      rectXInputTarget
                      rectWidthInputTarget
                      rectHeightInputTarget
                    />
                  </Layout.Sider>
                </Layout>
              }}
            </Layout.Content>
          </Layout>
        </Layout>
  }
}
