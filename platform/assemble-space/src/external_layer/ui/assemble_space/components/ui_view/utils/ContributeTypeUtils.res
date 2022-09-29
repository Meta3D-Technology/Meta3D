let decideContributeType = (protocolName: string): Meta3dType.Index.contributeType => {
  switch protocolName {
  | name if name->Js.String.includes("-ui-control-") => UIControl
  | name if name->Js.String.includes("-work-plugin-") => WorkPlugin
  | name if name->Js.String.includes("-action-") => Action
  | name if name->Js.String.includes("-component-") => Component
  | name if name->Js.String.includes("-gameobject-") => GameObject
  | name if name->Js.String.includes("-element-") => Element
  | name if name->Js.String.includes("-skin-") => Skin
  | _ =>
    Meta3dCommonlib.Exception.throwErr(
      Meta3dCommonlib.Exception.buildErr(
        Meta3dCommonlib.Log.buildErrorMessage(
          ~title="unknown contribute type",
          ~description={
            j``
          },
          ~reason="",
          ~solution=j``,
          ~params=j``,
        ),
      ),
    )
  }
}
