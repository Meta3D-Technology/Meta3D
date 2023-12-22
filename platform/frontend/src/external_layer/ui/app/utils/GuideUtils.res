type guideStatus = {
  isFinishFirstLogin: bool,
  isFinishCreateFromScratchTour: bool,
  // isInCreateFromScratchTour: bool,
}

let _buildKey = () => {j`meta3d_guide_status`}

let _createDefaultStatus = (): guideStatus => {
  isFinishFirstLogin: false,
  isFinishCreateFromScratchTour: false,
  // isInCreateFromScratchTour: false,
}

let _readGuideStatus = (): guideStatus => {
  LocalStorageUtils.get(_buildKey())
  ->Meta3dCommonlib.OptionSt.fromNullable
  ->Meta3dCommonlib.OptionSt.map(Js.Json.parseExn)
  ->Meta3dCommonlib.OptionSt.getWithDefault(_createDefaultStatus()->Obj.magic)
  ->Obj.magic
}

let readIsFinishFirstLogin = () => {
  _readGuideStatus().isFinishFirstLogin
}

let markFinishFirstLogin = () => {
  LocalStorageUtils.set(
    _buildKey(),
    {
      ..._readGuideStatus(),
      isFinishFirstLogin: true,
    }
    ->Obj.magic
    ->Js.Json.stringify,
  )
}

let readIsFinishCreateFromScratchTour = () => {
  _readGuideStatus().isFinishCreateFromScratchTour
}

// let markBeginCreateFromScratchTour = () => {
//   LocalStorageUtils.set(
//     _buildKey(),
//     {
//       ..._readGuideStatus(),
//       // isFinishCreateFromScratchTour: true,
//       isInCreateFromScratchTour: true,
//     }->Js.Json.stringifyAny,
//   )
// }

// let readIsInCreateFromScratchTour = () => {
//   _readGuideStatus().isInCreateFromScratchTour
// }

let markFinishCreateFromScratchTour = () => {
  LocalStorageUtils.set(
    _buildKey(),
    {
      ..._readGuideStatus(),
      isFinishCreateFromScratchTour: true,
      // isInCreateFromScratchTour: false,
    }->Js.Json.stringifyAny,
  )
}

let _markStartCreateFromScratchTour = () => {
  LocalStorageUtils.set(
    _buildKey(),
    {
      ..._readGuideStatus(),
      isFinishCreateFromScratchTour: false,
      // isInCreateFromScratchTour: false,
    }->Js.Json.stringifyAny,
  )
}

let buildCreateFromScratchStepData = () => {
  [
    ("点击创建按钮", "点击创建按钮", ""),
    (
      "设置画布大小",
      "设置画布的宽度和高度",
      "在两个输入框中分别输入宽度和高度",
    ),
    (
      "加入UI Control",
      "加入UI Control",
      "加入所有的UI Control，将它们摆放到合适的位置",
    ),
    //// 设置Input
    //// 设置Action
    ("运行", "运行", "运行编辑器"),
    ("发布", "发布", "发布编辑器"),
    ("返回用户中心", "返回用户中心", "返回用户中心，查看发布的编辑器"),
    // 在用户中心和发布的编辑器中找到
  ]
}

let buildSteps = (onStartFunc, current, stepData) => {
  let (_, title, description) = stepData->Meta3dCommonlib.ArraySt.getExn(current)

  <>
    <Antd.Steps
      current={current}
      items={stepData->Meta3dCommonlib.ArraySt.map(((stepTitle, _, _)): Antd__Steps.stepItem => {
        {
          key: stepTitle,
          title: stepTitle,
          description: Meta3dCommonlib.NullableSt.getEmpty(),
        }
      })}
    />
    <StepContent onStartFunc title description />
  </>
}

let getRefCurrent = (ref: React.ref<Js.Nullable.t<'a>>) => {
  ref.current->Obj.magic
}

