let _handleSpecificDataFieldType = (
  (handleStringTypeFunc, handleImageBase64TypeFunc, handleMenuItemsTypeFunc),
  type_,
) => {
  switch type_ {
  | #string => handleStringTypeFunc()
  | #imageBase64 => handleImageBase64TypeFunc()
  | #menuItems => handleMenuItemsTypeFunc()
  }
}

let convertValueToString = (value, type_): string => {
  _handleSpecificDataFieldType(
    (
      () => {
        value->Obj.magic
      },
      () => {
        Meta3dCommonlib.Exception.throwErr(
          Meta3dCommonlib.Exception.buildErr(
            Meta3dCommonlib.Log.buildErrorMessage(
              ~title={j`error`},
              ~description={
                ""
              },
              ~reason="",
              ~solution=j``,
              ~params=j``,
            ),
          ),
        )
        // value->Obj.magic->Meta3dCommonlib.NullableSt.getWithDefault("")->Obj.magic
      },
      () => {
        value->Obj.magic->Js.Json.stringify
      },
    ),
    type_,
  )
}

let convertStringToValue = (
  valueStr,
  type_,
): Meta3dType.UIControlProtocolConfigType.uiControlSpecicFieldValue => {
  _handleSpecificDataFieldType(
    (
      () => {
        valueStr->Obj.magic
      },
      () => {
        valueStr->Obj.magic
      },
      () => {
        valueStr->Obj.magic->Js.Json.parseExn->Obj.magic
      },
    ),
    type_,
  )
}
