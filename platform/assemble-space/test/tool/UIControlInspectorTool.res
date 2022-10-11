let buildUI = (~sandbox, ~service=ServiceTool.build(~sandbox, ()), ()) => {
  <UIControlInspector service />
}

// let setContributeNewName = (~dispatch, ~inspectorCurrentContribute, ~newName) => {
//   UIControlInspector.Method.setContributeNewName(dispatch, inspectorCurrentContribute, newName)
// }

let getCurrentSelectedUIControlInspectorData = UIControlInspector.Method.getCurrentSelectedUIControlInspectorData

let useSelector = ({apAssembleState}: FrontendUtils.AssembleSpaceStoreType.state) =>
  UIControlInspector.Method.useSelector

let buildRect = (~x=0, ~y=0, ~width=0, ~height=0, ()): FrontendUtils.ElementAssembleStoreType.rect => {
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

let buildSelectedUIControlInspectorData = (
  ~id,
  ~x=0,
  ~y=0,
  ~width=0,
  ~height=0,
  ~event=[],
  (),
): FrontendUtils.ElementAssembleStoreType.uiControlInspectorData => {
  id: id,
  rect: buildRect(~x, ~y, ~width, ~height, ()),
  event: event,
}

let setRect = UIControlInspector.Method.setRect

let setAction = UIControlInspector.Method.setAction

let buildEmptySelectOptionValue = SelectUtils.buildEmptySelectOptionValue