// let getInputRefCurrent = (inputRef: React.ref<Js.Nullable.t<'a>>) => {
//   inputRef.current
//   ->Obj.magic
//   ->Meta3dCommonlib.NullableSt.map((. value) => value["input"])
//   ->Obj.magic
// }

let _getSceneViewProtocolName = () => "meta3d-ui-control-scene-view-protocol"

let _getGameViewProtocolName = () => "meta3d-ui-control-game-view-protocol"

let isSceneViewProtocolName = protocolName => {
  protocolName == _getSceneViewProtocolName()
}

let isGameViewProtocolName = protocolName => {
  protocolName == _getGameViewProtocolName()
}

let startCreateFromScratchTour = (dispatchForAppStore, dispatchForElementAssembleStore) => {
  dispatchForAppStore(
    AppStoreType.UserCenterAction(UserCenterStoreType.StartCreateFromScratchTourPhase1),
  )
  dispatchForElementAssembleStore(ElementAssembleStoreType.StartCreateFromScratchTourPhase2)
  dispatchForAppStore(
    AppStoreType.UserCenterAction(UserCenterStoreType.StartCreateFromScratchTourPhase3),
  )

  _markStartCreateFromScratchTour()
}

let endCreateFromScratchTour = (dispatchForAppStore, dispatchForElementAssembleStore) => {
  dispatchForAppStore(
    AppStoreType.UserCenterAction(UserCenterStoreType.EndCreateFromScratchTourPhase1),
  )
  dispatchForElementAssembleStore(ElementAssembleStoreType.EndCreateFromScratchTourPhase2)
  dispatchForAppStore(
    AppStoreType.UserCenterAction(UserCenterStoreType.EndCreateFromScratchTourPhase3),
  )

  markFinishCreateFromScratchTour()
}

let buildCloseIcon = (dispatchForAppStore, dispatchForElementAssembleStore) => {
  open Antd

  <Popconfirm
    title="结束引导"
    description="您确定结束本次引导吗？"
    onConfirm={_ => {
      endCreateFromScratchTour(dispatchForAppStore, dispatchForElementAssembleStore)
    }}
    onCancel={event => {
      (event->Obj.magic)["preventDefault"](.)
      (event->Obj.magic)["stopPropagation"](.)
    }}
    okText="是"
    cancelText="否">
    <Icon.CloseOutlined
      onClick={event => {
        // Window.confirm("您确定要结束本次引导吗？")
        //   ? {
        //       Js.log("yes")
        //       true-> Obj.magic
        //     }
        //   : {
        //       Js.log("no")
        //       Js.log(event)
        //       (event->Obj.magic)["preventDefault"](.)
        //       (event->Obj.magic)["stopPropagation"](.)
        //       false-> Obj.magic
        //     }

        (event->Obj.magic)["preventDefault"](.)
        (event->Obj.magic)["stopPropagation"](.)
      }}
    />
    // <Button
    //   onClick={event => {
    //     // Window.confirm("您确定要结束本次引导吗？")
    //     //   ? {
    //     //       Js.log("yes")
    //     //       true-> Obj.magic
    //     //     }
    //     //   : {
    //     //       Js.log("no")
    //     //       Js.log(event)
    //     //       (event->Obj.magic)["preventDefault"](.)
    //     //       (event->Obj.magic)["stopPropagation"](.)
    //     //       false-> Obj.magic
    //     //     }

    //     (event->Obj.magic)["preventDefault"](.)
    //     (event->Obj.magic)["stopPropagation"](.)
    //   }}>
    //   {React.string(`取消`)}
    // </Button>
  </Popconfirm>
}

let handleCloseCreateFromScratchTour = (dispatchForAppStore, dispatchForElementAssembleStore) => {
  Window.confirm("您确定要结束本次引导吗？")
    ? {
        endCreateFromScratchTour(dispatchForAppStore, dispatchForElementAssembleStore)
      }
    : {
        ()
      }
}
