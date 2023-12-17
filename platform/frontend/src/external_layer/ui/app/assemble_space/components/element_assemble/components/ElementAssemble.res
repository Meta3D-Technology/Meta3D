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

  let buildCreateFromScratchTourSteps = (
    dispatchForAppStore,
    dispatchForElementAssembleStore,
    canvasWidthInputTarget: React.ref<Js.Nullable.t<'a>>,
    canvasHeightInputTarget: React.ref<Js.Nullable.t<'a>>,
    addUIControlButtonTarget: React.ref<Js.Nullable.t<'a>>,
    selectSceneViewUIControlTarget: React.ref<Js.Nullable.t<'a>>,
    rectWidthInputTarget: React.ref<Js.Nullable.t<'a>>,
    rectHeightInputTarget: React.ref<Js.Nullable.t<'a>>,
    rootTarget: React.ref<Js.Nullable.t<'a>>,
    selectGameViewUIControlTarget: React.ref<Js.Nullable.t<'a>>,
    rectXInputTarget: React.ref<Js.Nullable.t<'a>>,
    runButtonTarget: React.ref<Js.Nullable.t<'a>>,
    publishButtonTarget: React.ref<Js.Nullable.t<'a>>,
    publishModalTarget: React.ref<Js.Nullable.t<'a>>,
    assembleSpaceNavTarget: React.ref<Js.Nullable.t<'a>>,
  ): array<Antd__Tour.tourStep> => {
    [
      {
        title: "设置画布宽度",
        description: "这里可以设置为1200",
        cover: Meta3dCommonlib.NullableSt.getEmpty(),
        target: () => canvasWidthInputTarget->GuideUtils.getInputRefCurrent,
        closeIcon: {
          GuideUtils.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore)
        }->Meta3dCommonlib.NullableSt.return,
      },
      {
        title: "设置画布高度",
        description: "这里可以设置为600",
        cover: Meta3dCommonlib.NullableSt.getEmpty(),
        target: () => canvasHeightInputTarget->GuideUtils.getInputRefCurrent,
        closeIcon: {
          GuideUtils.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore)
        }->Meta3dCommonlib.NullableSt.return,
      },
      {
        title: "点击加入UI Control的按钮",
        description: "",
        cover: Meta3dCommonlib.NullableSt.getEmpty(),
        target: () => addUIControlButtonTarget->GuideUtils.getRefCurrent,
        closeIcon: {
          GuideUtils.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore)
        }->Meta3dCommonlib.NullableSt.return,
      },
      {
        title: "加入Scene View",
        description: "Scene View负责显示编辑视图，点击它",
        cover: Meta3dCommonlib.NullableSt.getEmpty(),
        target: () => selectSceneViewUIControlTarget->GuideUtils.getRefCurrent,
        closeIcon: {
          GuideUtils.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore)
        }->Meta3dCommonlib.NullableSt.return,
      },
      {
        title: "设置Scene View的宽度",
        description: "这里可以设置为500",
        cover: Meta3dCommonlib.NullableSt.getEmpty(),
        target: () => rectWidthInputTarget->GuideUtils.getRefCurrent,
        closeIcon: {
          GuideUtils.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore)
        }->Meta3dCommonlib.NullableSt.return,
      },
      {
        title: "设置Scene View的高度",
        description: "这里可以设置为500",
        cover: Meta3dCommonlib.NullableSt.getEmpty(),
        target: () => rectHeightInputTarget->GuideUtils.getRefCurrent,
        closeIcon: {
          GuideUtils.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore)
        }->Meta3dCommonlib.NullableSt.return,
      },
      {
        title: "选择Root",
        description: "",
        cover: Meta3dCommonlib.NullableSt.getEmpty(),
        target: () => rootTarget->GuideUtils.getRefCurrent,
        closeIcon: {
          GuideUtils.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore)
        }->Meta3dCommonlib.NullableSt.return,
      },
      {
        title: "点击加入UI Control的按钮",
        description: "",
        cover: Meta3dCommonlib.NullableSt.getEmpty(),
        target: () => addUIControlButtonTarget->GuideUtils.getRefCurrent,
        closeIcon: {
          GuideUtils.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore)
        }->Meta3dCommonlib.NullableSt.return,
      },
      {
        title: "加入Game View",
        description: "Game View负责显示运行视图，点击它",
        cover: Meta3dCommonlib.NullableSt.getEmpty(),
        target: () => selectGameViewUIControlTarget->GuideUtils.getRefCurrent,
        closeIcon: {
          GuideUtils.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore)
        }->Meta3dCommonlib.NullableSt.return,
      },
      {
        title: "设置Game View的x坐标",
        description: "这里可以设置为500",
        cover: Meta3dCommonlib.NullableSt.getEmpty(),
        target: () => rectXInputTarget->GuideUtils.getRefCurrent,
        closeIcon: {
          GuideUtils.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore)
        }->Meta3dCommonlib.NullableSt.return,
      },
      {
        title: "设置Game View的宽度",
        description: "这里可以设置为500",
        cover: Meta3dCommonlib.NullableSt.getEmpty(),
        target: () => rectWidthInputTarget->GuideUtils.getRefCurrent,
        closeIcon: {
          GuideUtils.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore)
        }->Meta3dCommonlib.NullableSt.return,
      },
      {
        title: "设置Game View的高度",
        description: "这里可以设置为500",
        cover: Meta3dCommonlib.NullableSt.getEmpty(),
        target: () => rectHeightInputTarget->GuideUtils.getRefCurrent,
        closeIcon: {
          GuideUtils.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore)
        }->Meta3dCommonlib.NullableSt.return,
      },
      {
        title: "运行编辑器",
        description: "点击它，可在新的窗口中实时运行编辑器。您可以在Scene View中通过拖动来转动相机",
        cover: Meta3dCommonlib.NullableSt.getEmpty(),
        target: () => runButtonTarget->GuideUtils.getRefCurrent,
        closeIcon: {
          GuideUtils.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore)
        }->Meta3dCommonlib.NullableSt.return,
      },
      {
        title: "发布编辑器",
        description: "点击它",
        cover: Meta3dCommonlib.NullableSt.getEmpty(),
        target: () => publishButtonTarget->GuideUtils.getRefCurrent,
        closeIcon: {
          GuideUtils.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore)
        }->Meta3dCommonlib.NullableSt.return,
      },
      {
        title: "发布编辑器",
        description: "首先输入必要的信息；然后点击发布按钮",
        cover: Meta3dCommonlib.NullableSt.getEmpty(),
        target: () => publishModalTarget->GuideUtils.getRefCurrent,
        closeIcon: {
          GuideUtils.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore)
        }->Meta3dCommonlib.NullableSt.return,
      },
      {
        title: "返回用户中心",
        description: "点击第一个导航栏：“返回用户中心”，返回到用户中心",
        cover: Meta3dCommonlib.NullableSt.getEmpty(),
        target: () => assembleSpaceNavTarget->GuideUtils.getRefCurrent,
        closeIcon: {
          GuideUtils.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore)
        }->Meta3dCommonlib.NullableSt.return,
      },
    ]
  }

  let buildCreateFromScratchTourStepAndStepMapData = () => {
    [(0, 1), (2, 2), (12, 3), (13, 4), (15, 5)]
  }

  let useSelector = ({apAssembleState, elementAssembleState}: AssembleSpaceStoreType.state) => {
    let {selectedContributes} = apAssembleState
    let {
      currentCustomInputName,
      currentCustomActionName,
      isInCreateFromScratchTourPhase2,
    } = elementAssembleState

    (
      selectedContributes,
      currentCustomInputName,
      currentCustomActionName,
      isInCreateFromScratchTourPhase2,
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
    isInCreateFromScratchTourPhase2,
  ) = service.react.useSelector(. Method.useSelector)

  // let (
  //   selectedContributesAfterGeneratedCustoms,
  //   setSelectedContributesAfterGeneratedCustoms,
  // ) = service.react.useState(_ => None)

  let (isInit, setIsInit) = service.react.useState(_ => false)
  let (currentStep, setCurrentStep) = service.react.useState(_ => 1)
  let (currentTourStep, setCurrentTourStep) = service.react.useState(_ => 0)
  let (openTour, setOpenTour) = service.react.useState(_ => false)

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
            {isInCreateFromScratchTourPhase2
              ? {
                  <>
                    {GuideUtils.buildSteps(() => {
                      setOpenTour(_ => true)
                    }, currentStep, GuideUtils.buildCreateFromScratchStepData())}
                    <Tour
                      current=currentTourStep
                      _open={openTour}
                      // onClose={() => {
                      //   // setOpenTour(_ => false)

                      //   // // dispatchForElementAssembleStore(
                      //   // //   ElementAssembleStoreType.EndCreateFromScratchTourPhase2,
                      //   // // )

                      //   GuideUtils.handleCloseCreateFromScratchTour(
                      //     dispatchForAppStore,
                      //     dispatchForElementAssembleStore,
                      //   )
                      // }}
                      onChange={current => {
                        switch Method.buildCreateFromScratchTourStepAndStepMapData()->Meta3dCommonlib.ArraySt.find(
                          ((currentTourStep, _)) => {
                            currentTourStep == current
                          },
                        ) {
                        | Some((_, currentStep)) => setCurrentStep(_ => currentStep)
                        | None => ()
                        }

                        setCurrentTourStep(_ => current)
                      }}
                      steps={Method.buildCreateFromScratchTourSteps(
                        dispatchForAppStore,
                        dispatchForElementAssembleStore,
                        canvasWidthInputTarget,
                        canvasHeightInputTarget,
                        addUIControlButtonTarget,
                        selectSceneViewUIControlTarget,
                        rectWidthInputTarget,
                        rectHeightInputTarget,
                        rootTarget,
                        selectGameViewUIControlTarget,
                        rectXInputTarget,
                        runButtonTarget,
                        publishButtonTarget,
                        publishModalTarget,
                        assembleSpaceNavTarget,
                      )}
                    />
                  </>
                }
              : React.null}
            <Space direction=#horizontal size=#small>
              // <PublishElement service account />
              // <ElementController service />
              {!UserUtils.isAdmin(account)
                ? <Publish
                    service
                    account
                    publishButtonTarget
                    publishModalTarget
                    handleWhenShowModalFunc={() => {
                      currentTourStep == 13 ? setCurrentTourStep(current => current->succ) : ()
                    }}
                    handleWhenPublishFunc={() => {
                      currentTourStep == 14 ? setCurrentTourStep(current => current->succ) : ()
                    }}
                  />
                : React.null}
              <RunElementVisualController
                service
                handleWhenRunFunc={() => {
                  currentTourStep == 12 ? setCurrentTourStep(current => current->succ) : ()
                }}
                account
                selectedContributes
                runButtonTarget
              />
              <CanvasController service canvasWidthInputTarget canvasHeightInputTarget />
            </Space>
          </Layout.Content>
          <Layout>
            <Layout.Sider theme=#light>
              <Collapse defaultActiveKey={["1"]}>
                // <Collapse.Panel header="UI Controls" key="1">
                //   <UIControls service selectedContributes />
                // </Collapse.Panel>
                <Collapse.Panel header="Selected UI Controls" key="1">
                  <SelectedUIControls
                    service
                    handleWhenShowUIControlsFunc={() => {
                      currentTourStep == 2 || currentTourStep == 7
                        ? setCurrentTourStep(current => current->succ)
                        : ()
                    }}
                    handleWhenSelectUIControlFunc={protocolName => {
                      (GuideUtils.isSceneViewProtocolName(protocolName) && currentTourStep == 3) ||
                        (GuideUtils.isGameViewProtocolName(protocolName) && currentTourStep == 8)
                        ? setCurrentTourStep(current => current->succ)
                        : ()
                    }}
                    handleWhenSelectTreeNodeFunc={title => {
                      title == "root" && currentTourStep == 6
                        ? setCurrentTourStep(current => current->succ)
                        : ()
                    }}
                    selectedContributes
                    addUIControlButtonTarget
                    rootTarget
                    selectSceneViewUIControlTarget
                    selectGameViewUIControlTarget
                  />
                </Collapse.Panel>
                <Collapse.Panel header="Custom Inputs" key="2">
                  <CustomInputs service />
                </Collapse.Panel>
                <Collapse.Panel header="Custom Actions" key="3">
                  <CustomActions service />
                </Collapse.Panel>
              </Collapse>
            </Layout.Sider>
            <Layout.Content>
              {switch (currentCustomInputName, currentCustomActionName) {
              | (Some(currentCustomInputName), None) =>
                <Layout>
                  <Layout.Content>
                    <CustomInputCodeEdit service currentCustomInputName />
                  </Layout.Content>
                </Layout>
              | (None, Some(currentCustomActionName)) =>
                <Layout>
                  <Layout.Content>
                    <CustomActionCodeEdit service currentCustomActionName />
                  </Layout.Content>
                </Layout>
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
