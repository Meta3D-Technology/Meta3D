type customControlName = string

type customControlFunc<'inputData, 'outputData> = (
  .
  Meta3dType.Index.state,
  'inputData,
) => (Meta3dType.Index.state, 'outputData)

type customControlContribute<'inputData, 'outputData> = {
  customControlName: customControlName,
  func: customControlFunc<'inputData, 'outputData>,
}

// type skinName = string

// type getCustomControlContribute<'inputData, 'outputData> = skinName => customControlContribute<
//   'inputData,
//   'outputData,
// >
