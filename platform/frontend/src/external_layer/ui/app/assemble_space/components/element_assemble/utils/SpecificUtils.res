let _handleSpecificDataFieldType = (
  (
    handleStringTypeFunc,
    handleImageBase64TypeFunc,
    handleMenuItemsTypeFunc,
    handleBoolTypeFunc,
    handleSelectTypeFunc,
    // handleNumberTypeFunc,
  ),
  type_: CommonType.specificDataType,
  value,
) => {
  switch type_ {
  | #string => handleStringTypeFunc(value)
  | #imageBase64 => handleImageBase64TypeFunc(value)
  | #menuItems => handleMenuItemsTypeFunc(value)
  | #bool => handleBoolTypeFunc(value)
  | #select => handleSelectTypeFunc(value)
  // | #number => handleNumberTypeFunc(value)
  }
}

let convertValueToString = (
  value: Meta3dType.UIControlProtocolConfigType.uiControlSpecicFieldValue,
  type_: CommonType.specificDataType,
): string => {
  _handleSpecificDataFieldType(
    (
      value => {
        value->Obj.magic
      },
      value => {
        // Meta3dCommonlib.Exception.throwErr(
        //   Meta3dCommonlib.Exception.buildErr(
        //     Meta3dCommonlib.Log.buildErrorMessage(
        //       ~title={j`error`},
        //       ~description={
        //         ""
        //       },
        //       ~reason="",
        //       ~solution=j``,
        //       ~params=j``,
        //     ),
        //   ),
        // )
        value->Obj.magic->Meta3dCommonlib.NullableSt.getWithDefault("")->Obj.magic
      },
      value => {
        value->Obj.magic->Js.Json.stringify
      },
      value => {
        value->Obj.magic->BoolUtils.boolToString
      },
      value => {
        !IntUtils.isInteger((value->Obj.magic)["selected"]->Obj.magic)
          ? Meta3dCommonlib.Exception.throwErr(
              Meta3dCommonlib.Exception.buildErr(
                Meta3dCommonlib.Log.buildErrorMessage(
                  ~title={j`value should be integer`},
                  ~description={
                    ""
                  },
                  ~reason="",
                  ~solution=j``,
                  ~params=j``,
                ),
              ),
            )
          : value->Obj.magic->Js.Json.stringify
      },
    ),
    type_,
    value,
  )
}

let convertStringToValue = (
  valueStr: string,
  type_,
): Meta3dType.UIControlProtocolConfigType.uiControlSpecicFieldValue => {
  _handleSpecificDataFieldType(
    (
      valueStr => {
        valueStr->Obj.magic
      },
      valueStr => {
        valueStr->Obj.magic
      },
      valueStr => {
        valueStr->Obj.magic->Js.Json.parseExn->Obj.magic
      },
      valueStr => {
        valueStr->Obj.magic->BoolUtils.stringToBool->Obj.magic
      },
      valueStr => {
        valueStr->Obj.magic->IntUtils.stringToInt->Obj.magic
      },
    ),
    type_,
    valueStr,
  )
}
