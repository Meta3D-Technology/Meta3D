let buildUI = (~sandbox, ~service=ServiceTool.build(~sandbox, ()), ()) => {
  <UIControlInspector service />
}

// let setContributeNewName = (~dispatch, ~inspectorCurrentContribute, ~newName) => {
//   UIControlInspector.Method.setContributeNewName(dispatch, inspectorCurrentContribute, newName)
// }

let getCurrentSelectedUIControlInspectorData = UIControlInspector.Method.getCurrentSelectedUIControlInspectorData

let useSelector = ({apViewState}: FrontendUtils.AssembleSpaceStoreType.state) =>
  UIControlInspector.Method.useSelector

let buildSelectedUIControlInspectorData = (
  ~id,
  ~x=0,
  ~y=0,
  ~width=0,
  ~height=0,
  (),
): FrontendUtils.UIViewStoreType.uiControlInspectorData => {
  id: id,
  rect: {
    x: x,
    y: y,
    width: width,
    height: height,
  },
}

let setRect = UIControlInspector.Method.setRect
