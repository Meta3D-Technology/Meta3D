let buildUI = (~sandbox, ~service=ServiceTool.build(~sandbox, ()), ()) => {
  <UIControlInspector service />
}

// let setContributeNewName = (~dispatch, ~inspectorCurrentContribute, ~newName) => {
//   UIControlInspector.Method.setContributeNewName(dispatch, inspectorCurrentContribute, newName)
// }

let getCurrentSelectedUIControlInspectorData = UIControlInspector.Method.getCurrentSelectedUIControlInspectorData

let useSelector = ({apViewState}: FrontendUtils.AssembleSpaceStoreType.state) =>
  UIControlInspector.Method.useSelector

let buildRect = (~x=0, ~y=0, ~width=0, ~height=0, ()): FrontendUtils.UIViewStoreType.rect => {
  {
    x: x,
    y: y,
    width: width,
    height: height,
  }
}

let buildEventData = (
  eventName: FrontendUtils.UIControlInspectorType.eventName,
  actionName,
): FrontendUtils.UIViewStoreType.eventData => {
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
): FrontendUtils.UIViewStoreType.uiControlInspectorData => {
  id: id,
  rect: buildRect(~x, ~y, ~width, ~height, ()),
  event: event,
}

let setRect = UIControlInspector.Method.setRect

let setAction = UIControlInspector.Method.setAction

let buildEmptySelectOptionValue = UIControlInspector.Method.buildEmptySelectOptionValue
