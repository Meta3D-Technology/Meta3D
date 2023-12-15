let buildDefaultInputOriginFileStr = CustomInputs.Method.buildDefaultInputOriginFileStr

let buildDefaultInputTranspiledFileStr = CustomInputs.Method.buildDefaultInputTranspiledFileStr

let getInputName = CustomUtils.getInputName

let buildCustomInput = (
  ~name="input1",
  ~originFileStr=ElementVisualTool.buildEmptyContributeFileStr(),
  ~transpiledFileStr=None,
  (),
): AssembleSpaceCommonType.customInput => {
  {name, originFileStr, transpiledFileStr}
}

let addCustom = CustomDomUtils.Method.addCustom

let formatCustomInputs = customInputs => {
  customInputs->Meta3dCommonlib.ListSt.map((
    customInput: AssembleSpaceCommonType.customInput,
  ): AssembleSpaceCommonType.customInput => {
    {
      ...customInput,
      originFileStr: customInput.originFileStr
      ->NewlineTool.unifyNewlineChar
      ->NewlineTool.removeBlankChar,
      transpiledFileStr: customInput.transpiledFileStr->Meta3dCommonlib.OptionSt.map(fileStr =>
        fileStr->NewlineTool.unifyNewlineChar->NewlineTool.removeBlankChar
      ),
    }
  })
}

let buildCustomAction = (
  ~name="action1",
  ~originFileStr=ElementVisualTool.buildEmptyContributeFileStr(),
  ~transpiledFileStr=None,
  (),
): AssembleSpaceCommonType.customAction => {
  {name, originFileStr, transpiledFileStr}
}
