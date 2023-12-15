open Antd
%%raw("import 'antd/dist/antd.css'")
open AssembleSpaceType

module Method = {
  let useSelector = ({elementAssembleState}: AssembleSpaceStoreType.state) => {
    let {customActions} = elementAssembleState

    customActions
  }
}

@react.component
let make = (~service: service, ~currentCustomActionName) => {
  let customActions = service.react.useSelector(. Method.useSelector)

  <CustomCodeEditUtils
    service
    getCurrentCustomNameFromGlobalFunc=CodeEditUtils.getCurrentCustomActionNameFromGlobal
    getNameFunc=CustomUtils.getActionName
    setCurrentCustomNameToGlobalFunc=CodeEditUtils.setCurrentCustomActionNameToGlobal
    buildUpdateActionFunc={(
      name,
      newName,
      newOriginCode,
      newTranspiledCode,
    ) => ElementAssembleStoreType.UpdateCustomActionFileStr(
      name,
      newName,
      newOriginCode,
      newTranspiledCode,
    )}
    currentCustomName=currentCustomActionName
    customs=customActions
  />
}
