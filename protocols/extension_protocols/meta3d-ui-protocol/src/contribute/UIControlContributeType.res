type uiControlName = string

type uiControlFunc<'inputData, 'outputData> = (
  . Meta3dType.Index.state,
  'inputData,
) => Js.Promise.t<(Meta3dType.Index.state, 'outputData)>

// type uiControlContribute<'uiControlState, 'inputData, 'outputData> = {
//   uiControlName: uiControlName,
//   createStateFunc: unit => 'uiControlState,
//   func: uiControlFunc<'inputData, 'outputData>,
// }

type init = Meta3dType.Index.state => Js.Promise.t<Meta3dType.Index.state>

type uiControlContribute<'inputData, 'outputData> = {
  uiControlName: uiControlName,
  func: uiControlFunc<'inputData, 'outputData>,
  init: init,
}

// type skinName = string

// type getUIControlContribute<'inputData, 'outputData> = skinName => uiControlContribute<
//   'inputData,
//   'outputData,
// >
