// let setContributeNewName = (~dispatch, ~inspectorCurrentContribute, ~newName) => {
//   UIControlInspector.Method.setContributeNewName(dispatch, inspectorCurrentContribute, newName)
// }

let getCurrentSelectedUIControlInspectorData = ElementInspector.Method.getCurrentSelectedUIControlInspectorData

// let useSelector = ({apAssembleState}: FrontendUtils.AssembleSpaceStoreType.state) =>
//   UIControlInspector.Method.useSelector

let buildRect = (
  ~x=0->FrontendUtils.CommonType.IntForRectField,
  ~y=0->FrontendUtils.CommonType.IntForRectField,
  ~width=0->FrontendUtils.CommonType.IntForRectField,
  ~height=0->FrontendUtils.CommonType.IntForRectField,
  (),
): FrontendUtils.ElementAssembleStoreType.rect => {
  {
    x,
    y,
    width,
    height,
  }
}

let buildInput = (~inputName, ()): FrontendUtils.ElementAssembleStoreType.input => {
  inputName: inputName,
}

let buildEventData = (
  ~eventName,
  ~actionName,
  (),
): FrontendUtils.ElementAssembleStoreType.eventData => {
  eventName,
  actionName,
}

let buildSpecific = (
  ~name="s1",
  ~type_=#string,
  ~value="d1"->Obj.magic->FrontendUtils.CommonType.SpecicFieldDataValue,
  (),
): FrontendUtils.ElementAssembleStoreType.specificData => {
  {
    name,
    type_,
    value,
  }
}

let buildUIControlInspectorData = (
  ~id,
  ~x=0->FrontendUtils.CommonType.IntForRectField,
  ~y=0->FrontendUtils.CommonType.IntForRectField,
  ~width=0->FrontendUtils.CommonType.IntForRectField,
  ~height=0->FrontendUtils.CommonType.IntForRectField,
  ~isDraw=true->FrontendUtils.CommonType.BoolForIsDraw,
  ~input=None,
  ~event=[],
  ~specific=[],
  ~children=list{},
  (),
): FrontendUtils.ElementAssembleStoreType.uiControlInspectorData => {
  id,
  rect: buildRect(~x, ~y, ~width, ~height, ()),
  isDraw,
  input,
  event,
  specific,
  children,
}

let setRectX = UIControlInspector.Method.setRectX

let setRectY = UIControlInspector.Method.setRectY

let setRectWidth = UIControlInspector.Method.setRectWidth

let setRectHeight = UIControlInspector.Method.setRectHeight

let setIsDraw = UIControlInspector.Method.setIsDraw

let setAction = UIControlInspector.Method.setAction

let setSpecificData = UIControlInspector.Method._setSpecificData

let buildEmptySelectOptionValue = FrontendUtils.SelectUtils.buildEmptySelectOptionValue

let buildUI = (
  ~sandbox,
  ~service,
  ~currentSelectedUIControl=SelectedUIControlsTool.buildSelectedUIControl(),
  ~currentSelectedUIControlInspectorData=buildUIControlInspectorData(~id="id", ()),
  ~selectedContributes=list{},
  (),
) => {
  <UIControlInspector
    service currentSelectedUIControl currentSelectedUIControlInspectorData selectedContributes
  />
}

let buildInputNameSelectValues = UIControlInspector.Method.buildInputNameSelectValues
