let buildUI = (~sandbox, ~service, ()) => {
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

let buildSkin = (skinName): FrontendUtils.ElementAssembleStoreType.skin => {
  skinName: skinName,
}

let buildEventData = (
  eventName: Meta3dType.ContributeProtocolConfigType.eventName,
  actionName,
): FrontendUtils.ElementAssembleStoreType.eventData => {
  eventName: eventName,
  actionName: actionName,
}

let buildSpecific = (
  ~name="s1",
  ~type_=#string,
  ~value="d1",
  (),
): FrontendUtils.ElementAssembleStoreType.specificData => {
  {
    name: name,
    type_: type_,
    value: value->Obj.magic,
  }
}

let buildUIControlInspectorData = (
  ~id,
  ~x=0->FrontendUtils.ElementAssembleStoreType.IntForRectField,
  ~y=0->FrontendUtils.ElementAssembleStoreType.IntForRectField,
  ~width=0->FrontendUtils.ElementAssembleStoreType.IntForRectField,
  ~height=0->FrontendUtils.ElementAssembleStoreType.IntForRectField,
  ~isDraw=true->FrontendUtils.ElementAssembleStoreType.BoolForIsDraw,
  ~skin=buildSkin("empty"),
  ~event=[],
  ~specific=[],
  (),
): FrontendUtils.ElementAssembleStoreType.uiControlInspectorData => {
  id: id,
  rect: buildRect(~x, ~y, ~width, ~height, ()),
  isDraw: isDraw,
  skin: skin,
  event: event,
  specific: specific,
}

let setRectX = UIControlInspector.Method.setRectX

let setRectY = UIControlInspector.Method.setRectY

let setRectWidth = UIControlInspector.Method.setRectWidth

let setRectHeight = UIControlInspector.Method.setRectHeight

let setIsDraw = UIControlInspector.Method.setIsDraw

let setSkin = UIControlInspector.Method.setSkin

let setAction = UIControlInspector.Method.setAction

// let onFinishSpecific = UIControlInspector.Method._onFinishSpecific

let buildEmptySelectOptionValue = SelectUtils.buildEmptySelectOptionValue

let buildSkinProtocolData = (~protocolName="s1", ~protocolVersion="0.0.1", ()) =>
  {
    "protocolName": protocolName,
    "protocolVersion": protocolVersion,
  }
