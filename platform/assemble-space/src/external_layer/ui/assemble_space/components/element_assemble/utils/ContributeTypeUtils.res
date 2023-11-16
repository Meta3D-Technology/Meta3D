let isAction = protocolName => {
  protocolName->Js.String.includes("-action-", _)
}

let decideContributeType = (protocolName: string): Meta3dType.ContributeType.contributeType => {
  switch protocolName {
  | name if name->Js.String.includes("-ui-control-", _) => UIControl
  | name if name->Js.String.includes("-pipeline-", _) => Pipeline
  | name if isAction(name) => Action
  | name if name->Js.String.includes("-component-", _) => Component
  | name if name->Js.String.includes("-gameobject-", _) => GameObject
  | name if name->Js.String.includes("-element-", _) => Element
  | name if FrontendUtils.ContributeTypeUtils.isInput(name) => Input
  | name if name->Js.String.includes("-skin-", _) => Skin
  | _ => Unknown
  }
}
