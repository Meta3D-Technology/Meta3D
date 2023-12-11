let buildDefaultInputFileStr = CustomInputs.Method._buildDefaultInputFileStr

let getInputName = CustomInputCodeEdit.Method._getInputName

let buildCustomInput = (
  ~name="input1",
  ~fileStr=ElementVisualTool.buildEmptyContributeFileStr(),
  (),
): AssembleSpaceCommonType.customInput => {
  {name, fileStr}
}

let addCustomInput = CustomInputs.Method.addCustomInput

let buildCustomAction = (
  ~name="action1",
  ~fileStr=ElementVisualTool.buildEmptyContributeFileStr(),
  (),
): AssembleSpaceCommonType.customAction => {
  {name, fileStr}
}
