type uiControlName = string

// type getInputFunc<'data> = Meta3dType.Index.state => Js.Promise.t<'data>

type uiControlFunc<'inputFunc, 'specificData, 'outputData> = (
  . Meta3dType.Index.state,
  // getInputFunc<'inputFunc>,
  'inputFunc,
  Meta3dType.UIControlProtocolConfigType.rect,
  'specificData,
) => Js.Promise.t<(Meta3dType.Index.state, 'outputData)>

// type uiControlContribute<'uiControlState, 'specificData, 'outputData> = {
//   uiControlName: uiControlName,
//   createStateFunc: unit => 'uiControlState,
//   func: uiControlFunc<'specificData, 'outputData>,
// }

type init = Meta3dType.Index.state => Js.Promise.t<Meta3dType.Index.state>

type uiControlContribute<'inputFunc, 'specificData, 'outputData> = {
  uiControlName: uiControlName,
  func: uiControlFunc<'inputFunc, 'specificData, 'outputData>,
  init: init,
}

// type skinName = string

// type getUIControlContribute<'specificData, 'outputData> = skinName => uiControlContribute<
//   'specificData,
//   'outputData,
// >
