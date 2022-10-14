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
  ~x=0->FrontendUtils.ElementAssembleStoreType.Int,
  ~y=0->FrontendUtils.ElementAssembleStoreType.Int,
  ~width=0->FrontendUtils.ElementAssembleStoreType.Int,
  ~height=0->FrontendUtils.ElementAssembleStoreType.Int,
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
  ~x=0->FrontendUtils.ElementAssembleStoreType.Int,
  ~y=0->FrontendUtils.ElementAssembleStoreType.Int,
  ~width=0->FrontendUtils.ElementAssembleStoreType.Int,
  ~height=0->FrontendUtils.ElementAssembleStoreType.Int,
  ~event=[],
  (),
): FrontendUtils.ElementAssembleStoreType.uiControlInspectorData => {
  id: id,
  rect: buildRect(~x, ~y, ~width, ~height, ()),
  event: event,
}

let setRectX = UIControlInspector.Method.setRectX

let setRectY = UIControlInspector.Method.setRectY

let setRectWidth = UIControlInspector.Method.setRectWidth

let setRectHeight = UIControlInspector.Method.setRectHeight

let setAction = UIControlInspector.Method.setAction

let buildEmptySelectOptionValue = SelectUtils.buildEmptySelectOptionValue
