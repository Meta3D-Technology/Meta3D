// let getAndSetElementAssembleData = ElementVisual.Method.getAndSetElementAssembleData

// let buildNo = () => ElementVisual.No

// let buildLoaded = assembleData => ElementVisual.Loaded(assembleData)

let convertInput = input => {
  input->Meta3dCommonlib.OptionSt.toNullable
}

let convertEvent = event => {
  event
}

let inConvertInput = input => {
  input->Meta3dCommonlib.OptionSt.fromNullable
}

let inConvertEvent = event => {
  event
}

let buildUIControl = (
  ~protocolName="p1",
  ~protocolVersion="^0.0.1",
  ~displayName="u1",
  ~rect=UIControlInspectorTool.buildRect(),
  ~isDraw=true->CommonType.BoolForIsDraw,
  ~input=None,
  ~event=[],
  ~specific=[],
  ~children=[],
  (),
): BackendCloudbaseType.uiControl => {
  protocol: {
    name: protocolName,
    version: protocolVersion,
  },
  displayName,
  rect,
  isDraw,
  input: input->convertInput,
  event: event->convertEvent,
  specific,
  children,
}

let buildElementAssembleData = (
  ~account="u1",
  ~elementName="e1",
  ~elementVersion="0.0.1",
  ~uiControls=[],
  ~customInputs=[],
  ~customActions=[],
  (),
): BackendCloudbaseType.elementAssembleData => {
  account,
  elementName,
  elementVersion,
  inspectorData: {
    uiControls: uiControls,
  },
  customInputs,
  customActions,
}

let importElement = AssembleSpace.Method.importElement

// let convertSelectedContributesFromAssembleToApAssemble = (
//   selectedContributes: AssembleSpaceType.selectedContributesFromMarket,
// ): ApAssembleStoreType.selectedContributes => {
//   selectedContributes->Meta3dCommonlib.ListSt.map(((
//     {id, protocolIconBase64, version, data},
//     protocolConfig,
//   )): ApAssembleStoreType.contribute => {
//     {
//       id,
//       protocolIconBase64,
//       protocolConfigStr: protocolConfig->Meta3dCommonlib.OptionSt.map(({configStr}) => configStr),
//       version,
//       data,
//     }
//   })
// }

let convertSelectedContributesFromApAssembleToAssemble = (
  selectedContributes: ApAssembleStoreType.selectedContributes,
): AssembleSpaceType.selectedContributesFromMarket => {
  selectedContributes->Meta3dCommonlib.ListSt.map(({
    id,
    protocolIconBase64,
    protocolConfigStr,
    version,
    data,
  }): AssembleSpaceCommonType.contributeData => {
    (
      {
        id,
        protocolName: "",
        protocolIconBase64,
        protocolVersion: "",
        version,
        data,
        account: "",
      },
      protocolConfigStr->Meta3dCommonlib.OptionSt.map(protocolConfigStr => {
        ProtocolConfigTool.buildProtocolConfig(~configStr=protocolConfigStr, ())
      }),
    )
  })
}
