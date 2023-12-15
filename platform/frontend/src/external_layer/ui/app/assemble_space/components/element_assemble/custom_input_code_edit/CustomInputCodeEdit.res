open Antd
%%raw("import 'antd/dist/antd.css'")
open AssembleSpaceType

module Method = {
  let useSelector = ({elementAssembleState}: AssembleSpaceStoreType.state) => {
    let {customInputs} = elementAssembleState

    customInputs
  }
}

@react.component
let make = (~service: service, ~currentCustomInputName) => {
  let customInputs = service.react.useSelector(. Method.useSelector)

  <CustomCodeEditUtils
    service
    getCurrentCustomNameFromGlobalFunc=CodeEditUtils.getCurrentCustomInputNameFromGlobal
    getNameFunc=CustomUtils.getInputName
    setCurrentCustomNameToGlobalFunc=CodeEditUtils.setCurrentCustomInputNameToGlobal
    buildUpdateActionFunc={(
      name,
      newName,
      newOriginCode,
      newTranspiledCode,
    ) =>
     ElementAssembleStoreType.UpdateCustomInputFileStr(
      name,
      newName,
      newOriginCode,
      newTranspiledCode,
    )}
    currentCustomName=currentCustomInputName
    customs=customInputs
  />
}
