type uiControlName = string

type uiControlFunc<'inputData, 'outputData> = (
  . Meta3dType.Index.state,
  'inputData,
) => Js.Promise.t<(Meta3dType.Index.state, 'outputData)>

type uiControlContribute<'inputData, 'outputData> = {
  uiControlName: uiControlName,
  func: uiControlFunc<'inputData, 'outputData>,
}

// type skinName = string

// type getUIControlContribute<'inputData, 'outputData> = skinName => uiControlContribute<
//   'inputData,
//   'outputData,
// >
