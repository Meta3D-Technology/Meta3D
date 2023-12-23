open Antd
%%raw("import 'antd/dist/reset.css'")
open AssembleSpaceType

module Method = {
  let buildCreateFromScratchTourStepAndStepMapData = () => {
    [(0, 1), (2, 2), (12, 3), (13, 4), (15, 5)]
  }

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
        target: () => canvasWidthInputTarget->GuideUtils.getRefCurrent,
        closeIcon: {
          GuideUtils.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore)
        }->Meta3dCommonlib.NullableSt.return,
      },
      {
        title: "设置画布高度",
        description: "这里可以设置为600",
        cover: Meta3dCommonlib.NullableSt.getEmpty(),
        target: () => canvasHeightInputTarget->GuideUtils.getRefCurrent,
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

  let useSelector = ({assembleSpaceState, eventEmitter}: AppStoreType.state) => {
    let {elementAssembleState} = assembleSpaceState

    let {isInCreateFromScratchTourPhase2} = elementAssembleState

    (isInCreateFromScratchTourPhase2, eventEmitter)
  }
}

@react.component
let make = (
  ~service: service,
  ~canvasWidthInputTarget: React.ref<Js.Nullable.t<'a>>,
  ~canvasHeightInputTarget: React.ref<Js.Nullable.t<'a>>,
  ~addUIControlButtonTarget: React.ref<Js.Nullable.t<'a>>,
  ~selectSceneViewUIControlTarget: React.ref<Js.Nullable.t<'a>>,
  ~rectWidthInputTarget: React.ref<Js.Nullable.t<'a>>,
  ~rectHeightInputTarget: React.ref<Js.Nullable.t<'a>>,
  ~rootTarget: React.ref<Js.Nullable.t<'a>>,
  ~selectGameViewUIControlTarget: React.ref<Js.Nullable.t<'a>>,
  ~rectXInputTarget: React.ref<Js.Nullable.t<'a>>,
  ~runButtonTarget: React.ref<Js.Nullable.t<'a>>,
  ~publishButtonTarget: React.ref<Js.Nullable.t<'a>>,
  ~publishModalTarget: React.ref<Js.Nullable.t<'a>>,
  ~assembleSpaceNavTarget: React.ref<Js.Nullable.t<'a>>,
) => {
  let dispatchForAppStore = service.app.useDispatch()
  let dispatchForElementAssembleStore = ReduxUtils.ElementAssemble.useDispatch(
    ReactUtils.useDispatchForAssembleSpaceStore,
  )

  let (isInCreateFromScratchTourPhase2, eventEmitter) = service.react.useAllSelector(.
    Method.useSelector,
  )

  let (currentStep, setCurrentStep) = service.react.useState(_ => 1)
  let (currentTourStep, setCurrentTourStep) = service.react.useState(_ => 0)
  let (openTour, setOpenTour) = service.react.useState(_ => false)

  React.useEffect0(() => {
    MessageUtils.showCatchedErrorMessage(() => {
      isInCreateFromScratchTourPhase2 ? setOpenTour(_ => true) : setOpenTour(_ => false)

      eventEmitter.addListener(.
        EventUtils.getShowPublishAppModalEventName(),
        _ => {
          currentTourStep == 13 ? setCurrentTourStep(current => current->succ) : ()
        },
      )
      eventEmitter.addListener(.
        EventUtils.getPublishAppEventName(),
        _ => {
          currentTourStep == 14 ? setCurrentTourStep(current => current->succ) : ()
        },
      )
      eventEmitter.addListener(.
        EventUtils.getRunEventName(),
        _ => {
          currentTourStep == 12 ? setCurrentTourStep(current => current->succ) : ()
        },
      )
      eventEmitter.addListener(.
        EventUtils.getShowUIControlsEventName(),
        _ => {
          currentTourStep == 2 || currentTourStep == 7
            ? setCurrentTourStep(current => current->succ)
            : ()
        },
      )
      eventEmitter.addListener(.
        EventUtils.getSelectUIControlEventName(),
        protocolName => {
          let protocolName = protocolName->Obj.magic

          (GuideUtils.isSceneViewProtocolName(protocolName) && currentTourStep == 3) ||
            (GuideUtils.isGameViewProtocolName(protocolName) && currentTourStep == 8)
            ? setCurrentTourStep(current => current->succ)
            : ()
        },
      )
      eventEmitter.addListener(.
        EventUtils.getSelectTreeNodeEventName(),
        title => {
          let title = title->Obj.magic

          title == "root" && currentTourStep == 6
            ? setCurrentTourStep(current => current->succ)
            : ()
        },
      )
    }, 5->Some)

    None
  })

  {
    isInCreateFromScratchTourPhase2
      ? {
          <>
            {GuideUtils.buildSteps(None, currentStep, GuideUtils.buildCreateFromScratchStepData())}
            <Tour
              current=currentTourStep
              _open={openTour}
              onClose={() => {
                setOpenTour(_ => false)

                dispatchForElementAssembleStore(
                  ElementAssembleStoreType.EndCreateFromScratchTourPhase2,
                )
              }}
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
      : React.null
  }
}
