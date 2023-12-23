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
    selectedUIControlTarget: React.ref<Js.Nullable.t<'a>>,
    inputSelectTarget: React.ref<Js.Nullable.t<'a>>,
    selectGameViewUIControlTarget: React.ref<Js.Nullable.t<'a>>,
    selectTreeUIControlTarget: React.ref<Js.Nullable.t<'a>>,
    rectXInputTarget: React.ref<Js.Nullable.t<'a>>,
    rectYInputTarget: React.ref<Js.Nullable.t<'a>>,
    runButtonTarget: React.ref<Js.Nullable.t<'a>>,
    publishButtonTarget: React.ref<Js.Nullable.t<'a>>,
    publishModalTarget: React.ref<Js.Nullable.t<'a>>,
    assembleSpaceNavTarget: React.ref<Js.Nullable.t<'a>>,
    inputCollapseTarget: React.ref<Js.Nullable.t<'a>>,
    addInputButtonTarget: React.ref<Js.Nullable.t<'a>>,
    inputCodeEditTarget: React.ref<Js.Nullable.t<'a>>,
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
        description: {React.string(`Scene View负责显示编辑视图，点击它`)},
        cover: Meta3dCommonlib.NullableSt.getEmpty(),
        target: () => selectSceneViewUIControlTarget->GuideUtils.getRefCurrent,
        closeIcon: {
          GuideUtils.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore)
        }->Meta3dCommonlib.NullableSt.return,
      },
      {
        title: "设置Scene View的宽度",
        description: {React.string(`这里可以设置为500`)},
        cover: Meta3dCommonlib.NullableSt.getEmpty(),
        target: () => rectWidthInputTarget->GuideUtils.getRefCurrent,
        closeIcon: {
          GuideUtils.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore)
        }->Meta3dCommonlib.NullableSt.return,
      },
      {
        title: "设置Scene View的高度",
        description: {React.string(`这里可以设置为500`)},
        cover: Meta3dCommonlib.NullableSt.getEmpty(),
        target: () => rectHeightInputTarget->GuideUtils.getRefCurrent,
        closeIcon: {
          GuideUtils.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore)
        }->Meta3dCommonlib.NullableSt.return,
      },
      {
        title: "选择Root",
        description: {
          React.string(`UI Control将会加入到选中的节点中。这里点击React`)
        },
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
        title: "加入Game View",
        description: {React.string(`Game View负责显示运行视图，点击它`)},
        cover: Meta3dCommonlib.NullableSt.getEmpty(),
        target: () => selectGameViewUIControlTarget->GuideUtils.getRefCurrent,
        closeIcon: {
          GuideUtils.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore)
        }->Meta3dCommonlib.NullableSt.return,
      },
      {
        title: "设置Game View的x坐标",
        description: {React.string(`这里可以设置为500`)},
        cover: Meta3dCommonlib.NullableSt.getEmpty(),
        target: () => rectXInputTarget->GuideUtils.getRefCurrent,
        closeIcon: {
          GuideUtils.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore)
        }->Meta3dCommonlib.NullableSt.return,
      },
      {
        title: "设置Game View的宽度",
        description: {React.string(`这里可以设置为500`)},
        cover: Meta3dCommonlib.NullableSt.getEmpty(),
        target: () => rectWidthInputTarget->GuideUtils.getRefCurrent,
        closeIcon: {
          GuideUtils.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore)
        }->Meta3dCommonlib.NullableSt.return,
      },
      {
        title: "设置Game View的高度",
        description: {React.string(`这里可以设置为500`)},
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
        title: "加入Tree",
        description: {
          React.string(`点击它。Tree负责显示层级数据，这里用来作为Scene Tree，显示场景中所有物体的name`)
        },
        cover: Meta3dCommonlib.NullableSt.getEmpty(),
        target: () => selectTreeUIControlTarget->GuideUtils.getRefCurrent,
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
        description: <Space direction=#vertical>
          <Typography.Text>
            {React.string(`1.点击下面的链接获得更新代码 2.将全部代码替换为它 3.点Next继续下一步的引导`)}
          </Typography.Text>
          <Typography.Link href={j`TODO link`} target=#_blank>
            {React.string(`点我获得更新代码`)}
            // `import { api } from "meta3d-type"
            // import { service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"

            // var nodeType;
            // (function (nodeType) {
            //     nodeType[nodeType["Type1"] = 0] = "Type1";
            //     nodeType[nodeType["Type2"] = 1] = "Type2";
            //     nodeType[nodeType["Type3"] = 2] = "Type3";
            // })(nodeType || (nodeType = {}));
            // let getAllTopGameObjects = (api, meta3dState, editorWholeService) => {
            //     let { gameObject, transform } = editorWholeService.scene(meta3dState);
            //     return gameObject.getAllGameObjects(meta3dState).filter(gameObject_ => {
            //         return api.nullable.isNullable(transform.getParent(meta3dState, gameObject.getTransform(meta3dState, gameObject_)));
            //     });
            // };
            // let buildHierachyGameObjects = (api, result, editorWholeService, meta3dState, parentGameObjects) => {
            //     let { gameObject, transform } = editorWholeService.scene(meta3dState);
            //     return parentGameObjects.reduce((result, parentGameObject) => {
            //         let children = transform.getChildren(meta3dState, gameObject.getTransform(meta3dState, parentGameObject));
            //         if (api.nullable.isNullable(children) || api.nullable.getExn(children).length == 0) {
            //             result.push([parentGameObject, []]);
            //         }
            //         else {
            //             result.push([parentGameObject, buildHierachyGameObjects(api, [], editorWholeService, meta3dState, api.nullable.getExn(children).map(child => {
            //                     return transform.getGameObjects(meta3dState, child)[0];
            //                 }))]);
            //         }
            //         return result;
            //     }, result);
            // };
            // let findSelectedGameObject = (api, hierachyGameObjects, treeIndexData) => {
            //     let _func = (hierachyGameObjects, index, treeIndexData) => {
            //         if (treeIndexData.length == 0) {
            //             return hierachyGameObjects[index][0];
            //         }
            //         return _func(hierachyGameObjects[index][1], api.nullable.getExn(treeIndexData[0]), treeIndexData.slice(1));
            //     };
            //     return _func(hierachyGameObjects, api.nullable.getExn(treeIndexData[0]), treeIndexData.slice(1));
            // };

            // let _convertToTreeData = (api, editorWholeService, meta3dState, hierachyGameObjects) => {
            //     let { gameObject } = editorWholeService.scene(meta3dState);
            //     return hierachyGameObjects.map(([gameObject_, children]) => {
            //         return [
            //             api.nullable.getWithDefault(gameObject.getGameObjectName(meta3dState, gameObject_), ""),
            //             gameObject.hasBasicCameraView(meta3dState, gameObject_) && gameObject.hasPerspectiveCameraProjection(meta3dState, gameObject_) ? nodeType.Type1 :
            //                 gameObject.hasDirectionLight(meta3dState, gameObject_) ? nodeType.Type2 :
            //                     nodeType.Type3,
            //             _convertToTreeData(api, editorWholeService, meta3dState, children)
            //         ];
            //     });
            // };
            // export let getContribute = (api:api) => {
            //     return {
            //         inputName: "SceneTreeInput",
            //         func: (meta3dState) => {
            //             let editorWholeService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol"));
            //             let hierachyGameObjects = buildHierachyGameObjects(api, [], editorWholeService, meta3dState, getAllTopGameObjects(api, meta3dState, editorWholeService));
            //             return Promise.resolve(_convertToTreeData(api, editorWholeService, meta3dState, hierachyGameObjects));
            //         }
            //     };
            // };`
          </Typography.Link>
        </Space>,
        cover: Meta3dCommonlib.NullableSt.getEmpty(),
        target: () => inputCodeEditTarget->GuideUtils.getRefCurrent,
        closeIcon: {
          GuideUtils.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore)
        }->Meta3dCommonlib.NullableSt.return,
      },
      {
        title: "选择Tree",
        description: {React.string(`这里点击刚加入的UI Control：树`)},
        cover: Meta3dCommonlib.NullableSt.getEmpty(),
        target: () => selectedUIControlTarget->GuideUtils.getRefCurrent,
        closeIcon: {
          GuideUtils.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore)
        }->Meta3dCommonlib.NullableSt.return,
      },
      {
        title: "选择SceneTreeInput",
        description: {React.string(`选择SceneTreeInput`)},
        cover: Meta3dCommonlib.NullableSt.getEmpty(),
        target: () => inputSelectTarget->GuideUtils.getRefCurrent,
        closeIcon: {
          GuideUtils.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore)
        }->Meta3dCommonlib.NullableSt.return,
      },
      {
        title: "设置Tree的y坐标",
        description: {React.string(`这里可以设置为500`)},
        cover: Meta3dCommonlib.NullableSt.getEmpty(),
        target: () => rectYInputTarget->GuideUtils.getRefCurrent,
        closeIcon: {
          GuideUtils.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore)
        }->Meta3dCommonlib.NullableSt.return,
      },
      {
        title: "设置Tree的宽度",
        description: {React.string(`这里可以设置为200`)},
        cover: Meta3dCommonlib.NullableSt.getEmpty(),
        target: () => rectWidthInputTarget->GuideUtils.getRefCurrent,
        closeIcon: {
          GuideUtils.buildCloseIcon(dispatchForAppStore, dispatchForElementAssembleStore)
        }->Meta3dCommonlib.NullableSt.return,
      },
      {
        title: "设置Tree的高度",
        description: {React.string(`这里可以设置为200`)},
        cover: Meta3dCommonlib.NullableSt.getEmpty(),
        target: () => rectHeightInputTarget->GuideUtils.getRefCurrent,
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
          React.string(`点击它。可以看到Scene Tree中显示了相机、立方体、方向光的name`)
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
  ~selectGameViewUIControlTarget: React.ref<Js.Nullable.t<'a>>,
  ~selectTreeUIControlTarget: React.ref<Js.Nullable.t<'a>>,
  ~rectXInputTarget: React.ref<Js.Nullable.t<'a>>,
  ~rectYInputTarget: React.ref<Js.Nullable.t<'a>>,
  ~runButtonTarget: React.ref<Js.Nullable.t<'a>>,
  ~publishButtonTarget: React.ref<Js.Nullable.t<'a>>,
  ~publishModalTarget: React.ref<Js.Nullable.t<'a>>,
  ~assembleSpaceNavTarget: React.ref<Js.Nullable.t<'a>>,
  ~inputCollapseTarget: React.ref<Js.Nullable.t<'a>>,
  ~addInputButtonTarget: React.ref<Js.Nullable.t<'a>>,
  ~inputCodeEditTarget: React.ref<Js.Nullable.t<'a>>,
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

      // eventEmitter.addListener(.
      //   EventUtils.getShowPublishAppModalEventName(),
      //   _ => {
      //     currentTourStep == 13 ? setCurrentTourStep(current => current->succ) : ()
      //   },
      // )
      // eventEmitter.addListener(.
      //   EventUtils.getPublishAppEventName(),
      //   _ => {
      //     currentTourStep == 14 ? setCurrentTourStep(current => current->succ) : ()
      //   },
      // )
      // eventEmitter.addListener(.
      //   EventUtils.getRunEventName(),
      //   _ => {
      //     currentTourStep == 12 ? setCurrentTourStep(current => current->succ) : ()
      //   },
      // )
      // eventEmitter.addListener(.
      //   EventUtils.getAddUIControlsEventName(),
      //   _ => {
      //     currentTourStep == 2 || currentTourStep == 7
      //       ? setCurrentTourStep(current => current->succ)
      //       : ()
      //   },
      // )
      // eventEmitter.addListener(.
      //   EventUtils.getSelectUIControlEventName(),
      //   protocolName => {
      //     let protocolName = protocolName->Obj.magic

      //     (GuideUtils.isSceneViewProtocolName(protocolName) && currentTourStep == 3) ||
      //     GuideUtils.isGameViewProtocolName(protocolName) && currentTourStep == 8 ||
      //     (GuideUtils.isTreeProtocolName(protocolName) && currentTourStep == 15)
      //       ? setCurrentTourStep(current => current->succ)
      //       : ()
      //   },
      // )
      // eventEmitter.addListener(.
      //   EventUtils.getSelectTreeNodeEventName(),
      //   title => {
      //     let title = title->Obj.magic

      //     title == "root" && currentTourStep == 6
      //       ? setCurrentTourStep(current => current->succ)
      //       : ()
      //   },
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
      eventEmitter.addListener(.
        EventUtils.getRunEventName(),
        _ => {
          setCurrentTourStep(current => current->succ)
        },
      )
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
          setCurrentTourStep(current => current->succ)
        },
      )
      eventEmitter.addListener(.
        EventUtils.getSelectTreeNodeEventName(),
        title => {
          let title = title->Obj.magic

          title == "root" ||
          title->Js.String.includes("Tree", _) ||
          title->Js.String.includes("树", _)
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

          inputName == "SceneTreeInput" ? setCurrentTourStep(current => current->succ) : ()
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
        inputName => {
          let inputName = inputName->Obj.magic

          // inputName == "Input1" ? setCurrentTourStep(current => current->succ) : ()
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
                selectGameViewUIControlTarget,
                selectTreeUIControlTarget,
                rectXInputTarget,
                rectYInputTarget,
                runButtonTarget,
                publishButtonTarget,
                publishModalTarget,
                assembleSpaceNavTarget,
                inputCollapseTarget,
                addInputButtonTarget,
                inputCodeEditTarget,
              )}
            />
          </>
        }
      : React.null
  }
}
