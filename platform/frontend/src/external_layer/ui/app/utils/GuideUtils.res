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
    }->Js.Json.stringifyAny,
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

let buildCreateFromScratchTourStepData = () => {
  [
    ("点击创建按钮", "点击创建按钮", ""),
    (
      "设置画布大小",
      "设置画布的宽度和高度",
      "在两个输入框中分别输入宽度和高度",
    ),
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
