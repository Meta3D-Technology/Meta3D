let _handleSpecificDataFieldType = (handleStringTypeFunc, type_) => {
  switch type_ {
  | #string => handleStringTypeFunc()
  }
}

let convertValueToString = (value, type_): string => {
  _handleSpecificDataFieldType(() => {
    value->Obj.magic
  }, type_)
}

let convertStringToValue = (
  valueStr,
  type_,
): Meta3dType.UIControlProtocolConfigType.uiControlSpecicFieldValue => {
  _handleSpecificDataFieldType(() => {
    valueStr->Obj.magic
  }, type_)
}
