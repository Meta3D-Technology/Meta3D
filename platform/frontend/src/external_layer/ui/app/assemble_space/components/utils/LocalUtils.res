let isLocalInput = protocolName => {
  protocolName->ContributeTypeUtils.isInput && !(protocolName->ElementVisualUtils.isCustomInput)
}

let isLocalAction = protocolName => {
  protocolName->ContributeTypeUtils.isAction && !(protocolName->ElementVisualUtils.isCustomAction)
}
