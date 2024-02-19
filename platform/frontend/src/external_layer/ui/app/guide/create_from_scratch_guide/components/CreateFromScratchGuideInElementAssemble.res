open Antd
%%raw("import 'antd/dist/reset.css'")
open AssembleSpaceType

module Method = {
  let buildCreateFromScratchTourStepAndStepMapData = () => {
    [(0, 1), (2, 2), (20, 3), (27, 4), (34, 5)]
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
    selectedUIControlTarget: React.ref<Js.Nullable.t<'a>>,
    inputSelectTarget: React.ref<Js.Nullable.t<'a>>,
    actionSelectTarget: React.ref<Js.Nullable.t<'a>>,
    selectGameViewUIControlTarget: React.ref<Js.Nullable.t<'a>>,
    selectWindowUIControlTarget: React.ref<Js.Nullable.t<'a>>,
    selectButtonUIControlTarget: React.ref<Js.Nullable.t<'a>>,
    rectXInputTarget: React.ref<Js.Nullable.t<'a>>,
    rectYInputTarget: React.ref<Js.Nullable.t<'a>>,
    runButtonTarget: React.ref<Js.Nullable.t<'a>>,
    publishButtonTarget: React.ref<Js.Nullable.t<'a>>,
    publishModalTarget: React.ref<Js.Nullable.t<'a>>,
    assembleSpaceNavTarget: React.ref<Js.Nullable.t<'a>>,
    inputCollapseTarget: React.ref<Js.Nullable.t<'a>>,
    addInputButtonTarget: React.ref<Js.Nullable.t<'a>>,
    inputCodeEditTarget: React.ref<Js.Nullable.t<'a>>,
    actionCollapseTarget: React.ref<Js.Nullable.t<'a>>,
    addActionButtonTarget: React.ref<Js.Nullable.t<'a>>,
    actionCodeEditTarget: React.ref<Js.Nullable.t<'a>>,
  ): array<Antd__Tour.tourStep> => {
    [
      {
        title: "设置画布宽度",
        description: {React.string(`这里可以设置为1200`)},
        cover: Meta3dCommonlib.NullableSt.getEmpty(),
        target: () => canvasWidthInputTarget->GuideUtils.getRefCurrent,
        closeIcon: {
          GuideUtils.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore)
        }->Meta3dCommonlib.NullableSt.return,
      },
      {
        title: "设置画布高度",
        description: {React.string(`这里可以设置为800`)},
        cover: Meta3dCommonlib.NullableSt.getEmpty(),
        target: () => canvasHeightInputTarget->GuideUtils.getRefCurrent,
        closeIcon: {
          GuideUtils.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore)
        }->Meta3dCommonlib.NullableSt.return,
      },
      {
        title: "点击加入UI Control的按钮",
        description: {React.string(``)},
        cover: Meta3dCommonlib.NullableSt.getEmpty(),
        target: () => addUIControlButtonTarget->GuideUtils.getRefCurrent,
        closeIcon: {
          GuideUtils.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore)
        }->Meta3dCommonlib.NullableSt.return,
      },
      {
        title: "加入Scene View",
        description: {React.string(`点击它。Scene View负责显示编辑视图`)},
        cover: Meta3dCommonlib.NullableSt.getEmpty(),
        target: () => selectSceneViewUIControlTarget->GuideUtils.getRefCurrent,
        closeIcon: {
          GuideUtils.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore)
        }->Meta3dCommonlib.NullableSt.return,
      },
      {
        title: "设置Scene View的宽度",
        description: {React.string(`这里可以设置为400`)},
        cover: Meta3dCommonlib.NullableSt.getEmpty(),
        target: () => rectWidthInputTarget->GuideUtils.getRefCurrent,
        closeIcon: {
          GuideUtils.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore)
        }->Meta3dCommonlib.NullableSt.return,
      },
      {
        title: "设置Scene View的高度",
        description: {React.string(`这里可以设置为400`)},
        cover: Meta3dCommonlib.NullableSt.getEmpty(),
        target: () => rectHeightInputTarget->GuideUtils.getRefCurrent,
        closeIcon: {
          GuideUtils.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore)
        }->Meta3dCommonlib.NullableSt.return,
      },
      // {
      //   title: "选择Root",
      //   description: {
      //     React.string(`UI Control将会加入到选中的节点中。这里点击Root`)
      //   },
      //   cover: Meta3dCommonlib.NullableSt.getEmpty(),
      //   target: () => selectedUIControlTarget->GuideUtils.getRefCurrent,
      //   closeIcon: {
      //     GuideUtils.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore)
      //   }->Meta3dCommonlib.NullableSt.return,
      // },
      {
        title: "点击加入UI Control的按钮",
        description: {React.string(``)},
        cover: Meta3dCommonlib.NullableSt.getEmpty(),
        target: () => addUIControlButtonTarget->GuideUtils.getRefCurrent,
        closeIcon: {
          GuideUtils.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore)
        }->Meta3dCommonlib.NullableSt.return,
      },
      {
        title: "加入Game View",
        description: {React.string(`点击它。Game View负责显示运行视图`)},
        cover: Meta3dCommonlib.NullableSt.getEmpty(),
        target: () => selectGameViewUIControlTarget->GuideUtils.getRefCurrent,
        closeIcon: {
          GuideUtils.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore)
        }->Meta3dCommonlib.NullableSt.return,
      },
      {
        title: "设置Game View的x坐标",
        description: {React.string(`这里可以设置为400`)},
        cover: Meta3dCommonlib.NullableSt.getEmpty(),
        target: () => rectXInputTarget->GuideUtils.getRefCurrent,
        closeIcon: {
          GuideUtils.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore)
        }->Meta3dCommonlib.NullableSt.return,
      },
      {
        title: "设置Game View的宽度",
        description: {React.string(`这里可以设置为400`)},
        cover: Meta3dCommonlib.NullableSt.getEmpty(),
        target: () => rectWidthInputTarget->GuideUtils.getRefCurrent,
        closeIcon: {
          GuideUtils.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore)
        }->Meta3dCommonlib.NullableSt.return,
      },
      {
        title: "设置Game View的高度",
        description: {React.string(`这里可以设置为400`)},
        cover: Meta3dCommonlib.NullableSt.getEmpty(),
        target: () => rectHeightInputTarget->GuideUtils.getRefCurrent,
        closeIcon: {
          GuideUtils.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore)
        }->Meta3dCommonlib.NullableSt.return,
      },
      {
        title: "运行编辑器",
        description: {
          React.string(`点击它，可在新的窗口中实时运行编辑器。您可以在Scene View中通过拖动来转动相机`)
        },
        cover: Meta3dCommonlib.NullableSt.getEmpty(),
        target: () => runButtonTarget->GuideUtils.getRefCurrent,
        closeIcon: {
          GuideUtils.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore)
        }->Meta3dCommonlib.NullableSt.return,
      },
      // {
      //   title: "选择Root",
      //   description: {React.string(`这里点击React`)},
      //   cover: Meta3dCommonlib.NullableSt.getEmpty(),
      //   target: () => selectedUIControlTarget->GuideUtils.getRefCurrent,
      //   closeIcon: {
      //     GuideUtils.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore)
      //   }->Meta3dCommonlib.NullableSt.return,
      // },
      {
        title: "点击加入UI Control的按钮",
        description: {React.string(``)},
        cover: Meta3dCommonlib.NullableSt.getEmpty(),
        target: () => addUIControlButtonTarget->GuideUtils.getRefCurrent,
        closeIcon: {
          GuideUtils.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore)
        }->Meta3dCommonlib.NullableSt.return,
      },
      {
        title: "加入窗口",
        description: {
          // React.string(`点击它。窗口负责显示层级数据，这里用来作为Scene Tree，显示场景中所有物体的name`)
          React.string(`点击它。窗口是容器，能加入其它的UI Control到它中`)
        },
        cover: Meta3dCommonlib.NullableSt.getEmpty(),
        target: () => selectWindowUIControlTarget->GuideUtils.getRefCurrent,
        closeIcon: {
          GuideUtils.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore)
        }->Meta3dCommonlib.NullableSt.return,
      },
      {
        title: "设置窗口的y坐标",
        description: {React.string(`这里可以设置为500`)},
        cover: Meta3dCommonlib.NullableSt.getEmpty(),
        target: () => rectYInputTarget->GuideUtils.getRefCurrent,
        closeIcon: {
          GuideUtils.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore)
        }->Meta3dCommonlib.NullableSt.return,
      },
      {
        title: "设置窗口的宽度",
        description: {React.string(`这里可以设置为200`)},
        cover: Meta3dCommonlib.NullableSt.getEmpty(),
        target: () => rectWidthInputTarget->GuideUtils.getRefCurrent,
        closeIcon: {
          GuideUtils.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore)
        }->Meta3dCommonlib.NullableSt.return,
      },
      {
        title: "设置窗口的高度",
        description: {React.string(`这里可以设置为100`)},
        cover: Meta3dCommonlib.NullableSt.getEmpty(),
        target: () => rectHeightInputTarget->GuideUtils.getRefCurrent,
        closeIcon: {
          GuideUtils.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore)
        }->Meta3dCommonlib.NullableSt.return,
      },
      {
        title: "选择窗口",
        description: {React.string(`这里点击窗口`)},
        cover: Meta3dCommonlib.NullableSt.getEmpty(),
        target: () => selectedUIControlTarget->GuideUtils.getRefCurrent,
        closeIcon: {
          GuideUtils.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore)
        }->Meta3dCommonlib.NullableSt.return,
      },
      {
        title: "点击加入UI Control的按钮",
        description: {React.string(``)},
        cover: Meta3dCommonlib.NullableSt.getEmpty(),
        target: () => addUIControlButtonTarget->GuideUtils.getRefCurrent,
        closeIcon: {
          GuideUtils.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore)
        }->Meta3dCommonlib.NullableSt.return,
      },
      {
        title: "加入按钮",
        description: {
          React.string(`点击它，将其加入到窗口中`)
        },
        cover: Meta3dCommonlib.NullableSt.getEmpty(),
        target: () => selectButtonUIControlTarget->GuideUtils.getRefCurrent,
        closeIcon: {
          GuideUtils.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore)
        }->Meta3dCommonlib.NullableSt.return,
      },
      {
        title: "展开Input",
        description: {React.string(`点击它`)},
        cover: Meta3dCommonlib.NullableSt.getEmpty(),
        target: () => inputCollapseTarget->GuideUtils.getRefCurrent,
        closeIcon: {
          GuideUtils.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore)
        }->Meta3dCommonlib.NullableSt.return,
      },
      {
        title: "加入Input",
        description: {React.string(`点击它`)},
        cover: Meta3dCommonlib.NullableSt.getEmpty(),
        target: () => addInputButtonTarget->GuideUtils.getRefCurrent,
        closeIcon: {
          GuideUtils.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore)
        }->Meta3dCommonlib.NullableSt.return,
      },
      {
        title: "选择加入的Input",
        description: {React.string(`点击Input1`)},
        cover: Meta3dCommonlib.NullableSt.getEmpty(),
        target: () => inputCollapseTarget->GuideUtils.getRefCurrent,
        closeIcon: {
          GuideUtils.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore)
        }->Meta3dCommonlib.NullableSt.return,
      },
      {
        title: "更新代码",
        description: {
          React.string(`将“Promise.resolve(null)”替换为：“Promise.resolve(true)”`)
        },
        cover: Meta3dCommonlib.NullableSt.getEmpty(),
        target: () => inputCodeEditTarget->GuideUtils.getRefCurrent,
        closeIcon: {
          GuideUtils.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore)
        }->Meta3dCommonlib.NullableSt.return,
      },
      {
        title: "选择窗口",
        description: {React.string(`这里点击窗口`)},
        cover: Meta3dCommonlib.NullableSt.getEmpty(),
        target: () => selectedUIControlTarget->GuideUtils.getRefCurrent,
        closeIcon: {
          GuideUtils.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore)
        }->Meta3dCommonlib.NullableSt.return,
      },
      {
        title: "选择Input1",
        description: {
          React.string(`这里选择刚加入的Input1，从而指定要绘制窗口。注：如果将Input1中的true改为false，则会隐藏窗口。`)
        },
        cover: Meta3dCommonlib.NullableSt.getEmpty(),
        target: () => inputSelectTarget->GuideUtils.getRefCurrent,
        closeIcon: {
          GuideUtils.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore)
        }->Meta3dCommonlib.NullableSt.return,
      },
      // {
      //   title: "设置Tree的专有数据中的nodeType1Image",
      //   description: <Space direction=#vertical>
      //     <Typography.title>
      //       {React.string(`这是设置相机`)}
      //     </Typography.Text>
      //     <Typography.Text>
      //       {React.string(`1.点击下面的链接获得更新代码 2.将全部代码替换为它 3.点Next继续下一步的引导`)}
      //     </Typography.Text>
      //     <Typography.Link href={j`TODO link`} target=#_blank>
      //       {React.string(`点我获得更新代码`)}
      //     </Typography.Link>
      //   </Space>,
      //   cover: Meta3dCommonlib.NullableSt.getEmpty(),
      //   target: () => rectHeightInputTarget->GuideUtils.getRefCurrent,
      //   closeIcon: {
      //     GuideUtils.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore)
      //   }->Meta3dCommonlib.NullableSt.return,
      // },
      {
        title: "运行编辑器",
        description: {
          // React.string(`点击它。可以看到Scene Tree中显示了相机、立方体、方向光的name`)
          React.string(`点击它。您可以在左下方看到绘制的窗口`)
        },
        cover: Meta3dCommonlib.NullableSt.getEmpty(),
        target: () => runButtonTarget->GuideUtils.getRefCurrent,
        closeIcon: {
          GuideUtils.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore)
        }->Meta3dCommonlib.NullableSt.return,
      },
      {
        title: "展开Action",
        description: {React.string(`点击它`)},
        cover: Meta3dCommonlib.NullableSt.getEmpty(),
        target: () => actionCollapseTarget->GuideUtils.getRefCurrent,
        closeIcon: {
          GuideUtils.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore)
        }->Meta3dCommonlib.NullableSt.return,
      },
      {
        title: "加入Action",
        description: {React.string(`点击它`)},
        cover: Meta3dCommonlib.NullableSt.getEmpty(),
        target: () => addActionButtonTarget->GuideUtils.getRefCurrent,
        closeIcon: {
          GuideUtils.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore)
        }->Meta3dCommonlib.NullableSt.return,
      },
      {
        title: "选择加入的Action",
        description: {React.string(`点击Action1`)},
        cover: Meta3dCommonlib.NullableSt.getEmpty(),
        target: () => actionCollapseTarget->GuideUtils.getRefCurrent,
        closeIcon: {
          GuideUtils.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore)
        }->Meta3dCommonlib.NullableSt.return,
      },
      {
        title: "更新代码",
        description: {
          React.string(`在第12行代码：“return Promise.resolve(meta3dState)”之前插入一行代码：
alert("触发按钮的click事件")`)
        },
        cover: Meta3dCommonlib.NullableSt.getEmpty(),
        target: () => actionCodeEditTarget->GuideUtils.getRefCurrent,
        closeIcon: {
          GuideUtils.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore)
        }->Meta3dCommonlib.NullableSt.return,
      },
      {
        title: "选择按钮",
        description: {React.string(`这里点击按钮`)},
        cover: Meta3dCommonlib.NullableSt.getEmpty(),
        target: () => selectedUIControlTarget->GuideUtils.getRefCurrent,
        closeIcon: {
          GuideUtils.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore)
        }->Meta3dCommonlib.NullableSt.return,
      },
      {
        title: "选择Action1",
        description: {
          React.string(`这里选择刚加入的Action1，从而指定触发按钮的click事件时，将会执行Action1`)
        },
        cover: Meta3dCommonlib.NullableSt.getEmpty(),
        target: () => actionSelectTarget->GuideUtils.getRefCurrent,
        closeIcon: {
          GuideUtils.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore)
        }->Meta3dCommonlib.NullableSt.return,
      },
      {
        title: "运行编辑器",
        description: {
          React.string(`点击它。您可以点击按钮，将会弹一个alert`)
        },
        cover: Meta3dCommonlib.NullableSt.getEmpty(),
        target: () => runButtonTarget->GuideUtils.getRefCurrent,
        closeIcon: {
          GuideUtils.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore)
        }->Meta3dCommonlib.NullableSt.return,
      },
      {
        title: "发布编辑器",
        description: {React.string(`点击它`)},
        cover: Meta3dCommonlib.NullableSt.getEmpty(),
        target: () => publishButtonTarget->GuideUtils.getRefCurrent,
        closeIcon: {
          GuideUtils.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore)
        }->Meta3dCommonlib.NullableSt.return,
      },
      {
        title: "发布编辑器",
        description: {React.string(`首先输入必要的信息；然后点击发布按钮`)},
        cover: Meta3dCommonlib.NullableSt.getEmpty(),
        target: () => publishModalTarget->GuideUtils.getRefCurrent,
        closeIcon: {
          GuideUtils.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore)
        }->Meta3dCommonlib.NullableSt.return,
      },
      {
        title: "返回用户中心",
        description: {
          React.string(`点击第一个导航栏：“返回用户中心”，返回到用户中心`)
        },
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
  ~selectedUIControlTarget: React.ref<Js.Nullable.t<'a>>,
  // ~treeTarget: React.ref<Js.Nullable.t<'a>>,
  ~inputSelectTarget: React.ref<Js.Nullable.t<'a>>,
  ~actionSelectTarget: React.ref<Js.Nullable.t<'a>>,
  ~selectGameViewUIControlTarget: React.ref<Js.Nullable.t<'a>>,
  ~selectWindowUIControlTarget: React.ref<Js.Nullable.t<'a>>,
  ~selectButtonUIControlTarget: React.ref<Js.Nullable.t<'a>>,
  ~rectXInputTarget: React.ref<Js.Nullable.t<'a>>,
  ~rectYInputTarget: React.ref<Js.Nullable.t<'a>>,
  ~runButtonTarget: React.ref<Js.Nullable.t<'a>>,
  ~publishButtonTarget: React.ref<Js.Nullable.t<'a>>,
  ~publishModalTarget: React.ref<Js.Nullable.t<'a>>,
  ~assembleSpaceNavTarget: React.ref<Js.Nullable.t<'a>>,
  ~inputCollapseTarget: React.ref<Js.Nullable.t<'a>>,
  ~addInputButtonTarget: React.ref<Js.Nullable.t<'a>>,
  ~inputCodeEditTarget: React.ref<Js.Nullable.t<'a>>,
  ~actionCollapseTarget: React.ref<Js.Nullable.t<'a>>,
  ~addActionButtonTarget: React.ref<Js.Nullable.t<'a>>,
  ~actionCodeEditTarget: React.ref<Js.Nullable.t<'a>>,
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
          setCurrentTourStep(current => current->succ)
        },
      )
      eventEmitter.addListener(.
        EventUtils.getPublishAppEventName(),
        _ => {
          setCurrentTourStep(current => current->succ)
        },
      )
      // eventEmitter.addListener(.
      //   EventUtils.getRunEventName(),
      //   _ => {
      //     setCurrentTourStep(current => current->succ)
      //   },
      // )
      eventEmitter.addListener(.
        EventUtils.getAddUIControlsEventName(),
        _ => {
          Window.setTimeout(
            () => {
              setCurrentTourStep(current => current->succ)
            },
            0,
          )
        },
      )
      eventEmitter.addListener(.
        EventUtils.getSelectUIControlEventName(),
        protocolName => {
          Window.setTimeout(
            () => {
              setCurrentTourStep(current => current->succ)
            },
            0,
          )
        },
      )
      eventEmitter.addListener(.
        EventUtils.getSelectTreeNodeEventName(),
        title => {
          let title = title->Obj.magic

          title == "root" ||
          title->Js.String.includes("Window", _) ||
          title->Js.String.includes("窗口", _) ||
          title->Js.String.includes("Button", _) ||
          title->Js.String.includes("按钮", _)
            ? setCurrentTourStep(current => current->succ)
            : ()
        },
      )
      eventEmitter.addListener(.
        EventUtils.getExpandInputCollapseEventName(),
        _ => {
          setCurrentTourStep(current => current->succ)
        },
      )
      eventEmitter.addListener(.
        EventUtils.getSelectInputInUIControlInspectorEventName(),
        inputName => {
          let inputName = inputName->Obj.magic

          inputName == "Input1" ? setCurrentTourStep(current => current->succ) : ()
        },
      )
      eventEmitter.addListener(.
        EventUtils.getAddInputEventName(),
        _ => {
          setCurrentTourStep(current => current->succ)
        },
      )
      eventEmitter.addListener(.
        EventUtils.getSelectInputInInputsEventName(),
        _ => {
          setCurrentTourStep(current => current->succ)
        },
      )
      eventEmitter.addListener(.
        EventUtils.getExpandActionCollapseEventName(),
        _ => {
          setCurrentTourStep(current => current->succ)
        },
      )
      eventEmitter.addListener(.
        EventUtils.getSelectActionInUIControlInspectorEventName(),
        inputName => {
          let inputName = inputName->Obj.magic

          inputName == "Action1" ? setCurrentTourStep(current => current->succ) : ()
        },
      )
      eventEmitter.addListener(.
        EventUtils.getAddActionEventName(),
        _ => {
          setCurrentTourStep(current => current->succ)
        },
      )
      eventEmitter.addListener(.
        EventUtils.getSelectActionInActionsEventName(),
        _ => {
          setCurrentTourStep(current => current->succ)
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
                selectedUIControlTarget,
                inputSelectTarget,
                actionSelectTarget,
                selectGameViewUIControlTarget,
                selectWindowUIControlTarget,
                selectButtonUIControlTarget,
                rectXInputTarget,
                rectYInputTarget,
                runButtonTarget,
                publishButtonTarget,
                publishModalTarget,
                assembleSpaceNavTarget,
                inputCollapseTarget,
                addInputButtonTarget,
                inputCodeEditTarget,
                actionCollapseTarget,
                addActionButtonTarget,
                actionCodeEditTarget,
              )}
            />
          </>
        }
      : React.null
  }
}
