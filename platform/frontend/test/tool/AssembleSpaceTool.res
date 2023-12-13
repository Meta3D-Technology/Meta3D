let reset = (~dispatch) => {
  AssembleSpace.Method.reset(dispatch)
}

let getImportedElementCustom = AssembleSpace.Method.getImportedElementCustom

let buildLocalInputBundledSource = inputName => {
  j`export let getContribute = (api) => {
    return {
        inputName: "${inputName}",
        func: (meta3dState) => {
            return Promise.resolve(null)
        }
    }
}`
}

let buildSelectedContribute = (
  ~protocolName="c1-protocol",
  ~protocolVersion="0.0.1",
  ~protocolIconBase64="i1",
  ~protocolConfigStr=None,
  ~name="e1",
  ~account="a1",
  ~id="e1",
  ~version="0.0.1",
  ~data=ContributeTool.buildContributeData(
    ~contributePackageData=ContributeTool.buildContributePackageData(~name, ()),
    (),
  ),
  (),
): AssembleSpaceCommonType.contributeData => {
  (
    {
      id,
      protocolName,
      protocolVersion,
      protocolIconBase64,
      data,
      version,
      account,
    },
    protocolConfigStr->Meta3dCommonlib.OptionSt.map(protocolConfigStr =>
      ProtocolConfigTool.buildProtocolConfig(~configStr=protocolConfigStr, ())
    ),
  )
}

let convertLocalToCustom = AssembleSpace.Method.convertLocalToCustom

let removeInputsAndActions = AssembleSpace.Method.removeInputsAndActions
