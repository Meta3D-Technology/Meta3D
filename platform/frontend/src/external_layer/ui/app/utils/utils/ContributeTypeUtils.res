let isUIControl = protocolName => {
  protocolName->Js.String.includes("-ui-control-", _)
}

let isInput = protocolName => {
  protocolName->Js.String.includes("-input-", _) && !(protocolName->isUIControl)
}

let isAction = protocolName => {
  protocolName->Js.String.includes("-action-", _) && !(protocolName->isUIControl)
}

let decideContributeType = (protocolName: string): Meta3dType.ContributeType.contributeType => {
  switch protocolName {
  | name if isUIControl(name) => UIControl
  | name if name->Js.String.includes("-pipeline-", _) => Pipeline
  | name if isAction(name) => Action
  | name if name->Js.String.includes("-component-", _) => Component
  | name if name->Js.String.includes("-gameobject-", _) => GameObject
  | name if name->Js.String.includes("-element-", _) => Element
  | name if isInput(name) => Input
  | name if name->Js.String.includes("-skin-", _) => Skin
  | _ => Unknown
  }
}
