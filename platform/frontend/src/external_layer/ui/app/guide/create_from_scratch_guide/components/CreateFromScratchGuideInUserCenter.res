open Antd
%%raw("import 'antd/dist/reset.css'")

@react.component
let make = (
  ~service: FrontendType.service,
  ~createFromScratchButtonTarget: React.ref<Js.Nullable.t<'a>>,
  ~publishedEditorsTarget: React.ref<Js.Nullable.t<'a>>,
  ~navTarget: React.ref<Js.Nullable.t<'a>>,
  ~guideTarget: React.ref<Js.Nullable.t<'a>>,
) => {
  let dispatch = AppStore.useDispatch()
  let dispatchForApAssembleStore = ReduxUtils.ApAssemble.useDispatch(
    ReactUtils.useDispatchForAssembleSpaceStore,
  )
  let dispatchForElementAssembleStore = ReduxUtils.ElementAssemble.useDispatch(
    ReactUtils.useDispatchForAssembleSpaceStore,
  )

  let {isInCreateFromScratchTourPhase1, isInCreateFromScratchTourPhase3} = AppStore.useSelector((
    {userCenterState}: AppStoreType.state,
  ) => userCenterState)

  let (openTourPhase1, setOpenTourPhase1) = React.useState(_ => false)
  let (openTourPhase3, setOpenTourPhase3) = React.useState(_ => false)

  let _buildCreateFromScratchPhase1TourSteps = (): array<Antd__Tour.tourStep> => {
    [
      {
        title: "点击它",
        description: "",
        cover: Meta3dCommonlib.NullableSt.getEmpty(),
        target: () => createFromScratchButtonTarget->GuideUtils.getRefCurrent,
        closeIcon: {
          GuideUtils.buildCloseIcon(dispatch, dispatchForElementAssembleStore)
        }->Meta3dCommonlib.NullableSt.return,
      },
    ]
  }

  let _buildCreateFromScratchPhase3TourSteps = (
    publishedEditorsTarget: React.ref<Js.Nullable.t<'a>>,
    navTarget: React.ref<Js.Nullable.t<'a>>,
    guideTarget: React.ref<Js.Nullable.t<'a>>,
  ): array<Antd__Tour.tourStep> => {
    [
      {
        title: "查看发布的编辑器",
        description: "按照编辑器名，找到刚刚发布的编辑器。您可以继续编辑它，或者在线运行它",
        cover: Meta3dCommonlib.NullableSt.getEmpty(),
        target: () => publishedEditorsTarget->GuideUtils.getRefCurrent,
        closeIcon: {
          GuideUtils.buildCloseIcon(dispatch, dispatchForElementAssembleStore)
        }->Meta3dCommonlib.NullableSt.return,
      },
      {
        title: "查看所有发布的编辑器",
        description: "点击第二个导航栏：“发布的编辑器”，您可以在这里查看所有人发布的编辑器，并且找到您刚刚发布的编辑器。您可以导入它们（也就是导入模板来创建新的编辑器），或者在线运行它们",
        cover: Meta3dCommonlib.NullableSt.getEmpty(),
        target: () => navTarget->GuideUtils.getRefCurrent,
        closeIcon: {
          GuideUtils.buildCloseIcon(dispatch, dispatchForElementAssembleStore)
        }->Meta3dCommonlib.NullableSt.return,
      },
      {
        title: "这里可以打开更多引导",
        description: "",
        cover: Meta3dCommonlib.NullableSt.getEmpty(),
        target: () => guideTarget->GuideUtils.getRefCurrent,
        closeIcon: {
          GuideUtils.buildCloseIcon(dispatch, dispatchForElementAssembleStore)
        }->Meta3dCommonlib.NullableSt.return,
      },
    ]
  }

  React.useEffect0(() => {
    MessageUtils.showCatchedErrorMessage(() => {
      isInCreateFromScratchTourPhase1 ? setOpenTourPhase1(_ => true) : setOpenTourPhase1(_ => false)
      isInCreateFromScratchTourPhase3 ? setOpenTourPhase3(_ => true) : setOpenTourPhase3(_ => false)
    }, 5->Some)

    None
  })

  {
    <>
      {isInCreateFromScratchTourPhase1
        ? {
            <>
              {GuideUtils.buildSteps(None, 0, GuideUtils.buildCreateFromScratchStepData())}
              <Tour _open={openTourPhase1} steps={_buildCreateFromScratchPhase1TourSteps()} />
            </>
          }
        : isInCreateFromScratchTourPhase3
        ? {
          <>
            {GuideUtils.buildSteps(None, 5, GuideUtils.buildCreateFromScratchStepData())}
            <Tour
              _open={openTourPhase3}
              onClose={() => {
                GuideUtils.endCreateFromScratchTour(dispatch, dispatchForElementAssembleStore)
              }}
              steps={_buildCreateFromScratchPhase3TourSteps(
                publishedEditorsTarget,
                navTarget,
                guideTarget,
              )}
            />
          </>
        }
        : React.null}
    </>
  }
}
