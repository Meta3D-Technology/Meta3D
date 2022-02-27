type customControlName = string

// TODO move to StateType?
type inputData
type outputData

type customControlFunc<'inputData, 'outputData> = (
  Meta3dType.Index.state,
  (Meta3dType.Index.api, UIType.uiExtensionName),
  'inputData,
) => (Meta3dType.Index.state, 'outputData)

type customControlContribute<'inputData, 'outputData> = {
  customControlName: customControlName,
  func: customControlFunc<'inputData, 'outputData>,
}

type skinName = string

type getCustomControlContribute<'inputData, 'outputData> = skinName => customControlContribute<
  'inputData,
  'outputData,
>
