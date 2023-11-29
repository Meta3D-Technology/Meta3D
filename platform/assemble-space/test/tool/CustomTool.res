let buildDefaultInputFileStr = Custom.Method.buildDefaultInputFileStr

let getInputName = Custom.Method._getInputName

let buildCustomInput = (
  ~name="input1",
  ~fileStr=ElementVisualTool.buildEmptyContributeFileStr(),
  (),
): FrontendUtils.AssembleSpaceCommonType.customInput => {
  {name, fileStr}
}

let buildCustomAction = (
  ~name="action1",
  ~fileStr=ElementVisualTool.buildEmptyContributeFileStr(),
  (),
): FrontendUtils.AssembleSpaceCommonType.customAction => {
  {name, fileStr}
}
