// let setContributeNewName = (~dispatch, ~inspectorCurrentContribute, ~newName) => {
//   UIControlInspector.Method.setContributeNewName(dispatch, inspectorCurrentContribute, newName)
// }

let getCurrentSelectedUIControlInspectorData = ElementInspector.Method.getCurrentSelectedUIControlInspectorData

// let useSelector = ({apAssembleState}: AssembleSpaceStoreType.state) =>
//   UIControlInspector.Method.useSelector

let buildRect = (
  ~x=0->CommonType.IntForRectField,
  ~y=0->CommonType.IntForRectField,
  ~width=0->CommonType.IntForRectField,
  ~height=0->CommonType.IntForRectField,
  (),
): ElementAssembleStoreType.rect => {
  {
    x,
    y,
    width,
    height,
  }
}

let buildInput = (~inputName, ()): ElementAssembleStoreType.input => {
  inputName: inputName,
}

let buildEventData = (~eventName, ~actionName, ()): ElementAssembleStoreType.eventData => {
  eventName,
  actionName,
}

let buildSpecific = (
  ~name="s1",
  ~type_=#string,
  ~value="d1"->Obj.magic->CommonType.SpecicFieldDataValue,
  (),
): ElementAssembleStoreType.specificData => {
  {
    name,
    type_,
    value,
  }
}

let buildUIControlInspectorData = (
  ~id,
  ~x=0->CommonType.IntForRectField,
  ~y=0->CommonType.IntForRectField,
  ~width=0->CommonType.IntForRectField,
  ~height=0->CommonType.IntForRectField,
  ~isDraw=true->CommonType.BoolForIsDraw,
  ~input=None,
  ~event=[],
  ~specific=[],
  ~children=list{},
  (),
): ElementAssembleStoreType.uiControlInspectorData => {
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

let buildEmptySelectOptionValue = SelectUtils.buildEmptySelectOptionValue

let buildUI = (
  ~sandbox,
  ~service,
  ~currentSelectedUIControl=SelectedUIControlsTool.buildSelectedUIControl(),
  ~currentSelectedUIControlInspectorData=buildUIControlInspectorData(~id="id", ()),
  ~selectedContributes=list{},
  ~rectXInputTarget=Meta3dCommonlib.NullableSt.getEmpty()->Obj.magic,
  ~rectYInputTarget=Meta3dCommonlib.NullableSt.getEmpty()->Obj.magic,
  ~rectWidthInputTarget=Meta3dCommonlib.NullableSt.getEmpty()->Obj.magic,
  ~rectHeightInputTarget=Meta3dCommonlib.NullableSt.getEmpty()->Obj.magic,
  ~inputSelectTarget=Meta3dCommonlib.NullableSt.getEmpty()->Obj.magic,
  (),
) => {
  <UIControlInspector
    service
    currentSelectedUIControl
    currentSelectedUIControlInspectorData
    selectedContributes
    rectXInputTarget
    rectYInputTarget
    rectWidthInputTarget
    rectHeightInputTarget
    inputSelectTarget
  />
}

let buildInputNameSelectValues = UIControlInspector.Method.buildInputNameSelectValues
