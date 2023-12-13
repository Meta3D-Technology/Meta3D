let buildDefaultInputFileStr = CustomInputs.Method.buildDefaultInputFileStr

let getInputName = CustomUtils.getInputName

let buildCustomInput = (
  ~name="input1",
  ~fileStr=ElementVisualTool.buildEmptyContributeFileStr(),
  (),
): AssembleSpaceCommonType.customInput => {
  {name, fileStr}
}

// let addCustomInput = CustomInputs.Method.addCustomInput
let addCustom = CustomDomUtils.Method.addCustom

let formatCustomInputs = customInputs => {
  customInputs->Meta3dCommonlib.ListSt.map((
    customInput: AssembleSpaceCommonType.customInput,
  ): AssembleSpaceCommonType.customInput => {
    {
      ...customInput,
      fileStr: customInput.fileStr->NewlineTool.unifyNewlineChar->NewlineTool.removeBlankChar,
    }
  })
}

let buildCustomAction = (
  ~name="action1",
  ~fileStr=ElementVisualTool.buildEmptyContributeFileStr(),
  (),
): AssembleSpaceCommonType.customAction => {
  {name, fileStr}
}
