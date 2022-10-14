let buildUI = (~sandbox, ~service=ServiceTool.build(~sandbox, ()), ()) => {
  <UIControlInspector service />
}

// let setContributeNewName = (~dispatch, ~inspectorCurrentContribute, ~newName) => {
//   UIControlInspector.Method.setContributeNewName(dispatch, inspectorCurrentContribute, newName)
// }

let getCurrentSelectedUIControlInspectorData = UIControlInspector.Method.getCurrentSelectedUIControlInspectorData

let useSelector = ({apAssembleState}: FrontendUtils.AssembleSpaceStoreType.state) =>
  UIControlInspector.Method.useSelector

let buildRect = (
  ~x=0->FrontendUtils.ElementAssembleStoreType.IntForRectField,
  ~y=0->FrontendUtils.ElementAssembleStoreType.IntForRectField,
  ~width=0->FrontendUtils.ElementAssembleStoreType.IntForRectField,
  ~height=0->FrontendUtils.ElementAssembleStoreType.IntForRectField,
  (),
): FrontendUtils.ElementAssembleStoreType.rect => {
  {
    x: x,
    y: y,
    width: width,
    height: height,
  }
}

let buildEventData = (
  eventName: Meta3dType.Index.eventName,
  actionName,
): FrontendUtils.ElementAssembleStoreType.eventData => {
  eventName: eventName,
  actionName: actionName,
}

let buildUIControlInspectorData = (
  ~id,
  ~x=0->FrontendUtils.ElementAssembleStoreType.IntForRectField,
  ~y=0->FrontendUtils.ElementAssembleStoreType.IntForRectField,
  ~width=0->FrontendUtils.ElementAssembleStoreType.IntForRectField,
  ~height=0->FrontendUtils.ElementAssembleStoreType.IntForRectField,
  ~isDraw=true->FrontendUtils.ElementAssembleStoreType.BoolForIsDraw,
  ~event=[],
  (),
): FrontendUtils.ElementAssembleStoreType.uiControlInspectorData => {
  id: id,
  rect: buildRect(~x, ~y, ~width, ~height, ()),
  isDraw: isDraw,
  event: event,
}

let setRectX = UIControlInspector.Method.setRectX

let setRectY = UIControlInspector.Method.setRectY

let setRectWidth = UIControlInspector.Method.setRectWidth

let setRectHeight = UIControlInspector.Method.setRectHeight

let setIsDraw = UIControlInspector.Method.setIsDraw

let setAction = UIControlInspector.Method.setAction

let buildEmptySelectOptionValue = SelectUtils.buildEmptySelectOptionValue
